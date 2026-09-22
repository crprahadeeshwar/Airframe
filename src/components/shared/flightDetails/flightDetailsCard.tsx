import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { AlertDialogDestructive } from "../../ui/destructive-alert"
import { ArrowRight, Plane } from "lucide-react"
import { fetchFlightsById } from "@/src/features/actions/readFlights"
import type { FlightInput, UUID } from "@/src/schemas/flightSchemas"

interface FlightDetailsCardProps {
  flightId: UUID;
}

export default async function FlightDetailsCard({ flightId } : FlightDetailsCardProps) {

  let rawDetails = await fetchFlightsById(flightId);

  const flightDetails: FlightInput =  rawDetails;

  return (
    <Card className="m-4 w-full max-w-2xl">
      
      //Registration

      <CardHeader className="items-center text-center border-b">
        <CardTitle className="text-2xl">
          {flightDetails.registration}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Flight Registration
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">

        //Aircraft, Airline, Flight Number

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Aircraft</p>
            <p className="mt-1 font-medium">{flightDetails.aircraft_type}</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Flight No.</p>
            <p className="mt-1 font-medium">{flightDetails.flight_number}</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Airline</p>
            <p className="mt-1 font-medium">{flightDetails.airline}</p>
          </div>
        </div>

        //Route 

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="mt-1 text-2xl font-semibold">{flightDetails.departure}</p>
          </div>

          <ArrowRight className="shrink-0 text-muted-foreground" />

          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">To</p>
            <p className="mt-1 text-2xl font-semibold">{flightDetails.arrival}</p>
          </div>
        </div>

        //Date

        <div className="text-center">
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="mt-1 font-medium">// Date</p>
        </div>

        //Notes 

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Notes</p>
          <p className="mt-2">
            {flightDetails.notes}
          </p>
        </div>

      </CardContent>

      //Actions
      
      <CardFooter className="flex justify-between border-t">
        <Button variant="outline">
          Edit
        </Button>

        <AlertDialogDestructive flightId = {flightId}/>
      </CardFooter>

    </Card>
  )
}