'use server'

import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import { logger } from "@/src/lib/logger";

export async function logout(){

    const supabase = await createClient();

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
        logger.error(
            "auth.logout.failed",
            "Logout failed",
            { errorType: "operation" },
            error
        );

        redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    logger.info(
        "auth.logout.success",
        "User logged out successfully"
    );

    redirect('/login');
}