'use server'

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UUID } from "@/src/schemas/flightSchemas";


export async function deleteFlightById(flightId: UUID) {

    const supabase = await createClient();
    /*const {data: {user} } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorised!");
    */


    const { error } = await supabase
        .from('flights')
        .delete()
        .eq('id', flightId);
        // .eq('user_id', user.id);

    if (error) throw new Error(error.message)
    
    revalidatePath('/flights');
};