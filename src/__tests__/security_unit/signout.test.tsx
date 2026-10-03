import { describe, expect, it } from "vitest";
import {
    supabase,
    adminSupabase,
} from "../testUtilities";

describe("user signout", () => {

    it("user can sign out successfully", async () => {

        const userId = crypto.randomUUID();
        const email = `signout-${userId}@test.local`;
        const password = "Password*123";

        const { data: createdUser, error: createError } =
            await adminSupabase.auth.admin.createUser({
                id: userId,
                email,
                password,
                email_confirm: true,
            });

        if (createError) throw createError;

        const { data: signInData, error: signInError } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        expect(signInError).toBeNull();
        expect(signInData.session).not.toBeNull();

        const { error: signOutError } =
            await supabase.auth.signOut();

        expect(signOutError).toBeNull();

        const { data: userData } =
            await supabase.auth.getUser();

        expect(userData.user).toBeNull();

        const { error: deleteError } =
            await adminSupabase.auth.admin.deleteUser(
                createdUser.user.id
            );

        if (deleteError) throw deleteError;
    });

});