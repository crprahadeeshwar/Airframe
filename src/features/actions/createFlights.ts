"use server";

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
    FlightInputSchema,
    type UUID,
    type FlightTypeInputSchema,
    type FormState,
} from "@/src/schemas/flightSchemas";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/src/lib/supabase/database.types";

export type InsertFlightParams = {
    supabase: SupabaseClient<Database>;
    insertData: FlightTypeInputSchema;
    userId: UUID;
};

export async function insertFlight({
    supabase,
    insertData,
    userId,
}: InsertFlightParams) {

    const flightData = {
        ...insertData,
        date: insertData.date?.toISOString() ?? null,
        user_id: userId,
    };

    return await supabase
        .from("flights")
        .insert(flightData)
        .select()
        .single();
}


export async function createFlight(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {

    const formValues = {
        flight_number: formData.get("flight_number"),
        date: formData.get("date"),
        departure: formData.get("departure"),
        arrival: formData.get("arrival"),
        airline: formData.get("airline"),
        aircraft_type: formData.get("aircraft_type"),
        registration: formData.get("registration"),
        notes: formData.get("notes"),
    };

    const flightData = FlightInputSchema.safeParse(formValues);

    if (!flightData.success) {
        return {
            status: "error",
            errorMessage: flightData.error.issues[0].message,
            errorType: "validation",
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorised!");
    }

    const { error } = await insertFlight({
        supabase,
        insertData: flightData.data,
        userId: user.id,
    });

    if (error) {
        return {
            status: "error",
            errorMessage: "Could Not Create Flight. Try Again.",
            errorType: "operation",
        };
    }

    revalidatePath("/flights");

    return {
        status: "success",
        errorMessage: "No error",
        errorType: "none",
    };
}