import { describe, expect, it } from "vitest";
import {
    supabase,
} from "../testUtilities";
import { getFlightStats } from "@/src/features/actions/readFlights";

describe("anonymous user", () => {

    it("anonymous user has no authenticated user", async () => {

        await supabase.auth.signOut();

        const { data, error } =
            await supabase.auth.getUser();

        expect(error).not.toBeNull();
        expect(data.user).toBeNull();
    });


    it("anonymous user cannot access protected flight stats", async () => {

        await supabase.auth.signOut();

        const result = await getFlightStats({
            supabase,
        });

        expect(result.data).toBeNull();
        expect(result.error).not.toBeNull();
        expect(result.error?.message).toBe("Unauthorized");
    });

});