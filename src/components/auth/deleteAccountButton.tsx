"use client";

import { useActionState, useState } from "react";
import { Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

import { Button } from "../ui/button";
import { deleteAccount } from "@/src/features/actions/auth/deleteAccount";

type DeleteAccountState = {
  status: "idle" | "error";
  message: string;
};

const initialState: DeleteAccountState = {
  status: "idle",
  message: "",
};

export function DeleteAccountButton() {
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const [state, formAction, isPending] = useActionState(
    deleteAccount,
    initialState
  );

  const canDelete = confirmation === "DELETE";

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isPending) {
          setOpen(nextOpen);

          if (!nextOpen) {
            setConfirmation("");
          }
        }
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
          />
        }
      >
        <Trash2 className="h-4 w-4" />
        <span>Delete account</span>
      </AlertDialogTrigger>

      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2 />
          </AlertDialogMedia>

          <AlertDialogTitle>Delete your account?</AlertDialogTitle>

          <AlertDialogDescription>
            This permanently deletes your account and your flight data.
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form action={formAction}>
          <div className="space-y-2 py-4">
            <label
              htmlFor="delete-confirmation"
              className="text-sm font-medium"
            >
              Type <span className="font-semibold">DELETE</span> to confirm.
            </label>

            <input
              id="delete-confirmation"
              name="confirmation"
              value={confirmation}
              onChange={(event) => setConfirmation(event.target.value)}
              autoComplete="off"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              disabled={isPending}
            />

            {state.status === "error" && (
              <p className="text-sm text-destructive">
                {state.message}
              </p>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              type="button"
              variant="outline"
              disabled={isPending}
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              type="submit"
              variant="destructive"
              disabled={!canDelete || isPending}
            >
              {isPending ? "Deleting..." : "Delete account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}