import FlightTableHeader from "./flightTableHeader";
import FlightTableRow from "./flightTableRow";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface FlightTableProps {
  flightDataArray: FlightTypeSchema[];
}

export default function FlightTable({flightDataArray,}: FlightTableProps) {

  return (
    <div>
      <FlightTableHeader />

      {flightDataArray.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <ul>
          {flightDataArray.map((flight) => (
            <li key={flight.id}>
              <FlightTableRow flight={flight} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}