import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightTableRowProps {
  flight: FlightTypeSchema
}

export default function FlightTableRow({ flight }: FlightTableRowProps) {
  return (
    <div className="grid grid-cols-6 gap-4 py-2 text-sm sm:grid-cols-8">
      <span>
        {flight.date ? flight.date.toISOString().split("T")[0] : ""}
      </span>

      <span>{flight.flight_number ?? ""}</span>
      <span>{flight.aircraft_type ?? ""}</span>
      <span>{flight.departure ?? ""}</span>
      <span>{flight.arrival ?? ""}</span>
      <span>{flight.airline ?? ""}</span>
    </div>
  );
}