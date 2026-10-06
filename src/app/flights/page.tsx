import Sidebar from "@/src/components/shared/sidebar/sidebar";
import { fetchFlights } from "@/src/features/actions/readFlights";
import FlightContent from "@/src/components/shared/flightDetails/flightContent";
import { SearchQueryParamsSchema } from "@/src/schemas/flightSchemas";
import MobileHeader from "@/src/components/shared/sidebar/mobileHeader";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined} > 
type PageProps = {
    searchParams: SearchParams
}
export default async function FlightsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const query = SearchQueryParamsSchema.parse({
    order: params.order === undefined ? "newest" : params.order,
    criteria: params.filter === undefined ? null : params.filter,
    search: params.search === undefined ? null : params.search,
  });

  const flightDataArray = await fetchFlights(query);

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <MobileHeader />

        <FlightContent
          flightDataArrayProps={flightDataArray}
        />
      </main>
    </div>
  );
}