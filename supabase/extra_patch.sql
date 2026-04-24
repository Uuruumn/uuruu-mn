alter table public.listings add column if not exists image_url text;
alter table public.listings add column if not exists payment_status text not null default 'unpaid';
alter table public.listings add column if not exists payment_amount integer;
alter table public.listings add column if not exists paid_at timestamptz;
alter table public.listings add column if not exists payment_submitted_at timestamptz;
alter table public.listings add column if not exists payment_reference text;
alter table public.listings add column if not exists payment_sender_name text;
