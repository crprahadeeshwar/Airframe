'use client';

import { Trash2Icon } from "lucide-react"

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
} from "./alert-dialog"
import { Button } from "./button"
import type { UUID } from "@/src/schemas/flightSchemas"
import { deleteFlightById, type DeleteState } from "@/src/features/actions/deleteFlights"
import { useState, useActionState, useEffect } from "react";
import { boolean } from "zod";

interface AlertDialogDestructiveProp {
  flightId: UUID;
  onDeleteSuccess: () => void;
};

export function AlertDialogDestructive( { flightId, onDeleteSuccess } : AlertDialogDestructiveProp) {

  const deleteFlight = deleteFlightById.bind(null, flightId);

  const initialState: DeleteState = {
    status: 'idle',
    message: ''
  }

  const [open, setOpen] = useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(deleteFlight, initialState);
  useEffect(() => {
    if (state.status === 'success') {
      setOpen(false)
      onDeleteSuccess()
    }
  }, [state.status, onDeleteSuccess]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete record?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this record. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form action={formAction}>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>

          <AlertDialogAction type="submit" variant="destructive" disabled={isPending}>
            {isPending ? 'Deleting...' : 'Delete' }
          </AlertDialogAction>

        </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  ) 
}
