import { fetchFlightStats } from "@/src/features/actions/readFlights";
import FlightCard from "./flightCards";

export default async function DashoardMetrics() {
  const flightStats = await fetchFlightStats();

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      <FlightCard
        title="Flights"
        metric={flightStats?.flight_count ?? 0}
      />

      <FlightCard
        title="Aircraft"
        metric={flightStats?.aircraft_count ?? 0}
      />

      <FlightCard
        title="Airlines"
        metric={flightStats?.airline_count ?? 0}
      />
    </div>
  );
}