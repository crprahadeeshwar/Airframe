"use client"

import { cn } from "cn"

import { Button } from "./auth-ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldError
} from "./auth-ui/field"
import { Input } from "./auth-ui/input"
import { GalleryVerticalEndIcon } from "lucide-react"
import { signup } from "@/src/features/actions/auth/signup"
import { AuthFormState } from "@/src/schemas/flightSchemas"
import { useActionState, useState } from "react"

const initialState: AuthFormState = {
  field: { email: "" },
  status: "idle",
  errorMessage: "",
  errorType: "none",
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [state, formAction] = useActionState(signup, initialState)
    const emailInvalid = state.errorMessage === "invalid.email"
    const passwordInvalid = state.errorMessage === "invalid.password"
    const signupError = state.errorType === "operation"

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction} key={state?.field?.email || "initial-email"} >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEndIcon className="size-6" />
              </div>
              <span className="sr-only">Airframe.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Airframe</h1>
            <FieldDescription>
              Already have an account? <a href="/login">Sign in</a>
            </FieldDescription>
          </div>
          <Field 
            data-invalid={(emailInvalid || undefined) && emailInvalid}
          >
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              required
              defaultValue={state?.field?.email ?? ""}
              aria-invalid={emailInvalid}
            />
            {state.status !== 'idle' && emailInvalid && (<FieldError>Enter a valid email address.</FieldError>)}
          </Field>

          <Field data-invalid={(passwordInvalid || undefined) && passwordInvalid}>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              name="password"
              required
              aria-invalid={passwordInvalid}
            />
            {state.status !== 'idle' &&  passwordInvalid && (<FieldError>Enter a valid password.</FieldError>)}
          </Field>

          {signupError&& (
            <FieldError>{state.errorMessage}</FieldError>
          )}
          
          <Field>

            <Button type="submit">Create Account</Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>
          <Field className="grid gap-4 sm:grid-cols-1">
            <Button variant="outline" type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="/legal/terms_of_service">Terms of Service</a>{" "}
        and <a href="/legal/privacy_policy">Privacy Policy</a>.
      </FieldDescription>
    </div>
  )
}
