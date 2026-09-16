import DashHeader from "./dashHeader"
import FlightCard from "./flightCards"
import FlightTable from "../table/flightTable"

export default function DashboardContent() {
    return(
        <div>
            <DashHeader/>
                <div className="flex flex-row gap-4">
                    <FlightCard title="Flights" metric={100}/>
                    <FlightCard title="Aircraft" metric={5}/>
                    <FlightCard title="Airlines" metric={10}/>
                </div>
            <FlightTable />
        </div>
    )
}