"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plane } from "lucide-react"

const icons = {
  dashboard: LayoutDashboard,
  flights: Plane,
}

interface SidebarMenuProps {
  items: {
    title: string
    link: string
    icon: keyof typeof icons
  }[]
}

export default function SidebarMenu({ items }: SidebarMenuProps) {
  const pathname = usePathname()

  return (
    <nav>
      <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        General
      </p>

      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = icons[item.icon]
          const isActive = pathname === item.link

          return (
            <li key={item.link}>
              <Link
                href={item.link}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}