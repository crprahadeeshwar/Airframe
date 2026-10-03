"use server";

import { createClient } from "@/src/lib/supabase/server";
import {
    uuidSchema,
    FlightSchema,
    type Criteria,
    type Order,
    type Search,
    type UUID,
} from "@/src/schemas/flightSchemas";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/src/lib/supabase/database.types";
import { logger } from "@/src/lib/logger";

export type ReadFlightParams = {
    supabase: SupabaseClient<Database>;
    userId: UUID;
    criteria: Criteria;
    order: Order;
    search: Search;
};


export type ReadFlightByIdParams = {
    supabase: SupabaseClient<Database>;
    flightId: UUID;
    userId: UUID;
};

type FlightStats = {
    flight_count: number;
    aircraft_count: number;
    airline_count: number;
};

export async function readAllFlights({
    supabase,
    userId,
    order = "newest",
    criteria = null,
    search = null,
}: ReadFlightParams) {

    const columns = [
        "flight_number",
        "registration",
        "airline",
        "aircraft_type",
        "departure",
        "arrival",
        "notes",
    ];

    let query = supabase
        .from("flights")
        .select("*")
        .eq("user_id", userId);

    if (order === "oldest") {
        query = query.order("created_at", { ascending: true });
    } else {
        query = query.order("created_at", { ascending: false });
    }

    if (criteria) {
        query = query.not(criteria, "is", null);
    }

    if (search) {
        const filterString = columns
            .map((column) => `${column}.ilike.%${search}%`)
            .join(",");

        query = query.or(filterString);
    }

    const { data, error } = await query;

    if (error) {
        throw new Error(error.message);
    }

    return FlightSchema.array().parse(data);
}


export async function readFlightById({
    supabase,
    flightId,
    userId,
}: ReadFlightByIdParams) {

    return await supabase
        .from("flights")
        .select("*")
        .eq("id", flightId)
        .eq("user_id", userId)
        .maybeSingle();
}


export async function getFlightStats({
    supabase,
}: {
    supabase: SupabaseClient<Database>;
}) {
    const { data, error } = await supabase.rpc("get_user_flight_stats");
    if (error) {
        return { data: null, error };
    }

    const stats = data?.[0];

    if (
        !stats ||
        typeof stats.flight_count !== "number" ||
        typeof stats.aircraft_count !== "number" ||
        typeof stats.airline_count !== "number"
    ) {
        return {
            data: null,
            error: new Error("Invalid flight stats response"),
        };
    }

    return {
        data: stats as FlightStats,
        error: null,
    };
}

export async function fetchFlights({
    order,
    criteria,
    search,
}: {
    order: Order;
    criteria: Criteria;
    search: Search;
}) {

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized!");
    }

    return await readAllFlights({
        supabase,
        userId: uuidSchema.parse(user.id),
        order,
        criteria,
        search,
    });
}


export async function fetchFlightsById(flightId: string) {

    const supabase = await createClient();

    const id = uuidSchema.parse(flightId);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorised!");
    }

    const userId = uuidSchema.parse(user.id);

    const { data, error } = await readFlightById({
        supabase,
        flightId: id,
        userId,
    });

    if (error) {
        console.log(error);
        return null;
    }

    return data;
}


export async function fetchFlightStats() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized!");

    const { data, error } = await getFlightStats({
        supabase,
    });

    if (error) {
        console.error("Error fetching stats:", error.message);
        throw new Error(error.message);
    }

    return data;
}