'use server'

import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";

export async function logout(){

    const supabase = await createClient();

    const { error } = await supabase.auth.signOut({ scope: "local" });

    if ( error ) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    redirect('/login');
}