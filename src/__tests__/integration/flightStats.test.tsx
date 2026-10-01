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

import { getFlightStats } from "@/src/features/actions/readFlights";
import { insertFlight } from "@/src/features/actions/createFlights";
import { FlightTestSchema } from "@/src/schemas/flightSchemas";

beforeAll(async () => {
    const { error: aliceError } =
        await adminSupabase.auth.admin.createUser({
            id: ALICE_ID,
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (aliceError) throw aliceError;

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

    const { error: bobError } =
        await adminSupabase.auth.admin.createUser({
            id: BOB_ID,
            email: `bob-${BOB_ID}@test.local`,
            password: "password123",
            email_confirm: true,
        });

    if (bobError) throw bobError;

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

describe("flight stats", () => {
    it("returns the authenticated user's stats", async () => {
        const { error: signInError } =
            await supabase.auth.signInWithPassword({
                email: `alice-${ALICE_ID}@test.local`,
                password: "password123",
            });

        expect(signInError).toBeNull();

        const { data, error } = await getFlightStats({
            supabase,
        });

        expect(error).toBeNull();
        expect(data).toEqual({
            flight_count: 1,
            aircraft_count: 1,
            airline_count: 1,
        });
    });

    it("returns stats for the currently authenticated user", async () => {
        await supabase.auth.signOut();

        const { error: signInError } =
            await supabase.auth.signInWithPassword({
                email: `bob-${BOB_ID}@test.local`,
                password: "password123",
            });

        expect(signInError).toBeNull();

        const { data, error } = await getFlightStats({
            supabase,
        });

        expect(error).toBeNull();
        expect(data).toEqual({
            flight_count: 1,
            aircraft_count: 1,
            airline_count: 1,
        });
    });
});