import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardHeader,
} from "../../ui/card"
import { updateFlight } from '@/src/features/actions/updateFlights'
import type { FlightTypeSchema } from '@/src/schemas/flightSchemas'
import { useActionState, useEffect } from "react"
import type { UpdateState } from "@/src/features/actions/updateFlights"
import { ErrorAlert } from "../../ui/error-alert"
import { toast } from "../../ui/toast"

interface UpdateFlightDetailsCardProps {
  flight: FlightTypeSchema;
  onClose: () => void;
  onSuccess: () => void;
}
export default function UpdateFlightDetailsCard({ flight, onClose, onSuccess }: UpdateFlightDetailsCardProps) {
  const updateFlightViaForm = updateFlight.bind(null, flight.id);

  const initialState: UpdateState = {
    status: 'idle',
    message: ''
  };

  const [state, formAction, isPending] = useActionState(updateFlightViaForm, initialState);

  useEffect(() => {
    if (state.status === 'success') {
      onSuccess();
      toast.add({
            type: "success",
            description: "Flight has been updated.",
          })
    }
    if (state.status === 'error') {
      toast.add({
            type: "error",
            description: "Flight could not be updated",
            priority: "high"
          })
    }
  }, [state.status, onSuccess]);

  return (
    <div>
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
        <form action={formAction}>
          <div className="space-y-8">

            
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
                    defaultValue={flight?.flight_number ?? ""}
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
                    defaultValue={flight?.date ? flight.date.toISOString().split("T")[0] : ""}                    
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
                    defaultValue={flight?.airline ?? ""}
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
                    defaultValue={flight?.aircraft_type ?? ""}
                    placeholder="B777-300ER"
                    className="rounded-md border bg-background px-3 py-2"
                  />
                </label>

              </div>
            </section>


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
                  defaultValue={flight?.registration ?? ""}
                  placeholder="A6-EQH"
                  className="rounded-md border bg-background px-3 py-2"
                />
              </label>
            </section>


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
                    defaultValue={flight?.departure ?? ""}
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
                    defaultValue={flight?.arrival ?? ""}
                    placeholder="DXB"
                    className="rounded-md border bg-background px-3 py-2 uppercase"
                  />
                </label>

              </div>
            </section>

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
                defaultValue={flight.notes ?? ""}
                placeholder="Anything worth remembering..."
                rows={5}
                className="w-full resize-none rounded-md border bg-background px-3 py-2"
              />
            </section>


            <div className="flex justify-end gap-3 border-t pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" disabled={isPending} >
                {isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

          </div>
        </form>
        {state.status === 'error' && (
      <ErrorAlert title='An Error Occured.' message={state.message}/>
        )
        }
      </CardContent>  
    </Card>
    
    </div>
  );
}
