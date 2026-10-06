import Sidebar from "@/src/components/shared/sidebar/sidebar";
import DashboardContent from "@/src/components/shared/dashContent/dashContent";
import MobileHeader from "@/src/components/shared/sidebar/mobileHeader";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <MobileHeader />

        <DashboardContent />
      </main>
    </div>
  );
}