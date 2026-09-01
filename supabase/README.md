# Supabase setup for CivicChai

Run the SQL files in this folder in this order:

1. `schema.sql`
2. `policies.sql`
3. `seed.sql`

This creates the profile, issue, comment, support, and audit tables needed for the CivicChai workflow.

For migration-based workflows, use a project migration folder instead of the root schema file when you are ready to version control your database schema.

Environment variables needed in Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
