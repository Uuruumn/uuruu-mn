# Vz.mn repaired build

## Required Supabase setup
1. `.env.local` with Supabase URL and anon key.
2. Storage bucket `listing-images` must exist and be public.
3. Apply `supabase/extra_patch.sql` if your `listings` table does not already have image/payment columns.

## Run
npm install
npm run dev
