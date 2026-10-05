'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema, AuthFormState } from "@/src/schemas/flightSchemas";
import { logger } from "@/src/lib/logger";
import { success } from "zod";

export async function signup(
    prevState: AuthFormState,
    formData: FormData
): Promise<AuthFormState>  {

    const supabase = await createClient();

    const email = EmailSchema.safeParse(formData.get('email'));
    const password = PasswordSchema.safeParse(formData.get('password'));

    if(!email.success) {

        return {
            field: { email: "" },
            status: "error",
            errorMessage: "invalid.email",
            errorType: "validation",
        }; 
    }

    if(!password.success) {
        return {
            field: { email: email.data },
            status: "error",
            errorMessage: "invalid.password",
            errorType: "validation"
        }
    }

    if(email.success && password,success) {
        const { error } = await supabase.auth.signUp({
            email: email.data,
            password: password.data
        });

        if (error) {
            logger.error(
                "auth.signup.failed",
                "Signup failed",
                { errorType: "operation" },
                error
            );

            return {
                field: { email: email.data },
                status: "error",
                errorMessage: "Error signing up. Please try again!",
                errorType: "operation"
            };
        }
    }
    logger.info(
        "auth.signup.success",
        "User signup completed successfully"
    );

    redirect('/login');
}