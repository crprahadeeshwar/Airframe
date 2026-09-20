import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { ArrowRight, Plane } from "lucide-react"
import { deleteFlightById } from "@/src/features/actions/deleteFlights"

export default function FlightDetailsCard() {

    function handleDelete() {
        //Delete flight by flight ID
    }

  return (
    <Card className="m-4 w-full max-w-2xl">
      
      {/* Registration */}
      <CardHeader className="items-center text-center border-b">
        <CardTitle className="text-2xl">
          A6-EQH
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Flight Registration
        </p>
      </CardHeader>

      <CardContent className="space-y-8 pt-6">

        {/* Aircraft / Flight Number / Airline */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Aircraft</p>
            <p className="mt-1 font-medium">B777-300ER</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Flight No.</p>
            <p className="mt-1 font-medium">EK525</p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">Airline</p>
            <p className="mt-1 font-medium">Emirates</p>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">From</p>
            <p className="mt-1 text-2xl font-semibold">HYD</p>
          </div>

          <ArrowRight className="shrink-0 text-muted-foreground" />

          <div className="flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">To</p>
            <p className="mt-1 text-2xl font-semibold">DXB</p>
          </div>
        </div>

        {/* Date */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Date</p>
          <p className="mt-1 font-medium">20 September 2026</p>
        </div>

        {/* Notes */}
        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">Notes</p>
          <p className="mt-2">
            Window seat. Great view of the wing during departure.
          </p>
        </div>

      </CardContent>

      {/* Actions */}
      <CardFooter className="flex justify-between border-t">
        <Button variant="outline">
          Edit
        </Button>

        <Button variant="destructive" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>

    </Card>
  )
}