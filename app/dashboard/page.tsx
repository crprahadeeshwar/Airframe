import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar/sidebar";
import DashboardContent from "@/components/dashContent/dashContent";

export default function DashboardPage() {
    return (
        <div className="flex items-center">
        <Sidebar/>
        <DashboardContent/>
        </div>
    );
}
