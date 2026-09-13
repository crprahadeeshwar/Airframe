# Airframe Architecture


## Overview

The Browser handles the UI and lets the user interact with Airframe. The Next.js handles server-side operations and acts as a secure bridge between the frontend and the database. The Supabase backend is responsible for secondary auth checks and database operations, and houses the user records.


## Components

- Browser/ React

The browser is the user-facing interface of Airframe. React renders the frontend interface and is responsible for collecting input from users and display returned values.
The browser should be treated as untrausted and should not contain secrets or be relied upon to enforce authorisation.

- Server/ Next.js

The server acts as the application layer between the UI and the backend database. It recieves inputs/actions from the client, accesses authenticated session details, validates said inputs/actions, and performs the application logic behind the scenes. The server acts as the middleman between the frontend and the backend to ensure boundary separation. The server also handles the return of values to the frontend from the database.

- Auth and Database/ Supabase

Supabase is the auth and database layer of Airframe. Supabase Auth validates user credentials to ensure Row-Level Security (RLS) and avoid data breaches. 
PostgreSQL is the database that contains all relevant user and flight records. 
Supabase's RLS ensures that the user can only modify data which belongs to them.

- PostgreSQL

The postgreSQL database, as mentioned above, stores user and flight records. On top of that, it allows for the retrieval, modification, and deletion of records- as per the user's needs. The database enforces schema constrains, maintains relationships between tables, enforces RLS, and runs queries as per the user's desired action(s).


## Data Flow

- User fills out form 
- Browser Collects Information
- Information goes to the server
- Server validates it
- Server identifies the user
- Server queries the database
- Database verifies the user details and rules
- Database creates/modifies/deletes appropriate record(s)
- Database returns the results
- Server collects and returns the results to the frontend
- Browser updates the UI


## Environment Variables

Airframe keeps environment-specific configuration outside the
source code.

Local development values will be stored in `.env.local`, which
must not be committed to Git.

Public configuration may use the `NEXT_PUBLIC_` prefix when it is
intended to be available to browser-side code.

Secrets and privileged credentials must remain server-side and
must never be exposed to the browser.

Production environment variables will be configured through the
deployment platform rather than committed to the repository.