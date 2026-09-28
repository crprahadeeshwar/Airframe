import Sidebar from "@/src/components/shared/sidebar/sidebar";
import { fetchFlights } from "@/src/features/actions/readFlights";
import FlightContent from "@/src/components/shared/flightDetails/flightContent";
import { SearchQueryParamsSchema } from "@/src/schemas/flightSchemas";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined} > 
type PageProps = {
    searchParams: SearchParams
}
export default async function FlightsPage({ searchParams }: PageProps) {

    const params = await searchParams;
    const query = SearchQueryParamsSchema.parse({
        order: params.order === undefined ? 'newest': params.order,
        criteria: params.filter === undefined ? null : params.filter,
        search: params.search === undefined ? null : params.search,
    });

    const flightDataArray = await fetchFlights(query);

    return (
        <div className="flex items-center">
            <Sidebar />
            <FlightContent flightDataArrayProps={flightDataArray} />
        </div>
    );
}