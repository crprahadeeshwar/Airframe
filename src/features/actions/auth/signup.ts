'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema } from "@/src/schemas/flightSchemas";
import { logger } from "@/src/lib/logger";

export async function signup(formData: FormData) {

    const supabase = await createClient();

    const email = EmailSchema.parse(formData.get('email'));
    const password = PasswordSchema.parse(formData.get('password'));

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        logger.error(
            "auth.signup.failed",
            "Signup failed",
            { errorType: "operation" },
            error
        );

        redirect(`/signup?error=${encodeURIComponent(error.message)}`);
    }

    logger.info(
        "auth.signup.success",
        "User signup completed successfully"
    );

    redirect('/login');
}