# CivicChai

A civic engagement platform for communities to report, discuss, and resolve local issues.

## Stack
- Next.js
- Vercel
- GitHub Actions
- Supabase

## Local setup

1. Copy `.env.example` to `.env.local`
2. Fill in your Supabase credentials
3. Run:

```bash
npm install
npm run dev
```

## Production deployment

- Deploy the app on Vercel
- Connect the repository to GitHub
- Configure environment variables in Vercel
- Supabase handles the database and backend APIs

## CI/CD

GitHub Actions runs on push and pull requests to validate build and type safety.
