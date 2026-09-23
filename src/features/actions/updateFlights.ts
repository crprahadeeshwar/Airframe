'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uuidSchema, FlightSchema } from "@/src/schemas/flightSchemas";



export async function updateFlight(flightId: string, rawValues: FormData) {

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

    const supabase = await createClient();

    /*
    const{ data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");
    */

    const flightData = FlightSchema.parse(formValues);


    const Id = uuidSchema.parse(flightId);

    const { error } = await supabase
    .from('flights')
    .update(flightData)
    .eq('id', Id )
    // .eq('user_id', user.id);

    if(error) throw new Error(error.message);
    revalidatePath('/flights');
}