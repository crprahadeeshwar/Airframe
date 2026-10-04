'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema, type FormState } from "@/src/schemas/flightSchemas";
import { logger } from "@/src/lib/logger";

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- required by useActionState signature
export async function login(
    prevState: FormState,
    formData: FormData
): Promise<FormState> {

    const supabase = await createClient();

    const email = EmailSchema.parse(formData.get('email'));
    const password = PasswordSchema.parse(formData.get('password'));

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        logger.error(
            "auth.login.failed",
            "Login failed",
            { errorType: "authentication" },
            error
        );

        return {
            status: "error",
            errorMessage: "Invalid email or password.",
            errorType: "operation",
        };
    }

    logger.info(
        "auth.login.success",
        "User logged in successfully"
    );

    redirect('/dashboard');
}