'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema } from "@/src/schemas/flightSchemas";

export async function signup(formData: FormData) {

    const supabase = await createClient();
    const email = EmailSchema.parse(formData.get('email'));
    const password = PasswordSchema.parse(formData.get('password'));
    const { error } = await supabase.auth.signUp({ email, password });

    if ( error ) {
        redirect(`/signup?error=${encodeURIComponent(error.message)}`)
    }
    redirect('/login');

}