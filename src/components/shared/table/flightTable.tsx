import { fetchAllFlights } from "@/src/features/actions/readFlights"
import FlightTableHeader from "./flightTableHeader"
import FlightTableRow from "./flightTableRow"

const flightData = await fetchAllFlights();

export default function FlightTable() {
  if(flightData){
    return (
      <div className="flex flex-col gap-2 px-4 py-2">
        <FlightTableHeader />
        <FlightTableRow flights={flightData} />
        </div>
  )
  } else {
    return(
      <div>
        <div className="flex flex-col gap-2 px-4 py-2">
          <FlightTableHeader />
        </div>
        <div>
          <p> No Data Found </p>
        </div>
      </div>
      )
  }
}