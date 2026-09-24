'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { FlightSchema, type FormState } from "@/src/schemas/flightSchemas";
import { redirect } from 'next/navigation';
import { success } from "zod";



export async function createFlight(prevState: FormState, formData: FormData) {

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

    const flightData =  FlightSchema.safeParse(formValues)

    if (!flightData.success) {
        return {
            errorMessage: flightData.error.issues[0].message
        }
    } else {
        const supabase = await createClient();
        
        const{ data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Unauthorised!");

        const insertData = ({
            ...flightData.data,
            user_id: user.id
        })
        const { error } = await supabase
        .from('flights')
        .insert(insertData);

        if(error) throw new Error(error.message);

        revalidatePath("/flights");
        redirect("/flights");
    }
}
