import { fetchAllFlights } from "@/src/features/actions/readFlights";
import DashTable from "../table/dashTable";

export default async function DashboardTable() {
    
    const flightDataArray = await fetchAllFlights();

    return (
    <DashTable flightDataArray={flightDataArray}  />  
    )
}