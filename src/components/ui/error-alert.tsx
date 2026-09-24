import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

interface ErrorAlertProps {
    message: string;
}
export function ErrorAlert(props : ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>Could Not Add Flight</AlertTitle>
      <AlertDescription>
        {props.message}
      </AlertDescription>
    </Alert>
  )
}
