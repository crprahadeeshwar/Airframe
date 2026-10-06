"use client";

import FlightHeader from "./flightHeader";
import FlightTable from "../table/flightTable";
import FlightControls from "../controls/flightControls";
import { Button } from "../../ui/button";
import Link from "next/link";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";
import { useState } from "react";
import FlightDetailsCard from "./flightDetailsCard";
import UpdateFlightDetailsCard from "./updateFlightCard";
import { useRouter } from "next/navigation";



interface FlightContentProps {
  flightDataArrayProps: FlightTypeSchema[];
}

export default function FlightContent({
  flightDataArrayProps,
}: FlightContentProps) {
  const router = useRouter();

  const [selectedFlight, setSelectedFlight] =
    useState<FlightTypeSchema | null>(null);

  const [isEdit, setIsEdit] = useState(false);

  const handleOnClick = (flight: FlightTypeSchema) => {
    setSelectedFlight(flight);
  };

  const handleDetailsClose = () => {
    setSelectedFlight(null);
  };

  const handleEditOpen = (isOpen: boolean) => {
    setIsEdit(isOpen);
  };

  const handleEditClose = () => {
    setIsEdit(false);
  };

  const handleEditSuccess = () => {
    setIsEdit(false);
    setSelectedFlight(null);
  };

  const handleDeleteSuccess = () => {
    setSelectedFlight(null);
    router.refresh();
  };

  return (
    <div className="flex min-h-full flex-col">
      <FlightHeader />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Flights
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of your flights and travel history.
            </p>
          </div>

          <Link href="/flights/new" className="w-full sm:w-auto">
            <Button type="button" className="w-full sm:w-auto">
              Add Flight
            </Button>
          </Link>
        </div>

        <FlightControls />

        <FlightTable
          flightDataArray={flightDataArrayProps}
          onFlightSelect={handleOnClick}
        />
      </main>

      {/* Flight details */}
      {selectedFlight !== null && !isEdit && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8"
          onClick={handleDetailsClose}
        >
          <div
            className="w-full max-w-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <FlightDetailsCard
              flightData={selectedFlight}
              onClose={handleDetailsClose}
              openEdit={handleEditOpen}
              onDeleteSuccess={handleDeleteSuccess}
            />
          </div>
        </div>
      )}

      {/* Edit flight */}
      {selectedFlight !== null && isEdit && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-3 py-4 backdrop-blur-sm sm:px-4 sm:py-8"
          onClick={handleEditClose}
        >
          <div
            className="w-full max-w-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <UpdateFlightDetailsCard
              flight={selectedFlight}
              onClose={handleEditClose}
              onSuccess={handleEditSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}