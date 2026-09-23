'use server';

import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";
import { EmailSchema, PasswordSchema } from "@/src/schemas/flightSchemas";

export default async function login(formData: FormData) {

    const supabase = await createClient();
    const email = EmailSchema.parse(formData.get('email'));
    const password = PasswordSchema.parse(formData.get('password'));
    const { error } = await supabase.auth.signInWithPassword({ email, password})

    if ( error ) {
        redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }
    redirect('/dashboard');

}