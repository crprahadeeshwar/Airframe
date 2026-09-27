import { FlightsTableSkeleton } from "@/src/components/skeletons/flightsSkeletons";

export default function Loading() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="flex h-14 items-center border-b px-6">
        <div className="animate-pulse">
          <div className="h-4 w-14 rounded-md bg-muted" />
        </div>
      </header>

      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="animate-pulse">
            <div className="h-7 w-20 rounded-md bg-muted" />

            <div className="mt-2 h-4 w-56 rounded-md bg-muted" />
          </div>

          <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
        </div>

        <FlightsTableSkeleton />
      </main>
    </div>
  );
}