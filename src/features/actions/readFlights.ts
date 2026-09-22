"use server";

import { createClient } from "@/src/lib/supabase/server";
import { uuidSchema} from "@/src/schemas/flightSchemas";

export async function fetchAllFlights() {

    const supabase = await createClient();

    /*
    const {data: {user} } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");
    const userId = uuidSchema.parse(user.id);
    */

    const {data: flightData, error } = await supabase
    .from('flights')
    .select('*')
    // .eq("user_id", userId)
    .order('date', {ascending: false});
    
    if (error) throw new Error(error.message);
    
    return flightData;
};



export async function fetchFlightsById(flightId: string) {

    const supabase = await createClient();
    const Id = uuidSchema.parse(flightId);

    /*
    const {data: {user} } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");
    const userId = uuidSchema.parse(user.id);
    */

    const {data: flightData , error } = await supabase
    .from('flights')
    .select('*')
    .eq('id', Id)
    // .eq('user_id', userId)
    .maybeSingle();

    if (error) {
        console.log(error);
        return null;
    } 
    return flightData;
};
 






