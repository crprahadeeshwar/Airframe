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
    updateFlightByIdHelper,
    type UpdateFlightHelperParams,
} from "@/src/features/actions/updateFlights";
import { insertFlight } from "@/src/features/actions/createFlights";
import { FlightTestSchema } from "@/src/schemas/flightSchemas";
import {
    readAllFlights,
    type ReadFlightParams,
} from "@/src/features/actions/readFlights";


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


describe("update flight", () => {

    it("allows users to update their own flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const updateData = FlightTestSchema.parse({
            ...testDataAlice,
            id: AliceFlightId,
            flight_number: "EK526",
            arrival: "LHR",
            notes: "Updated Alice flight",
        });

        const updateObject: UpdateFlightHelperParams = {
            supabase,
            flightId: AliceFlightId,
            userId: ALICE_ID,
            updateData,
        };

        const result = await updateFlightByIdHelper(updateObject);

        expect(result.error).toBeNull();
        expect(result.data).toHaveLength(1);

        const { data: updatedFlight, error } = await adminSupabase
            .from("flights")
            .select("*")
            .eq("id", AliceFlightId)
            .single();

        expect(error).toBeNull();
        expect(updatedFlight.flight_number).toBe("EK526");
        expect(updatedFlight.arrival).toBe("LHR");
        expect(updatedFlight.notes).toBe("Updated Alice flight");
    });


    it("prevents users from updating another user's flight", async () => {
        await supabase.auth.signInWithPassword({
            email: `alice-${ALICE_ID}@test.local`,
            password: "password123",
        });

        const updateData = FlightTestSchema.parse({
            ...testDataBob,
            id: BobFlightId,
            flight_number: "HACKED",
            arrival: "LHR",
            notes: "Alice tried to update Bob's flight",
        });

        const updateObject: UpdateFlightHelperParams = {
            supabase,
            flightId: BobFlightId,
            userId: BOB_ID,
            updateData,
        };

        const result = await updateFlightByIdHelper(updateObject);

        expect(result.error).toBeNull();
        expect(result.data).toEqual([]);


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
        expect(bobFlights[0].arrival).toBe("DXB");
        expect(bobFlights[0].notes).toBe("Bob's Flight");
     });

});