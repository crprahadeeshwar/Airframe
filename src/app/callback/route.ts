import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/flights";

    if (!code) {
        return NextResponse.redirect(`${origin}/login?error=oauth`);
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        return NextResponse.redirect(`${origin}/login?error=oauth`);
    }

    const safeNext = next.startsWith("/") ? next : "/flights";

    return NextResponse.redirect(`${origin}${safeNext}`);
}