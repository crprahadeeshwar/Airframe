function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className}`}
    />
  );
}

export function DashboardMetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="rounded-xl border bg-background p-5 shadow-sm">
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="mt-3 h-9 w-14" />
      </div>

      <div className="rounded-xl border bg-background p-5 shadow-sm">
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="mt-3 h-9 w-14" />
      </div>

      <div className="rounded-xl border bg-background p-5 shadow-sm">
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="mt-3 h-9 w-14" />
      </div>
    </div>
  );
}

export function DashboardTableSkeleton() {
  return (
    <section className="overflow-hidden rounded-xl border bg-background shadow-sm">
      <div className="border-b px-4 py-4">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="mt-2 h-3 w-48" />
      </div>

      {/* Desktop header */}
      <div className="hidden grid-cols-6 gap-4 border-b bg-muted/40 px-4 py-3 sm:grid">
        <SkeletonBlock className="h-3 w-10" />
        <SkeletonBlock className="h-3 w-12" />
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-3 w-10" />
        <SkeletonBlock className="h-3 w-10" />
        <SkeletonBlock className="h-3 w-14" />
      </div>

      {/* Rows */}
      <div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-3 border-b px-4 py-4 last:border-b-0 sm:grid-cols-6 sm:gap-4"
          >
            <div>
              <SkeletonBlock className="h-3 w-10 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-20" />
            </div>

            <div>
              <SkeletonBlock className="h-3 w-12 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-14" />
            </div>

            <div>
              <SkeletonBlock className="h-3 w-16 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-24" />
            </div>

            <div>
              <SkeletonBlock className="h-3 w-10 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-10" />
            </div>

            <div>
              <SkeletonBlock className="h-3 w-10 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-10" />
            </div>

            <div>
              <SkeletonBlock className="h-3 w-14 sm:hidden" />
              <SkeletonBlock className="mt-2 h-4 w-20" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}