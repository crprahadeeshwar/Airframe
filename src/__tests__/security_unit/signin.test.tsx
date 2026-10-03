import { beforeAll, describe, expect, it} from "vitest";

import {
    ALICE_ID,
    supabase,
    adminSupabase,
} from "../testUtilities";

const AUTH_TEST_USER_ID = crypto.randomUUID();
const email = `auth-${AUTH_TEST_USER_ID}@test.local`;
const password = "password123";
const invalidPassword ='invalidpassword';

beforeAll(async () => {

    const { error: aliceError } =
        await adminSupabase.auth.admin.createUser({
            id: AUTH_TEST_USER_ID,
            email: email,
            password: password,
            email_confirm: true,
        });

    if (aliceError) throw aliceError;

});

describe("user SignIn", () => {

    it("user can signin into their registered account", async () => {

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        expect(error).toBeNull();
        expect(data.user).not.toBeNull();
        expect(data.user?.id).toBe(AUTH_TEST_USER_ID);
        expect(data.session).not.toBeNull();

    });

    it("user cannot signin with invalid credentials", async () => {

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password: invalidPassword,
            });

        expect(error).not.toBeNull();
        expect(data.user).toBeNull();
        expect(data.session).toBeNull();
    })
});