'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, stringSchema, type AuthFormState } from "@/src/schemas/flightSchemas";
import { logger } from "@/src/lib/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by useActionState signature
export async function login(
    prevState: AuthFormState,
    formData: FormData
): Promise<AuthFormState> {

    const supabase = await createClient();

    const email = EmailSchema.safeParse(formData.get('email'));
    const password = stringSchema.safeParse(formData.get('password'));

    if(!email.success) {
        return {
            field: { email: "" },
            status: "error",
            errorMessage: "Invalid email",
            errorType: "validation",
        };
    }
    if(email.success && password.success){
        const { error } = await supabase.auth.signInWithPassword({
            email: email.data,
            password: password.data
        });

        if (error) {
            logger.error(
                "auth.login.failed",
                "Login failed",
                { errorType: "authentication" },
                error
            );

            return {
                field: { email: email.data },
                status: "error",
                errorMessage: "Invalid email or password. Please try again!",
                errorType: "operation",
            };
        }}

    logger.info(
        "auth.login.success",
        "User logged in successfully"
    );

    redirect('/dashboard');
}