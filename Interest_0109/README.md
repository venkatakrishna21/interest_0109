# Debt Tracker • Finance UI

Next.js app to manage owners, customers, debts and monthly interest.

## Quick Start

1. Install dependencies
   ```bash
   npm install
   ```
2. Create `.env.local` (copy from `.env.example`) and fill Supabase values.
3. Run
   ```bash
   npm run dev
   ```

## Deploy to Vercel

- Push to GitHub
- Import the repo in Vercel
- Add environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Build & deploy (Node 22 is set in `package.json`)

## Tables (Supabase)

You should have tables:
- `customers` (id uuid pk, name text, email text, created_at timestamptz default now())
- `debts` (id uuid pk, customer_id uuid fk, principal numeric, interest_rate numeric, status text, updated_at timestamptz default now())

