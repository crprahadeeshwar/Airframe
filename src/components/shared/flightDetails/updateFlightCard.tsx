import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "../../ui/card"
import { updateFlight } from '@/src/features/actions/updateFlights'
import { fetchFlightsById } from '@/src/features/actions/readFlights'
import type { UUID, FlightInput } from '@/src/schemas/flightSchemas'


interface UpdateFlightDetailsCardProps {
  flightId: UUID
}
export default async function UpdateFlightDetailsCard({ flightId }: UpdateFlightDetailsCardProps) {
  const flightDataRaw: FlightInput = await fetchFlightsById(flightId);

  const updateFlightViaForm = updateFlight.bind(null, flightId);

  return (
    <Card className="mx-auto w-full max-w-3xl">
      <CardHeader>
        <div>
          <h1 className="text-2xl font-semibold">Edit Flight</h1>
          <p className="text-sm text-muted-foreground">
            Update the details of this flight log.
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <form action={updateFlightViaForm}>
          <div className="space-y-8">

            //Flight Information
            
            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Flight Information
                </h2>
                <p className="text-sm text-muted-foreground">
                  Basic information about the flight.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Flight Number
                  </span>

                  <input
                    type="text"
                    name="flight_number"
                    defaultValue={flightDataRaw?.flight_number ?? ""}
                    placeholder="EK525"
                    className="rounded-md border bg-background px-3 py-2"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Date
                  </span>

                  <input
                    type="date"
                    name="date"
                    defaultValue={String(flightDataRaw?.date) ?? ""}
                    className="rounded-md border bg-background px-3 py-2"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Airline
                  </span>

                  <input
                    type="text"
                    name="airline"
                    defaultValue={flightDataRaw?.airline ?? ""}
                    placeholder="Emirates"
                    className="rounded-md border bg-background px-3 py-2"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Aircraft Type
                  </span>

                  <input
                    type="text"
                    name="aircraft_type"
                    defaultValue={flightDataRaw?.aircraft_type ?? ""}
                    placeholder="B777-300ER"
                    className="rounded-md border bg-background px-3 py-2"
                  />
                </label>

              </div>
            </section>

            //Aircraft

            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Aircraft
                </h2>
                <p className="text-sm text-muted-foreground">
                  Aircraft identification details.
                </p>
              </div>

              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Registration
                </span>

                <input
                  type="text"
                  name="registration"
                  defaultValue={flightDataRaw?.registration ?? ""}
                  placeholder="A6-EQH"
                  className="rounded-md border bg-background px-3 py-2"
                />
              </label>
            </section>

            //Route

            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Route
                </h2>
                <p className="text-sm text-muted-foreground">
                  Departure and arrival airports.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Departure
                  </span>

                  <input
                    type="text"
                    name="departure"
                    defaultValue={flightDataRaw?.departure ?? ""}
                    placeholder="HYD"
                    className="rounded-md border bg-background px-3 py-2 uppercase"
                  />
                </label>

                <div className="hidden pb-2 text-muted-foreground sm:block">
                  →
                </div>

                <label className="grid gap-2">
                  <span className="text-sm font-medium">
                    Arrival
                  </span>

                  <input
                    type="text"
                    name="arrival"
                    defaultValue={flightDataRaw?.arrival ?? ""}
                    placeholder="DXB"
                    className="rounded-md border bg-background px-3 py-2 uppercase"
                  />
                </label>

              </div>
            </section>

            //Notes 

            <section>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  Notes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Anything worth remembering about this flight.
                </p>
              </div>

              <textarea
                name="notes"
                defaultValue={flightDataRaw?.notes ?? ""}
                placeholder="Anything worth remembering..."
                rows={5}
                className="w-full resize-none rounded-md border bg-background px-3 py-2"
              />
            </section>

            //Actions 

            <div className="flex justify-end gap-3 border-t pt-6">
              <Button
                type="button"
                variant="outline"
              >
                Cancel
              </Button>

              <Button type="submit">
                Save Changes
              </Button>
            </div>

          </div>
        </form>
      </CardContent>
    </Card>
  );
}
