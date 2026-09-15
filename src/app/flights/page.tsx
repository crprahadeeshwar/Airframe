import Sidebar from "@/src/components/shared/sidebar/sidebar";
import FlightContent from "@/src/components/shared/flightContent/flightContent";

export default function FlightsPage() {
    return (
        <div className="flex items-center">
            <Sidebar/>
            <FlightContent/>
        </div>
    );
}