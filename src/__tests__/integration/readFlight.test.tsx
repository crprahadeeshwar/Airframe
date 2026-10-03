import { beforeAll, describe, expect, it } from "vitest";
import { ALICE_ID, BOB_ID, supabase, adminSupabase, testDataAlice, testDataBob } from "../testUtilities";
import { readAllFlights } from "@/src/features/actions/readFlights";
import type { ReadFlightParams } from "@/src/features/actions/readFlights";
import { insertFlight } from "@/src/features/actions/createFlights";
import { FlightSchema } from "@/src/schemas/flightSchemas";

beforeAll(async () => {
    const { error: aliceError } =
        await adminSupabase.auth.admin.createUser({
            id: ALICE_ID,
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (aliceError) {
        throw aliceError;
    }

    let insertDataAlice = FlightSchema.parse(testDataAlice);

    const { error: insertAliceDataError } = await insertFlight({
        supabase: adminSupabase,
        insertData: insertDataAlice,
        userId: ALICE_ID,
    });

    if (insertAliceDataError) {
        throw insertAliceDataError;
    };


    const { error: bobError } =
        await adminSupabase.auth.admin.createUser({
            id: BOB_ID,
            email: `bob-${BOB_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (bobError) {
        throw bobError;
    }

    let insertDataBob = FlightSchema.parse(testDataBob);

    const { error: insertBobDataError } = await insertFlight({
        supabase: adminSupabase,
        insertData: insertDataBob,
        userId: BOB_ID,
    });

    if (insertBobDataError) {
        throw insertBobDataError;
    };

});

describe ("read flight", () => {

    it("allows users to read their flights", async () => {

    await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

    const readObject: ReadFlightParams = {
        supabase: supabase, userId: ALICE_ID, order: 'newest', criteria: null, search: null 
    }

    const result = await readAllFlights(readObject);
     
    expect(result).toHaveLength(1);
    expect(result[0].flight_number).toBe("EK525");
    expect(result[0].departure).toBe("HYD");
    expect(result[0].arrival).toBe("DXB");
    expect(result[0].airline).toBe("Emirates");
    expect(result[0].registration).toBe("A6-EQH");
    });


    it("prevents users to read others' flights", async () => {

    await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

    const readObject: ReadFlightParams = {
        supabase: supabase, userId: BOB_ID, order: 'newest', criteria: null, search: null 
    }

    const result = await readAllFlights(readObject);
     
    expect(result).toEqual([]);
    });

});