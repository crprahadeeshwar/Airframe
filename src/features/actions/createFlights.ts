'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { FlightSchema, type FlightInput } from "@/src/schemas/flightSchemas";
import { redirect } from 'next/navigation';



export default async function createFlight(formData: FormData) {

    const formValues = {
        flightNumber: formData.get("flightNumber"),
        date: formData.get("date"),
        departure: formData.get("departure"),
        arrival: formData.get("arrival"),
        airline: formData.get("airline"),
        aircraft: formData.get("aircraft"),
        registration: formData.get("registration"),
        notes: formData.get("notes"),
    };

    const supabase = await createClient();
    
    const{ data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");

    const flightData =  FlightSchema.parse(formValues)

    const insertData = {
        ...flightData,
        user_id: user.id
    }
    const { error } = await supabase
    .from('flights')
    .insert(insertData);

    if(error) throw new Error(error.message);

    revalidatePath("/flights");
    redirect("/flights");
}
