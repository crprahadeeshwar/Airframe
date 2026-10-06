"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Plane } from "lucide-react"
import Image from "next/image";

export default function MobileHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 items-center justify-between border-b px-4 md:hidden">
      <Link
        href="/flights"
        className="flex items-center gap-2 font-semibold"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-lg">
          <Image
            src="/airframe.svg"
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </div>

        <span>Airframe</span>
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/dashboard"
          aria-label="Dashboard"
          className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
            pathname === "/dashboard"
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
        </Link>

        <Link
          href="/flights"
          aria-label="Flights"
          className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
            pathname.startsWith("/flights")
              ? "bg-muted text-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Plane className="h-4 w-4" />
        </Link>
      </nav>
    </header>
  );
}