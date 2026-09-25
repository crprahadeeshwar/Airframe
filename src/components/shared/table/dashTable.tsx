import FlightTableHeader from "./flightTableHeader";
import DashTableRow from "./dashTableRow";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas";

interface DashTableProps {
    flightDataArray: FlightTypeSchema[];
}

export default function DashTable({flightDataArray,}: DashTableProps) {

  return (
    <div>
    <div>
      <FlightTableHeader />
    </div>
    <div>
      {flightDataArray.length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <ul>
          {flightDataArray.map((flight) => (
            <li key={flight.id}>
              <DashTableRow flight={flight} />
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}