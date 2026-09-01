# Supabase setup for CivicChai

Use the single file in this folder:

- `schema.sql`

This file includes the table definitions, indexes, triggers, row-level security policies, and seed data required for the CivicChai workflow.

Environment variables needed in Vercel or local development:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-side only)

Use the migration folder as an optional versioned alternative if you want schema tracking in a SQL migration workflow.
