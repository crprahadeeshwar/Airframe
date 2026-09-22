'use client'

import React from 'react';
import { Calendar } from '@/src/components/ui/calendar';
import { Button } from '@/src/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/src/components/ui/popover';
import createFlight from '@/src/features/actions/createFlights';

export default function NewFlightForm() {

  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return(
  <form action={createFlight}>
    <div className="mx-auto w-full max-w-3xl p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Add Flight</h1>
        <p className="text-muted-foreground">
          Log a flight you've taken or spotted.
        </p>
      </div>

      <div className="rounded-2xl border p-6 shadow-sm">

        //Flight Information

        <section>
          <h2 className="text-lg font-semibold">
            Flight Information
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">

            <label className="grid gap-2">
              <span className="text-sm font-medium">Flight Number</span>
              <input
                type="text"
                name="flight_number"
                placeholder="EK525"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Date</span>

              <Popover>
                <PopoverTrigger>
                  <Button
                    variant="outline"
                    type="button"
                    className="justify-start text-left font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                  />
                </PopoverContent>
              </Popover>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Airline</span>
              <input
                type="text"
                name="airline"
                placeholder="Emirates"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Aircraft Type</span>
              <input
                type="text"
                name="aircraft_type"
                placeholder="B777-300ER"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>

          </div>
        </section>


        //Aircraft 

        <section className="mt-8">
          <h2 className="text-lg font-semibold">
            Aircraft
          </h2>

          <div className="mt-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Registration</span>
              <input
                type="text"
                name="registration"
                placeholder="A6-EQH"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>
          </div>
        </section>


        //Route 

        <section className="mt-8">
          <h2 className="text-lg font-semibold">
            Route
          </h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">

            <label className="grid gap-2">
              <span className="text-sm font-medium">Departure</span>
              <input
                type="text"
                name="departure"
                placeholder="HYD"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>

            <div className="hidden pb-2 text-muted-foreground sm:block">
              →
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-medium">Arrival</span>
              <input
                type="text"
                name="arrival"
                placeholder="DXB"
                className="rounded-md border bg-background px-3 py-2"
              />
            </label>

          </div>
        </section>


        //Notes 

        <section className="mt-8">
          <h2 className="text-lg font-semibold">
            Notes
          </h2>

          <div className="mt-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium">Notes</span>
              <textarea
                name="notes"
                placeholder="Anything worth remembering..."
                rows={5}
                className="resize-none rounded-md border bg-background px-3 py-2"
              />
            </label>
          </div>
        </section>


        //Actions
        
        <div className="mt-8 flex justify-end gap-3 border-t pt-6">
          <Button
            type="button"
            variant="outline"
          >
            Cancel
          </Button>

          <Button type="submit">
            Add Flight
          </Button>
        </div>

      </div>
    </div>
  </form>
)
}


