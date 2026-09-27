import FlightTableHeader from "./flightTableHeader";
import FlightTableRow from "./flightTableRow";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightTableProps {
  flightDataArray: FlightTypeSchema[];
  onFlightSelect: (flight: FlightTypeSchema) => void;
}

export default function FlightTable({
  flightDataArray,
  onFlightSelect,
}: FlightTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <FlightTableHeader />

      {flightDataArray.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center px-6">
          <div className="text-center">
            <p className="text-sm font-medium">No flights yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first flight to start building your travel history.
            </p>
          </div>
        </div>
      ) : (
        <div>
          {flightDataArray.map((flight) => (
            <FlightTableRow
              key={flight.id}
              flight={flight}
              onFlightSelect={onFlightSelect}
            />
          ))}
        </div>
      )}
    </section>
  );
}