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
import { Database } from "@/src/lib/supabase/database.types";
import { logger } from "@/src/lib/logger";

export type UpdateState = {
    status: "idle" | "success" | "error";
    message: string;
};


export type UpdateFlightHelperParams = {
    supabase: SupabaseClient<Database>;
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

    const refinedUpdateData = {
        ...updateData,
        date: updateData.date?.toISOString() ?? null
    }
    return await supabase
        .from("flights")
        .update(refinedUpdateData)
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
        logger.error(
            "flight.update.failed",
            "Validation error: invalid flight data",
            { errorType: "validation" }
        );

        return {
            status: "error",
            message: flightData.error.issues[0].message,
        };
    }

    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorised!");
    }

    const Id = uuidSchema.parse(flightId);

    const { error } = await updateFlightByIdHelper({
        supabase,
        flightId: Id,
        userId: user.id,
        updateData: flightData.data,
    });

    if (error) {
        logger.error(
            "flight.update.failed",
            "Operation error: could not update flight",
            { flightId: Id, userId: user.id },
            error
        );

        return {
            status: "error",
            message: "Couldn't Update Flight. Try Again",
        };
    }

    revalidatePath("/flights");

    logger.info(
        "flight.update.success",
        "Flight updated successfully",
        { flightId: Id, userId: user.id }
    );

    return {
        status: "success",
        message: "operation Successful",
    };
}