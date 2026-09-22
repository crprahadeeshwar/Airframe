import Sidebar from "@/src/components/shared/sidebar/sidebar";
import FlightContent from "@/src/components/shared/flightContent/flightContent";
import FlightDetailsCard from "@/src/components/shared/flightDetails/flightDetailsCard";
import updateFlightDetails from "@/src/components/shared/flightDetails/updateFlightCard";



export default function FlightsPage() {
    return (
        <div className="flex items-center">
            <Sidebar/>
            <FlightContent/>
        </div>
    );
}