import Sidebar from "@/src/components/shared/sidebar/sidebar";
import { fetchAllFlights } from "@/src/features/actions/readFlights";
import FlightContent from "@/src/components/shared/flightDetails/flightContent";
export default async function FlightsPage() {
    const flightDataArray = await fetchAllFlights();

    return (
        <div className="flex items-center">
            <Sidebar />
            <FlightContent flightDataArrayProps={flightDataArray} />
        </div>
    );
}