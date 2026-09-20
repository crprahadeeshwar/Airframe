'use server'

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const deleteFlightSchema = z.string()

export async function deleteFlightById(flightId: string) {

    const supabase = await createClient();
    const Id =  deleteFlightSchema.parse(flightId)
    const {data: {user} } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorised!");

    const userId = deleteFlightSchema.parse(user.id);

    const { error } = await supabase
        .from('flights')
        .delete()
        .eq('id', Id)
        .eq('user_id', userId);

    if (error) throw new Error(error.message)
    
    revalidatePath('/flights');
};