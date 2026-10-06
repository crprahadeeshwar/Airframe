import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightTableRowProps {
  flight: FlightTypeSchema;
  onFlightSelect: (flight: FlightTypeSchema) => void;
}

export default function FlightTableRow({
  flight,
  onFlightSelect,
}: FlightTableRowProps) {
  const formattedDate = flight.date
    ? flight.date.toISOString().split("T")[0]
    : "—";

  return (
    <button
      type="button"
      onClick={() => onFlightSelect(flight)}
      className="w-full border-b text-left transition-colors last:border-b-0 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
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

          <span className="shrink-0 text-xs text-muted-foreground">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
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

        <span className="text-xs text-muted-foreground">
          {flight.aircraft_type ?? "—"}
        </span>
      </div>

      {/* Desktop */}
      <div className="hidden grid-cols-6 gap-4 px-4 py-3 text-sm sm:grid">
        <span className="text-muted-foreground">
          {formattedDate}
        </span>

        <span className="font-medium">
          {flight.flight_number ?? "—"}
        </span>

        <span className="text-muted-foreground">
          {flight.aircraft_type ?? "—"}
        </span>

        <span>
          {flight.departure ?? "—"}
        </span>

        <span>
          {flight.arrival ?? "—"}
        </span>

        <span className="text-muted-foreground">
          {flight.airline ?? "—"}
        </span>
      </div>
    </button>
  );
}