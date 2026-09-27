import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface DashTableRowProps {
  flight: FlightTypeSchema;
}

export default function DashTableRow({
  flight,
}: DashTableRowProps) {
  return (
    <div className="grid grid-cols-2 gap-3 border-b px-4 py-4 text-sm last:border-b-0 sm:grid-cols-6 sm:gap-4">
      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          Date
        </span>

        <p className="text-muted-foreground">
          {flight.date
            ? flight.date.toISOString().split("T")[0]
            : "—"}
        </p>
      </div>

      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          Flight
        </span>

        <p className="font-medium">
          {flight.flight_number ?? "—"}
        </p>
      </div>

      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          Aircraft
        </span>

        <p className="text-muted-foreground">
          {flight.aircraft_type ?? "—"}
        </p>
      </div>

      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          From
        </span>

        <p>
          {flight.departure ?? "—"}
        </p>
      </div>

      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          To
        </span>

        <p>
          {flight.arrival ?? "—"}
        </p>
      </div>

      <div>
        <span className="text-xs text-muted-foreground sm:hidden">
          Airline
        </span>

        <p className="text-muted-foreground">
          {flight.airline ?? "—"}
        </p>
      </div>
    </div>
  );
}