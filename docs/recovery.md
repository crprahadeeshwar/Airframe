# Backup and Recovery

## Overview

Airframe uses automated daily PostgreSQL backups to provide a recovery path in case of database loss or corruption.

Backups are created by GitHub Actions using the Supabase CLI and stored in a private Cloudflare R2 bucket.

Backups are stored as:

```text
airframe-backups/
├── latest.sql
└── daily/
    └── YYYY-MM-DD.sql
```

The backup workflow runs daily and can also be triggered manually.

## Recovery Objectives

- **RPO:** ≤ 24 hours
- **RTO:** ≤ 1 hour

The RPO is based on the daily backup schedule. The RTO target assumes the backup is accessible and a replacement Supabase database is available.

## Backup Process

The automated workflow performs the following steps:

1. Connects to the hosted Airframe PostgreSQL database.
2. Creates a logical database dump using the Supabase CLI.
3. Uploads the dump to the dated `daily/YYYY-MM-DD.sql` object in Cloudflare R2.
4. Updates `latest.sql`.
5. Verifies that both R2 objects exist.

Database backup files are not committed to the Git repository.

## Recovery Procedure

To recover the database:

1. Retrieve the required backup from the private Cloudflare R2 bucket.
2. Create or provision a replacement Supabase PostgreSQL database.
3. Obtain its PostgreSQL connection string.
4. Restore the backup using `psql`:

```bash
psql "RESTORE_DATABASE_URL" \
  --single-transaction \
  --set ON_ERROR_STOP=1 \
  --file airframe-restore-test.sql
```

5. Verify that the `public.flights` table exists.
6. Verify the table schema, constraints, indexes, and RLS policies.
7. Configure the application to use the restored database.
8. Create a fresh authentication user in the replacement Supabase project.
9. Verify core Airframe functionality.

## Recovery Drill

A recovery drill was performed using the automated backup stored in Cloudflare R2.

The process successfully:

- Downloaded `latest.sql` from R2.
- Restored the backup into a disposable Supabase project.
- Recreated the `public.flights` table.
- Recreated the associated database structure.
- Recreated the application's Row Level Security policies.
- Completed the restore without database errors.

This verified that the automated backup artifact can be used to reconstruct Airframe's application database schema and security configuration.

## Recovery Limitations

The logical database dump does not include Supabase-managed authentication data.

As a result, existing Supabase Auth users are not restored by this procedure. A replacement Supabase project requires authentication users to be recreated separately.

The recovery drill therefore verifies recovery of Airframe's application database rather than a complete clone of the original Supabase project.

## Backup Storage

Backups are stored privately in Cloudflare R2 using a bucket-scoped API token.

The R2 credentials are stored as GitHub Actions secrets and are not committed to the repository.

## Recovery Status

**Recovery workflow verified.**

The automated backup path and restore procedure have been successfully tested against a disposable Supabase environment.