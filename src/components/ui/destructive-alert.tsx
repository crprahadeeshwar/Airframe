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
import { deleteFlightById } from "@/src/features/actions/deleteFlights"

interface AlertDialogDestructiveProp {
  flightId: UUID;
};

export function AlertDialogDestructive( { flightId } : AlertDialogDestructiveProp) {

  const handleDelete = async () => {
    deleteFlightById(flightId);
  }
  return (
    <AlertDialog>
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
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive"
          onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) 
}
