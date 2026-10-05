"use server";

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { logger } from "@/src/lib/logger";

export async function loginWithGoogle() {
    const supabase = await createClient();

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${siteUrl}/auth/callback?next=/flights`,
        },
    });

    if (error) {
        logger.error(
            "auth.google.failed",
            "Google OAuth initialization failed",
            { errorType: "operation" },
            error
        );

        throw new Error("Could not start Google sign in.");
    }

    if (data.url) {
        redirect(data.url);
    }

    throw new Error("Could not start Google sign in.");
}