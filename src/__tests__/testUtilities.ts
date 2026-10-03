import { createClient } from "@supabase/supabase-js";

export const ALICE_ID = crypto.randomUUID();
export const BOB_ID = crypto.randomUUID();
export const AliceFlightId = crypto.randomUUID();
export const BobFlightId = crypto.randomUUID();

export const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
        auth: {
            persistSession: true,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    }
);

export const adminSupabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    }
);

export const e2eAdminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_SERVICE_ROLE_KEY!,
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    }
);

export const testDataAlice = {
    id: AliceFlightId,
    flight_number: "EK525",
    date: "2026-09-29",
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "A380",
    registration: "A6-EQH",
    notes: "Alice's Flight",
  };

export const testDataBob = {
    id: BobFlightId,
    flight_number: "LH454",
    date: "2026-09-29",
    departure: "HYD",
    arrival: "DXB",
    airline: "Emirates",
    aircraft_type: "A350",
    registration: "A6-EQH",
    notes: "Bob's Flight",
  }; 