import { LogOut } from "lucide-react"

import { Button } from "@/src/components/ui/button"
import { logout } from "@/src/features/actions/auth/logout"

export function LogoutButton() {
  return (
    <form action={logout} className="w-full">
      <Button
        type="submit"
        variant="ghost"
        className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4 shrink-0" />
        <span>Log out</span>
      </Button>
    </form>
  )
}