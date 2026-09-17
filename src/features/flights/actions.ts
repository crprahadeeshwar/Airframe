"use server";
import * as z from "zod";

const Flight = z.object({
    flightNumber: z.string(),
    date: z.date(),
    departure: z.string(),
    arrival: z.string(),
    airline: z.string(),
    aircraft: z.string(),
    registration: z.string(),
    notes: z.string(),
})


import { createClient } from "@/src/lib/supabase/server";
import { revalidatePath } from "next/cache";



export async function createFlight(formData: FormData){

    const supabase = await createClient();

    const flightInput = formData.get(something)

    const { error } = await supabase
    .from('flights')
    .insert([{flightId, userId,flightInput.date, flightInput.flightNumber, flightInput.registration, flightInput.aircraft, flightInput.airline, flightInput.departure, flightInput.arrival, flightInput.notes }])



}

export async function fetchFlights() {
    const supabase = await createClient();

    const {data: flightData, error } = await supabase
    .from('flights')
    .select('*')
    .order('date', {ascending: false});
    
    if (error) throw new Error(error.message);
    
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

    if (error) throw new Error(error.message)
    
    revalidatePath('/flights');
};


export async function deleteAll(userId: string) {

    const supabase = await createClient();

    const {error } = await supabase
    .from('flights')
    .delete()
    .eq('userId', userId);

    if(error) throw new Error(error.message)

    revalidatePath("/flights");
};




