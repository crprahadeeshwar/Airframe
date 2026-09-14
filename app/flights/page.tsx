import Sidebar from "@/components/sidebar/sidebar";
import FlightContent from "@/components/flightContent/flightContent";

export default function FlightsPage() {
    return (
        <div className="flex items-center">
            <Sidebar/>
            <FlightContent/>
        </div>
    );
}