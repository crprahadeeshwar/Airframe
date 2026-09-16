import { Button } from "@/src/components/ui/button"
import Sidebar from "@/src/components/shared/sidebar/sidebar";
import DashboardContent from "@/src/components/shared/dashContent/dashContent";

export default function DashboardPage() {
    return (
        <div className="flex items-center">
        <Sidebar/>
        <DashboardContent/>
        </div>
    );
}
