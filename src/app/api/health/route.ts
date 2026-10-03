import { NextResponse } from "next/server";
import { createClient } from "@/src/lib/supabase/server";
import { logger } from "@/src/lib/logger";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("health_check");

    if (error || data !== true) {

        logger.error(
            "health.database.failed",
            "Database health  check failed",
            undefined,
            error ?? new Error("Health check returned unexpected result")
        );
        
        return NextResponse.json(
            {
                status: "degraded",
                database: "unavailable",
            },
            { status: 503 }
        );
    }

    return NextResponse.json(
        {
            status: "ok",
            database: "ok",
        },
        { status: 200 }
    );
}