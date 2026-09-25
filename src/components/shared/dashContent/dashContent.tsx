import DashHeader from "./dashHeader"
import FlightCard from "./flightCards"
import FlightTable from "../table/flightTable"
import { fetchAllFlights, fetchFlightStats } from "@/src/features/actions/readFlights"

export default async function DashboardContent() {
  const flightDataArray = await fetchAllFlights();
  const flightStats = await fetchFlightStats();
  
  return (
    <div>
      <DashHeader />

      <div className="flex flex-row gap-4">
        <FlightCard
          title="Flights"
          metric={flightStats?.flight_count ?? "N/A"}
        />

        <FlightCard
          title="Aircraft"
          metric={flightStats?.aircaft_count ?? 0}
        />

        <FlightCard
          title="Airlines"
          metric={flightStats?.airline_count ?? "N/A"}
        />
      </div>

      <FlightTable flightDataArray={flightDataArray} />
    </div>
  );
}