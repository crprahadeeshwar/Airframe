'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { FlightSchema, type FlightInput } from "@/src/schemas/flightSchemas";
import { redirect } from 'next/navigation';



export default async function createFlight(formData: FormData) {

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

    const supabase = await createClient();
    
    /*
    const{ data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");
    */

    const flightData =  FlightSchema.parse(formValues)

    const { error } = await supabase
    .from('flights')
    .insert(flightData);

    if(error) throw new Error(error.message);

    revalidatePath("/flights");
    redirect("/flights");
}
