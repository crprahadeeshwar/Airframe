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
    deleteFlightByIdHelper,
    type DeleteHelperParams,
} from "@/src/features/actions/deleteFlights";

import { insertFlight } from "@/src/features/actions/createFlights";
import { FlightTestSchema } from "@/src/schemas/flightSchemas";
import { readAllFlights, type ReadFlightParams } from "@/src/features/actions/readFlights";


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


describe("delete flight", () => {

    it("allows users to delete their own flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const deleteObject: DeleteHelperParams = {
            supabase,
            flightId: AliceFlightId,
            userId: ALICE_ID,
        };

        const result = await deleteFlightByIdHelper(deleteObject);

        expect(result.error).toBeNull();
        expect(result.data).toHaveLength(1);

        // Verify Alice's flight was actually deleted.
        const { data: deletedFlight } = await adminSupabase
            .from("flights")
            .select("*")
            .eq("id", AliceFlightId)
            .maybeSingle();

        expect(deletedFlight).toBeNull();
    });


    it("prevents users from deleting another user's flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const deleteObject: DeleteHelperParams = {
            supabase,
            flightId: BobFlightId,
            userId: BOB_ID,
        };

        const result = await deleteFlightByIdHelper(deleteObject);

        expect(result.error).toBeNull();
        expect(result.data).toEqual([]);

        // Verify Bob's flight still exists using the isolated admin client.
        const readObject: ReadFlightParams = {
            supabase: adminSupabase,
            userId: BOB_ID,
            order: "newest",
            criteria: null,
            search: null,
        };

        const bobFlights = await readAllFlights(readObject);

        expect(bobFlights).toHaveLength(1);
        expect(bobFlights[0].flight_number).toBe("LH454");
    });

});