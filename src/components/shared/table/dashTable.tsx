'use client'

import FlightTableHeader from "./flightTableHeader";
import DashTableRow from "./dashTableRow";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";
import { useRouter } from "next/navigation";

interface DashTableProps {
  flightDataArray: FlightTypeSchema[];
}

export default function DashTable({
  flightDataArray,
}: DashTableProps) {

  const router = useRouter();
  const handleOnClick = () => {
    router.push('/flights')
  }
  
  return (
    <section className="overflow-hidden rounded-xl border bg-background shadow-sm" onClick={handleOnClick}>
      <div className="border-b px-4 py-4">
        <h2 className="text-sm font-semibold">
          Recent Flights
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your latest recorded flights.
        </p>
      </div>

      <FlightTableHeader />

      {flightDataArray.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-medium">
              No flights yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first flight to start building your travel history.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {flightDataArray.map((flight) => (
            <DashTableRow
              key={flight.id}
              flight={flight}
            />
          ))}
        </div>
      )}
    </section>
  );
}