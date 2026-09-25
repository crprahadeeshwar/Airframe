import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { AlertDialogDestructive } from "../../ui/destructive-alert"
import { ArrowRight } from "lucide-react"
import type { FlightTypeSchema, UUID } from "@/src/schemas/flightSchemas"

interface FlightDetailsCardProps {
  flightData: FlightTypeSchema;
  flightId: UUID;
}

export default async function FlightDetailsCard({ flightData, flightId } : FlightDetailsCardProps) {
  return (
    <Card className="m-4 w-full max-w-2xl">
      
      <CardHeader className="items-center text-center border-b">
        <CardTitle className="text-2xl">
          {flightData.registration}
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Flight Registration
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Aircraft</p>
            <p className="mt-1 font-medium">{flightData.aircraft_type}</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Flight No.</p>
            <p className="mt-1 font-medium">{flightData.flight_number}</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Airline</p>
            <p className="mt-1 font-medium">{flightData.airline}</p>
          </div>
        </div>


        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="mt-1 text-2xl font-semibold">{flightData.departure}</p>
          </div>

          <ArrowRight className="shrink-0 text-muted-foreground" />

          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">To</p>
            <p className="mt-1 text-2xl font-semibold">{flightData.arrival}</p>
          </div>
        </div>



        <div className="text-center">
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="mt-1 font-medium">// Date</p>
        </div>


        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Notes</p>
          <p className="mt-2">
            {flightData.notes}
          </p>
        </div>

      </CardContent>

      <CardFooter className="flex justify-between border-t">
        <Button variant="outline">
          Edit
        </Button>

        <AlertDialogDestructive flightId = {flightId}/>
      </CardFooter>

    </Card>
  )
}