import { createClient } from "@/src/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function redirectIfAuthenticated( path = '/dashboard' ) {

    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if ( data?.user ) {
        redirect(path);
    }
}