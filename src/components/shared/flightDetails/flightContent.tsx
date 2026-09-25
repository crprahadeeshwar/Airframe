import FlightHeader from "./flightHeader";
import FlightTable from "../table/flightTable";
import { Button } from "../../ui/button";
import Link from "next/link";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightContentProps {
    flightDataArrayProps: FlightTypeSchema[]
}

export default async function FlightContent({flightDataArrayProps,}: FlightContentProps) {
    return (
        <div>
            <FlightHeader />

            <div className="flex flex-col items-left gap-2 p-4">
                <h1 className="text-2xl">Flights</h1>
                <p>Keep track of your flights.</p>
            </div>

            <div className="flex items-end justify-end gap-2 p-4 px-6">
                <Link href="/flights/new">
                    <Button variant="secondary">Add Flight</Button>
                </Link>
            </div>

            <FlightTable flightDataArray={flightDataArrayProps} />
        </div>
    );
}