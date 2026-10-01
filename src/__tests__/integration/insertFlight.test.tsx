import { beforeAll, describe, expect, it } from "vitest";
import { ALICE_ID, BOB_ID, supabase, adminSupabase, testDataAlice } from "../testUtilities";
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
});

describe("insert flight", () => {
    it("allows a user to insert their own flight", async () => {
    await supabase.auth.signInWithPassword({
        email: `alice-${ALICE_ID}@test.local`,
        password: "password123",
    });

    const insertData = FlightSchema.parse(testDataAlice);

    const result = await insertFlight({
        supabase,
        insertData,
        userId: ALICE_ID,
    });

    expect(result.error).toBeNull();
});

    it("prevents a user from inserting another user's flight", async () => {
    await supabase.auth.signInWithPassword({
        email: `alice-${ALICE_ID}@test.local`,
        password: "password123",
    });

    const insertData = FlightSchema.parse(testDataAlice);

    const result = await insertFlight({
        supabase,
        insertData,
        userId: BOB_ID,
    });

    expect(result.error).toBeTruthy();
});
});