'use client';

import FlightHeader from "./flightHeader";
import FlightTable from "../table/flightTable";
import { Button } from "../../ui/button";
import Link from "next/link";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";
import { useState, useActionState } from "react";
import FlightDetailsCard from "./flightDetailsCard";
import UpdateFlightDetailsCard from "./updateFlightCard";
import { updateFlight } from "@/src/features/actions/updateFlights";

interface FlightContentProps {
    flightDataArrayProps: FlightTypeSchema[]
}

export default function FlightContent({flightDataArrayProps,}: FlightContentProps) {

    const [selectedFlight, setSelectedFlight] = useState<FlightTypeSchema | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const handleOnClick = (flight: FlightTypeSchema) => {
        setSelectedFlight(flight)
    };
    const handleDetailsClose = () => {
        setSelectedFlight(null)
    }
    const handleEditOpen = (isOpen: boolean) => {
        setIsEdit(isOpen);
    }
    const handleEditClose = () => {
        setIsEdit(false);
    }
    const handleEditSuccess = () => {
        setIsEdit(false);
        setSelectedFlight(null);
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

            {selectedFlight !== null && !isEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={handleDetailsClose}
                >
                <div onClick={(event) => event.stopPropagation()}>
                <FlightDetailsCard
                    flightData={selectedFlight}
                    flightId={selectedFlight.id}
                    onClose={handleDetailsClose}
                    openEdit={handleEditOpen}
                />
                </div>
            </div>
            )}
            {selectedFlight !== null && isEdit && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={handleEditClose}
                >
                <div onClick={(event) => event.stopPropagation()}>
                <UpdateFlightDetailsCard
                flight={selectedFlight}
                onClose={handleEditClose}
                />
                </div>
            </div>
            )}
        </div>
    );
}

