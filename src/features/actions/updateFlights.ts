'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
    uuidSchema,
    FlightInputSchema,
    type UUID,
    type FlightTypeInputSchema,
} from "@/src/schemas/flightSchemas";
import type { SupabaseClient } from "@supabase/supabase-js";


export type UpdateState = {
    status: "idle" | "success" | "error";
    message: string;
};


export type UpdateFlightHelperParams = {
    supabase: SupabaseClient<any, "public", "public", any, any>;
    flightId: UUID;
    userId: UUID;
    updateData: FlightTypeInputSchema;
};


export async function updateFlightByIdHelper({
    supabase,
    flightId,
    userId,
    updateData,
}: UpdateFlightHelperParams) {
    return await supabase
        .from("flights")
        .update(updateData)
        .eq("id", flightId)
        .eq("user_id", userId)
        .select();
}


export async function updateFlight(
    flightId: string,
    prevState: UpdateState,
    rawValues: FormData
): Promise<UpdateState> {

    const formValues = {
        flight_number: rawValues.get("flight_number"),
        date: rawValues.get("date"),
        departure: rawValues.get("departure"),
        arrival: rawValues.get("arrival"),
        airline: rawValues.get("airline"),
        aircraft_type: rawValues.get("aircraft_type"),
        registration: rawValues.get("registration"),
        notes: rawValues.get("notes"),
    };

    const flightData = FlightInputSchema.safeParse(formValues);

    if (!flightData.success) {
        return {
            status: "error",
            message: flightData.error.issues[0].message,
        };
    }

    const supabase = await createClient();

    console.log("UPDATE: before getUser");

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log("UPDATE: after getUser");

    if (!user) {
        throw new Error("Unauthorised!");
    }

    const Id = uuidSchema.parse(flightId);

    console.log("UPDATE: before database update");

    const { error } = await updateFlightByIdHelper({
        supabase,
        flightId: Id,
        userId: user.id,
        updateData: flightData.data,
    });

    console.log("UPDATE: after database update", error);

    if (error) {
        console.log(error.message);

        return {
            status: "error",
            message: "Couldn't Update Flight. Try Again",
        };
    }

    revalidatePath("/flights");

    return {
        status: "success",
        message: "operation Successful",
    };
}