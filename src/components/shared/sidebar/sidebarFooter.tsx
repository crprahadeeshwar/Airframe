import { LogoutButton } from "../../auth/logoutButton"
import { DeleteAccountButton } from "../../auth/deleteAccountButton";

export default function SidebarFooter() {
  return (
    <div className="border-t p-3 pb-4">
      <LogoutButton />

      <div className="mt-2 border-t pt-2">
        <DeleteAccountButton />
      </div>
    </div>
  );
}