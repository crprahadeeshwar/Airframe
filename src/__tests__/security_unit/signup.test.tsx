import { describe, expect, it } from "vitest";

import { PasswordSchema } from "@/src/schemas/flightSchemas";

import {
    supabase,
    adminSupabase,
} from "../testUtilities";

const email = `auth-${crypto.randomUUID()}@test.local`;
const password = "Password*123";
const invalidPassword = "invalidpassword";

describe("user signup", () => {

    it("user can signup with valid credentials", async () => {

        const parseResult = PasswordSchema.safeParse(password);

        if (!parseResult.success) {
            throw new Error(parseResult.error.message);
        }

        const { data, error } =
            await supabase.auth.signUp({
                email,
                password: parseResult.data,
            });

        expect(error).toBeNull();
        expect(data.user).not.toBeNull();
        expect(data.user?.id).toBeTypeOf("string");
        expect(data.session).not.toBeNull();

        if (data.user) {
            const { error: deleteError } =
                await adminSupabase.auth.admin.deleteUser(
                    data.user.id
                );

            if (deleteError) throw deleteError;
        }
    });

    it("user cannot signup with an invalid password", async () => {

        const parseResult = PasswordSchema.safeParse(
            invalidPassword
        );

        expect(parseResult.success).toBeFalsy();
    });
});