import Sidebar from "@/src/components/shared/sidebar/sidebar";
import DashboardContent from "@/src/components/shared/dashContent/dashContent";

export default function DashboardPage() {
    return (
    <div className="flex min-h-screen w-full"> 
        <Sidebar />
      
        <main className="flex-1 w-full p-6">
        <DashboardContent/>
        </main>
    </div>
    );
}
