import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightTableRowProps {
  flight: FlightTypeSchema;
  onFlightSelect: (flight: FlightTypeSchema) => void;
}

export default function FlightTableRow({
  flight,
  onFlightSelect,
}: FlightTableRowProps) {
  return (
    <button
      type="button"
      onClick={() => onFlightSelect(flight)}
      className="grid w-full grid-cols-6 gap-4 border-b px-4 py-3 text-left text-sm transition-colors last:border-b-0 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
    >
      <span className="text-muted-foreground">
        {flight.date
          ? flight.date.toISOString().split("T")[0]
          : "—"}
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
    </button>
  );
}