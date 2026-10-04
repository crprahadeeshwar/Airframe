# Testing

## Overview

Airframe uses multiple layers of automated verification to ensure correctness, security, and code quality. The project uses **Vitest** for unit and integration testing, **Playwright** for end-to-end testing, **ESLint** for static code analysis, and **TypeScript** for type checking.

The test suite covers form schema validation, server-side actions, authentication flows, database interactions, security boundaries, error logging, and representative user workflows against a local Supabase database.

All of these checks are also executed as part of the project's CI pipeline.

### Unit Tests

- Vitest is used to run unit tests, located under `./src/__tests__/unit/`.
- Form validation schemas for the add-flight and update-flight operations are tested against valid and invalid inputs.
- Authentication operations, including signup, signin, and signout, are tested.
- The application logger is tested to ensure errors and contextual information are serialized correctly.

### Integration Tests

- Vitest is used to run integration tests, located under `./src/__tests__/integration/`.
- Integration tests execute the server-side flight CRUD operations against a local Supabase database.
- Tests create isolated users and flight records before exercising the relevant server-side actions.
- Database authorization and security boundaries are verified through multiple authenticated users.
- Row Level Security (RLS) policies are tested to ensure users cannot access or modify another user's data.
- Database-backed authentication operations are also tested against the local Supabase environment.
- Test users and test data are cleaned up after execution.

### End-to-End Tests

- Playwright is used for end-to-end testing against the deployed application environment.
- The happy-path test verifies a complete user journey including account creation, signin, navigation, flight creation, flight editing, flight deletion, and signout.
- The search and filter test verifies that users can correctly search and filter their flight records.
- The authentication flow test verifies account creation, signin, and signout through the application's user interface.
- The health endpoint is also tested to verify that the application's database health check responds correctly.
- Test users and test data are recycled after execution to maintain a sterile test environment.

### Lint Checks

ESLint is used for static analysis of the codebase. It checks the project for common programming errors, problematic code patterns, and violations of the project's configured coding rules.

Linting is run with:

```bash
npm run lint
```

A successful lint run indicates that the codebase contains no ESLint errors.

Some ESLint warnings are supressed with suppressive comments, as the warnings failed to derive the context of the code. This feature was not abused- suppression was performed only when deemed necessary.  

### Type Checking

TypeScript is used to verify that the application's code is type-safe without producing a build.

Type checking is run with:

```bash
npm run typecheck
```

This executes:

```bash
tsc --noEmit
```

The `--noEmit` flag ensures that TypeScript only performs type checking and does not generate compiled output.

### Build Verification

The production build is also executed as part of the CI pipeline:

```bash
npm run build
```

This verifies that the application can successfully be compiled for production and helps detect issues that may not be caught by unit, integration, or end-to-end tests alone.

## CI Verification

Every pull request is checked by the GitHub Actions CI pipeline before being merged.

The pipeline performs the following checks:

1. Install project dependencies.
2. Start a local Supabase instance.
3. Reset the local database and apply all migrations.
4. Run unit and integration tests.
5. Install the Playwright browser dependencies.
6. Run end-to-end tests against the hosted environment.
7. Run ESLint.
8. Run TypeScript type checking.
9. Run the production build.

A pull request must pass these checks before it is considered ready to merge.

## Results

All automated checks currently pass successfully.

- **Vitest:** 27/27 tests passing
- **Playwright:** 7/7 tests passing
- **ESLint:** passing
- **TypeScript:** passing
- **Production build:** passing

The complete testing and verification pipeline therefore provides coverage across isolated application logic, database-backed operations, authorization boundaries, real user workflows, static code quality, type safety, and production compilation.