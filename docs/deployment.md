# Deployment

## Overview

Airframe is deployed as a Next.js application on Vercel, with Supabase providing authentication and PostgreSQL database services.

GitHub Actions is used for CI verification. Pull requests must pass the project's automated checks before being merged into `main`. Once changes are merged, Vercel automatically deploys the application.

Airframe is currently maintained as a pre-production deployment.

## Environment Variables

The Vercel deployment requires the following public Supabase configuration:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

These variables are required by the application to connect to the hosted Supabase project.

The GitHub Actions environment additionally uses:

```text
SUPABASE_SECRET_SERVICE_ROLE_KEY
```

This credential is used only for CI/E2E operations that require administrative database access.

Secret credentials are stored using GitHub Actions secrets and must never be committed to the repository or exposed to client-side application code.

The Vercel deployment does not contain the Supabase service-role/secret key.

## CI/CD Pipeline

Every pull request is verified through GitHub Actions.

The CI pipeline:

1. Installs project dependencies.
2. Starts the local Supabase environment.
3. Resets the local database and applies all migrations.
4. Runs unit and integration tests with Vitest.
5. Installs Playwright browser dependencies.
6. Runs end-to-end tests against the hosted application environment.
7. Runs ESLint.
8. Runs TypeScript type checking.
9. Builds the Next.js application for production.

All checks must pass before a pull request is merged.

## Deployment Process

The normal deployment workflow is:


1. Create a feature branch
2. Implement and test changes
3. Push the branch to GitHub
4. Open a pull request
5. Wait for GitHub Actions verification
6. Resolve any failed checks
7. Merge the pull request into main
8. Vercel automatically deploys the updated application
9. Perform a basic test against the deployed application


Database schema changes are managed through Supabase migrations and should be committed to the repository alongside the application changes.

The hosted Supabase database must be kept synchronized with the committed migration history when schema changes are deployed.

## Deployment Status

Airframe currently operates as a **pre-production deployment**.

The deployment pipeline, hosted Supabase connection, automated CI verification, and Vercel deployment have been validated successfully.

The application is not currently treated as a production SaaS service.