"use server";


import { createClient } from "@/src/lib/supabase/server";

export async function fetchFlights() {
    const supabase = await createClient();

    const {data: flightData, error } = await supabase
    .from('flights')
    .select('*');
    
    if (error) {
        console.log(error);
        return [];
    } else { console.log('Success'); }
    return flightData;
};



export async function fetchFlightsById(flightId: string) {

    const supabase = await createClient();

    const {data: flightData, error } = await supabase
    .from('flights')
    .select('*')
    .eq('id', flightId);

    console.log("Flight by ID: ");

    if (error) {
        console.log(error);
        return null;
    } 
    return flightData;
};
 

export async function fetchFlightsByUserId(userId: string) {
    
    const supabase = await createClient();

    const {data: flightData, error } = await supabase
    .from('flights')
    .select('*')
    .eq('user_id', userId);
    
    if (error) {
        console.log(error);
        return [];
    }
    return flightData;
};

export async function deleteFlightById(flightId: string) {

    const supabase = await createClient();

    const { data, error } = await supabase
        .from('flights')
        .delete()
        .eq('id', flightId);

    if (error) {
        console.log(error);
        return null;
    }
    return data;
};


export async function deleteAll(userId: string) {

    const supabase = await createClient();

    const { data, error } = await supabase
    .from('flights')
    .delete()
    .eq('userId', userId);

    if(error) {
        console.log(error)
        return null
    }

    return data;
};




