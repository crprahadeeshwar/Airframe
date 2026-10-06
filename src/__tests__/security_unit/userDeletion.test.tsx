import { describe, expect, it } from "vitest";
import {
    supabase,
    adminSupabase,
} from "../testUtilities";

describe("user deletion", () => {

    it("user deletion cascades to owned flights", async () => {

    const userId = crypto.randomUUID();
    const email = `delete-${userId}@test.local`;
    const password = "Password*123";

    const { error: createError } =
        await adminSupabase.auth.admin.createUser({
            id: userId,
            email,
            password,
            email_confirm: true,
        });

    if (createError) throw createError;

    try {
        const { data: flight, error: flightError } =
            await adminSupabase
                .from("flights")
                .insert({
                    user_id: userId,
                    flight_number: "LH454",
                    notes: "Deletion cascade test",
                })
                .select()
                .single();

        if (flightError) throw flightError;

        expect(flight.user_id).toBe(userId);
        console.log("SUPABASE URL:", process.env.SUPABASE_URL);
console.log(
    "SECRET KEY PREFIX:",
    process.env.SUPABASE_SECRET_KEY?.slice(0, 12)
);

        const { error: deleteError } =
            await adminSupabase.auth.admin.deleteUser(userId);

        expect(deleteError).toBeNull();

        const { data: deletedUser } =
            await adminSupabase.auth.admin.getUserById(userId);

        expect(deletedUser.user).toBeNull();

        const { data: deletedFlight, error: deletedFlightError } =
            await adminSupabase
                .from("flights")
                .select()
                .eq("id", flight.id)
                .maybeSingle();

        expect(deletedFlightError).toBeNull();
        expect(deletedFlight).toBeNull();

    } finally {
        await supabase.auth.signOut();

        await adminSupabase.auth.admin.deleteUser(userId);
    }
});

});