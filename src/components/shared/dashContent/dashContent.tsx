import DashHeader from "./dashHeader";
import DashoardMetrics from "./dashMetrics";
import DashboardTable from "./dashTable";
import { DashboardMetricsSkeleton, DashboardTableSkeleton } from "../../skeletons/dashboardSkeletons";
import { Suspense } from "react";

export default function DashboardContent() {
  return (
    <div className="flex min-h-full flex-col">
      <DashHeader />

      <main className="flex-1 space-y-6 p-4 sm:p-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Your flight history at a glance.
          </p>
        </div>

        <Suspense fallback={<DashboardMetricsSkeleton />}>
          <DashoardMetrics />
        </Suspense>

        <Suspense fallback={<DashboardTableSkeleton />}>
          <DashboardTable />
        </Suspense>
      </main>
    </div>
  );
}