"use server";

import { createClient } from "@/src/lib/supabase/server";
import { uuidSchema, FlightSchema } from "@/src/schemas/flightSchemas";
import type { Criteria, Order, Search } from "@/src/schemas/flightSchemas";
interface fetchFlightsParams { 
criteria: Criteria;
order: Order;
search: Search;
};

export async function fetchFlights( { order, criteria, search} :fetchFlightsParams ) {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized!");

  const userId = uuidSchema.parse(user.id);

  const columns = ['date', 'flight_number', 'registration', 'airline', 'aircraft_type', 'departure', 'arrival', 'notes']

  let query = supabase
  .from('flights')
  .select('*')
  .eq('user_id', userId)

  if (order === 'oldest') {
    query = query.order('created_at', { ascending: true })
  } else {
    query = query.order('created_at', { ascending: false })
  }
    
  if (criteria) {
    query = query.not( criteria, 'is', null );
  }

  if (search) {
    const filterString = columns.map((col) => `${col}.ilike.%${search}%`).join(",")
    query = query.or(filterString);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching stats:", error.message);
    throw new Error(error.message);
  }

  const flightData = FlightSchema.array().parse(data);    
  return flightData;
}

export async function fetchFlightsById(flightId: string) {

    const supabase = await createClient();
    const Id = uuidSchema.parse(flightId);

    const {data: {user} } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorised!");
    const userId = uuidSchema.parse(user.id);

    const {data: flightData , error } = await supabase
    .from('flights')
    .select('*')
    .eq('id', Id)
    .eq('user_id', userId)
    .maybeSingle();

    if (error) {
        console.log(error);
        return null;
    } 
    return flightData;
};


export async function fetchFlightStats() {

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized!");
  
  const userId = uuidSchema.parse(user.id);
  
  const { data, error } = await supabase.rpc('get_user_flight_stats', {
    target_user_id: userId
  });
  
  if (error) {
    console.error("Error fetching stats:", error.message);
    throw new Error(error.message);
  }

  return data; 
}






