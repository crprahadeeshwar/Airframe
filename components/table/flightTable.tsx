import FlightTableHeader from "./flightTableHeader"
import FlightTableRow from "./flightTableRow"

const flightData = [
  {
    date: "2023-10-01",
    flightNumber: "AA123",
    aircraft: "Boeing 737",
    departure: "JFK",
    arrival: "LAX",
    airline: "American Airlines"
  },
  {
    date: "2023-10-02",
    flightNumber: "DL456",
    aircraft: "Airbus A320",
    departure: "ATL",
    arrival: "ORD",
    airline: "Delta Airlines"
  }
];


export default function FlightTable() {
  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <FlightTableHeader />
      <FlightTableRow flights={flightData} />
    </div>
  )
}