'use server';

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { uuidSchema, FlightSchema, type FlightInput } from "@/src/schemas/flightSchemas";



export default async function updateFlight(flightId: string, formValues: FlightInput) {

    const supabase = await createClient();

    const{ data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");

    const flightData = FlightSchema.parse(formValues);
    const updateData = {
        ...flightData,
        user_id: user.id
    };

    const Id = uuidSchema.parse(flightId);

    const { error } = await supabase
    .from('flights')
    .update(updateData)
    .eq('id', Id )
    .eq('user_id', user.id);

    if(error) throw new Error(error.message);


    revalidatePath('/flights');
}