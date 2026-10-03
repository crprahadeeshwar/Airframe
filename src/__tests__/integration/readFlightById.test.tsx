import { beforeAll, describe, expect, it } from "vitest";

import {
    ALICE_ID,
    BOB_ID,
    supabase,
    adminSupabase,
    AliceFlightId,
    BobFlightId,
    testDataAlice,
    testDataBob,
} from "../testUtilities";

import {
    readFlightById,
    type ReadFlightByIdParams,
} from "@/src/features/actions/readFlights";

import { insertFlight } from "@/src/features/actions/createFlights";
import { FlightTestSchema } from "@/src/schemas/flightSchemas";


beforeAll(async () => {
    // Create Alice
    const { error: aliceError } =
        await adminSupabase.auth.admin.createUser({
            id: ALICE_ID,
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (aliceError) throw aliceError;


    // Create Alice's flight
    const aliceFlight = FlightTestSchema.parse({
        ...testDataAlice,
        id: AliceFlightId,
    });

    const { error: aliceFlightError } = await insertFlight({
        supabase: adminSupabase,
        insertData: aliceFlight,
        userId: ALICE_ID,
    });

    if (aliceFlightError) throw aliceFlightError;


    // Create Bob
    const { error: bobError } =
        await adminSupabase.auth.admin.createUser({
            id: BOB_ID,
            email: `bob-${BOB_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (bobError) throw bobError;


    // Create Bob's flight
    const bobFlight = FlightTestSchema.parse({
        ...testDataBob,
        id: BobFlightId,
    });

    const { error: bobFlightError } = await insertFlight({
        supabase: adminSupabase,
        insertData: bobFlight,
        userId: BOB_ID,
    });

    if (bobFlightError) throw bobFlightError;
});


describe("read flight by id", () => {

    it("allows users to read their own flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const readObject: ReadFlightByIdParams = {
            supabase,
            flightId: AliceFlightId,
            userId: ALICE_ID,
        };

        const { data, error } = await readFlightById(readObject);

        expect(error).toBeNull();
        expect(data).not.toBeNull();
        expect(data?.id).toBe(AliceFlightId);
        expect(data?.flight_number).toBe("EK525");
    });


    it("prevents users from reading another user's flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const readObject: ReadFlightByIdParams = {
            supabase,
            flightId: BobFlightId,
            userId: BOB_ID,
        };

        const { data, error } = await readFlightById(readObject);

        expect(error).toBeNull();
        expect(data).toBeNull();
    });

});