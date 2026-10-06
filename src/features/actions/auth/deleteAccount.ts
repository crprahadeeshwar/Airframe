"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/src/lib/supabase/server";
import { createAdminClient } from "@/src/lib/supabase/admin";
import { logger } from "@/src/lib/logger";

type DeleteAccountState = {
  status: "idle" | "error";
  message: string;
};

export async function deleteAccount(
  _previousState: DeleteAccountState,
  formData: FormData
): Promise<DeleteAccountState> {
  const confirmation = formData.get("confirmation");

  if (confirmation !== "DELETE") {
    return {
      status: "error",
      message: "Type DELETE to confirm account deletion.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const admin = createAdminClient();

  const { error: deleteError } =
    await admin.auth.admin.deleteUser(user.id);

  if (deleteError) {
    logger.error(
      "auth.account_delete.failed",
      "Account deletion failed",
      { errorType: "operation" },
      deleteError
    );

    return {
      status: "error",
      message: "Could not delete your account.",
    };
  }

  logger.info(
    "auth.account_delete.success",
    "User account deleted successfully"
  );

  redirect("/");
}