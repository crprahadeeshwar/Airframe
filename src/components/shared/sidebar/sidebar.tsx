import SidebarHeader from "./sidebarHeader"
import SidebarFooter from "./sidebarFooter"
import SidebarMenu from "./sidebarMenu"

type MenuItem = {
  title: string
  link: string
  icon: "dashboard" | "flights"
}

const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Flights",
    link: "/flights",
    icon: "flights",
  },
]

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-muted/30">
      <SidebarHeader title="Airframe" />

      <div className="flex-1 px-3 py-4">
        <SidebarMenu items={menuItems} />
      </div>

      <SidebarFooter />
    </aside>
  )
}