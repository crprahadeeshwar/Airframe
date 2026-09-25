'use client';

import FlightHeader from "./flightHeader";
import FlightTable from "../table/flightTable";
import { Button } from "../../ui/button";
import Link from "next/link";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";
import { useState } from "react";
import FlightDetailsCard from "./flightDetailsCard";

interface FlightContentProps {
    flightDataArrayProps: FlightTypeSchema[]
}

export default function FlightContent({flightDataArrayProps,}: FlightContentProps) {

    const [selectedFlight, setSelectedFlight] = useState<FlightTypeSchema | null>(null);

    const handleOnClick = (flight: FlightTypeSchema) => {
        setSelectedFlight(flight)
    }

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

            <FlightTable flightDataArray={flightDataArrayProps} onFlightSelect={handleOnClick} />
            
            {selectedFlight!== null && 
            <FlightDetailsCard 
                flightData={selectedFlight} 
                flightId={selectedFlight.id}
            />}
        </div>
    );
}

