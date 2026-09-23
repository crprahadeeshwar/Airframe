import { Button } from "@/src/components/ui/button";
import { logout } from "@/src/features/actions/auth/logout";

export function LogoutButton() {
  return (
    <form action={logout}>
      <Button type="submit" variant="outline">
        Log out
      </Button>
    </form>
  );
}