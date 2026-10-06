import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import { AlertDialogDestructive } from "../../ui/destructive-alert"
import { X, ArrowRight } from "lucide-react";
import type { FlightTypeSchema } from "@/src/schemas/flightSchemas"

interface FlightDetailsCardProps {
  flightData: FlightTypeSchema;
  onClose: () => void;
  openEdit: (state: boolean) => void;
  onDeleteSuccess: () => void;
}

export default function FlightDetailsCard({
  flightData,
  onClose,
  openEdit,
  onDeleteSuccess,
}: FlightDetailsCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="relative border-b px-5 py-5 sm:px-6">
        <CardTitle className="pr-8 text-center text-xl sm:text-2xl">
          {flightData.registration}
        </CardTitle>

        <p className="text-center text-sm text-muted-foreground">
          Flight Registration
        </p>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
          aria-label="Close flight details"
        >
          <X />
        </Button>
      </CardHeader>

      <CardContent className="space-y-6 px-5 pt-6 sm:space-y-8 sm:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Aircraft
            </p>

            <p className="mt-1 font-medium">
              {flightData.aircraft_type}
            </p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Flight No.
            </p>

            <p className="mt-1 font-medium">
              {flightData.flight_number}
            </p>
          </div>

          <div className="rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              Airline
            </p>

            <p className="mt-1 font-medium">
              {flightData.airline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="min-w-0 flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              From
            </p>

            <p className="mt-1 text-xl font-semibold sm:text-2xl">
              {flightData.departure}
            </p>
          </div>

          <ArrowRight className="size-4 shrink-0 text-muted-foreground sm:size-5" />

          <div className="min-w-0 flex-1 rounded-xl border p-4 text-center">
            <p className="text-sm text-muted-foreground">
              To
            </p>

            <p className="mt-1 text-xl font-semibold sm:text-2xl">
              {flightData.arrival}
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Date
          </p>

          <p className="mt-1 font-medium">
            {flightData.date
              ? flightData.date.toISOString().split("T")[0]
              : ""}
          </p>
        </div>

        <div className="rounded-xl border p-4">
          <p className="text-sm text-muted-foreground">
            Notes
          </p>

          <p className="mt-2 wrap-break-word">
            {flightData.notes}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-between sm:px-6">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={() => openEdit(true)}
        >
          Edit
        </Button>

        <AlertDialogDestructive
          flightId={flightData.id}
          onDeleteSuccess={onDeleteSuccess}
        />
      </CardFooter>
    </Card>
  );
}