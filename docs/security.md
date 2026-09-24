# Auth and Security

## Overview
Airframe is a multi-user application with database-enforced ownership security. Authenticated users receive only the database privileges required by the application, while PostgreSQL Row Level Security enforces that users can only access and modify flight records belonging to their authenticated identity. Client-controlled ownership information is not trusted, privileged keys remain server-side, and authorization is enforced at both the application and database layers.

## Goal

A user may only access or modify their own flight record.

This goal is achieved and enforced by the following security layers:

- Trust Boundaries
Airframe treats the browser as an untrusted environment.
Thus, security-sensitive values such as user_id are derived and verified server-side from the authenticated Supabase user rather than accepted from the browser.

- API Key Handling
Airframe uses Supabase's publishable key for application clients. 

- Authentication and Authorisation
Airframe uses both application-level checks and PostgreSQL RLS to enforce authorisation.

- Database Privileges 
Airframe explicitly controls table-level privileges.
Only an authenticated request can perform an operation on the table. Anon/unauthenticated requests recieve no privileges on the table.

- Row Level Security
Airframe utilises Supabase's out-of-the-box RLS policies, such that a user may only be able to access the rows with their user_id before an operation is even performed.

- Database Policies
Airframe's database uses four explicit policies for the four main user operations, ie SELECT, INSERT, UPDATE, DELETE wherein PostgreSQL verifies Supabase's auth uid and the user_id provided server-side. An operation is only performed when both match.

- Ownership Model
Airframe has strict user_id ownsership boundaries in place. Since the browser cannot be trusted, the authenticated user's ID is obtained strictly server-side. This means that a client may not simply submit another user's UUID for an operation.

- IDOR Protection 
Airframe is designed to prevent Insecure Direct Object Reference (IDOR) vulnerabilities through the aforementioned layers.

- Server-Client Separation
All security-sensitive operations are performed on the server.

- Least Privilege
Airframe follows the principle of least privilege. This references the Database Privileges mentioned above, where anon has no access to the table, and authorised users may only perform the four CRUD operations. Moreover, the application does not use a privileged secret key for normal user CRUD operations.

