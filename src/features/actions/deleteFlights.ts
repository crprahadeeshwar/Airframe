'use server'

import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";
import type { UUID } from "@/src/schemas/flightSchemas";

export type DeleteState = {
    status: "idle" | "success" | "error";
    message: string;
}
export async function deleteFlightById(flightId: UUID, prevState: DeleteState): Promise<DeleteState> {

    const supabase = await createClient();

    const {data: {user} } = await supabase.auth.getUser();
    
    if (!user) throw new Error("Unauthorised!");

    const { error } = await supabase
        .from('flights')
        .delete()
        .eq('id', flightId)
        .eq('user_id', user.id);

    if (error) {
        return {
            status: "error",
            message: "Could Not Delete Flight. Try Again."
        }
    }
    revalidatePath('/flights');
    return {
        status: "success",
        message: 'Record Deleted Successfully'
    };
};