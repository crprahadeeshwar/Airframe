'use client'

import React, { useEffect, useActionState } from 'react';
import { Calendar } from '@/src/components/ui/calendar';
import { Button } from '@/src/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/src/components/ui/popover';
import { createFlight } from '@/src/features/actions/createFlights';
import Link from 'next/link';
import type { FormState } from '@/src/schemas/flightSchemas';
import { ErrorAlert } from '@/src/components/ui/error-alert';
import { toast } from '@/src/components/ui/toast';
import { useRouter } from 'next/navigation';

const initialState: FormState = {
  status: 'idle',
  errorMessage: "",
  errorType: "none"
};

export default function NewFlightForm() {
  const router = useRouter();

  const [date, setDate] = React.useState<Date | undefined>(undefined);

  const [state, formAction, isPending] = useActionState(
    createFlight,
    initialState
  );

  useEffect(() => {
    if (state.status === "error") {
      toast.add({
        type: "error",
        description: "Flight could not be created.",
        priority: "high",
      });
    }

    if (state.status === "success") {
      toast.add({
        type: "success",
        description: "Flight has been created.",
      });

      router.push("/flights");
    }
  }, [state.status, router]);

  return (
    <form action={formAction}>
      <div className="mx-auto w-full max-w-3xl p-4 sm:p-6">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-semibold sm:text-3xl">
            Add Flight
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Log a flight you&apos;ve taken or spotted.
          </p>
        </div>

        <div className="rounded-2xl border p-4 shadow-sm sm:p-6">
          <section>
            <h2 className="text-lg font-semibold">
              Flight Information
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Flight Number
                </span>

                <input
                  type="text"
                  name="flight_number"
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Date
                </span>

                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant="outline"
                        className="h-10 w-full justify-start text-left font-normal"
                      >
                        {date
                          ? date.toLocaleDateString()
                          : "Pick a date"}
                      </Button>
                    }
                  />

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
                <span className="text-sm font-medium">
                  Airline
                </span>

                <input
                  type="text"
                  name="airline"
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Aircraft Type
                </span>

                <input
                  type="text"
                  name="aircraft_type"
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              Aircraft
            </h2>

            <div className="mt-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Registration
                </span>

                <input
                  type="text"
                  name="registration"
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              Route
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Departure
                </span>

                <input
                  type="text"
                  name="departure"
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
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
                  className="h-10 w-full rounded-md border bg-background px-3 py-2"
                />
              </label>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold">
              Notes
            </h2>

            <div className="mt-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium">
                  Notes
                </span>

                <textarea
                  name="notes"
                  placeholder="Anything worth remembering..."
                  rows={5}
                  className="w-full resize-none rounded-md border bg-background px-3 py-2"
                />
              </label>
            </div>
          </section>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <Link href="/flights" className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            </Link>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? "Adding..." : "Add Flight"}
            </Button>
          </div>
        </div>

        {state.errorMessage && state.errorType === "validation" && (
          <ErrorAlert
            title="Could Not Add Flight"
            message={state.errorMessage}
          />
        )}

        {state.errorMessage && state.errorType === "operation" && (
          <ErrorAlert
            title="Oops. Something Went Wrong"
            message={state.errorMessage}
          />
        )}
      </div>
    </form>
  );
}