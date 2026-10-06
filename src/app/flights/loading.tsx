import { FlightsTableSkeleton } from "@/src/components/skeletons/flightsSkeletons";

export default function Loading() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex h-12 items-center border-b px-4 sm:h-14 sm:px-6">
        <div className="animate-pulse">
          <div className="h-4 w-14 rounded-md bg-muted" />
        </div>
      </header>

      <main className="flex-1 space-y-5 p-4 sm:space-y-6 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="animate-pulse">
            <div className="h-7 w-20 rounded-md bg-muted" />

            <div className="mt-2 h-4 w-56 rounded-md bg-muted" />
          </div>

          <div className="h-10 w-full animate-pulse rounded-md bg-muted sm:w-28" />
        </div>

        <FlightsTableSkeleton />
      </main>
    </div>
  );
}