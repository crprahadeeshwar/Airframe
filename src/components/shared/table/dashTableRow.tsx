import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface DashTableRowProps {
  flight: FlightTypeSchema;
}

export default function DashTableRow({
  flight,
}: DashTableRowProps) {
  const formattedDate = flight.date
    ? flight.date.toISOString().split("T")[0]
    : "—";

  return (
    <div className="border-b last:border-b-0">
      {/* Mobile */}
      <div className="flex flex-col gap-3 px-4 py-4 sm:hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="font-medium">
              {flight.flight_number ?? "—"}
            </p>

            <p className="mt-1 truncate text-sm text-muted-foreground">
              {flight.airline ?? "—"}
            </p>
          </div>

          <p className="shrink-0 text-xs text-muted-foreground">
            {formattedDate}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">
            {flight.departure ?? "—"}
          </span>

          <span className="text-muted-foreground">
            →
          </span>

          <span className="font-medium">
            {flight.arrival ?? "—"}
          </span>
        </div>

        <p className="text-xs text-muted-foreground">
          {flight.aircraft_type ?? "—"}
        </p>
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-6 gap-4 px-4 py-4 text-sm sm:grid">
        <div>
          <p className="text-muted-foreground">
            {formattedDate}
          </p>
        </div>

        <div>
          <p className="font-medium">
            {flight.flight_number ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            {flight.aircraft_type ?? "—"}
          </p>
        </div>

        <div>
          <p>
            {flight.departure ?? "—"}
          </p>
        </div>

        <div>
          <p>
            {flight.arrival ?? "—"}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            {flight.airline ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}