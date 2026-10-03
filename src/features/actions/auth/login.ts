'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema } from "@/src/schemas/flightSchemas";
import { logger } from "@/src/lib/logger";

export async function login(formData: FormData) {

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

        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    logger.info(
        "auth.login.success",
        "User logged in successfully"
    );

    redirect('/dashboard');
}