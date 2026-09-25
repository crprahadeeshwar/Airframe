import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./alert"

interface ErrorAlertProps {
    title: string;
    message: string;
}
export function ErrorAlert(props : ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircleIcon />
      <AlertTitle>{props.title}</AlertTitle>
      <AlertDescription>
        {props.message}
      </AlertDescription>
    </Alert>
  )
}
