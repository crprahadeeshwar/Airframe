'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uuidSchema, FlightInputSchema } from "@/src/schemas/flightSchemas";

export type UpdateState = {
    status: "idle" | "success" | "error";
    message: string;
}

export async function updateFlight(flightId: string, prevState: UpdateState,  rawValues: FormData): Promise<UpdateState> {

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
            status: 'error',
            message: flightData.error.issues[0].message
        };
    };
    const supabase = await createClient();

    const{ data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");

    const Id = uuidSchema.parse(flightId);

    const { error } = await supabase
    .from('flights')
    .update(flightData.data)
    .eq('id', Id )
    .eq('user_id', user.id);

    if(error) {
        console.log(error.message);
        return {
            status: 'error',
            message: "Couldn't Update Flight. Try Again"
        }
    }
    revalidatePath('/flights');
    return {
        status: 'success',
        message: "operation Successful"
    };
}