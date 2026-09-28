import { fetchFlights } from "@/src/features/actions/readFlights";
import DashTable from "../table/dashTable";
import { QuerySchema } from "@/src/schemas/flightSchemas";

export default async function DashboardTable() {
    
    const dashQuery: QuerySchema = {
        order: 'newest',
        criteria: null,
        search: null
    }
    
    const flightDataArray = await fetchFlights(dashQuery);

    return (
    <DashTable flightDataArray={flightDataArray}  />  
    )
}