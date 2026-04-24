-- Vz.mn schema
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  property_type text not null,
  location text not null,
  price bigint not null,
  area numeric(10,2) not null,
  rooms int not null,
  floor int,
  built_year int,
  description text not null,
  phone text not null,
  status text not null default 'pending' check (status in ('pending','approved','expired','rejected')),
  approved_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.listing_images (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references public.listings(id) on delete cascade,
  image_url text not null,
  sort_order int not null default 0
);

alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.listing_images enable row level security;

create policy "Users can view approved listings"
on public.listings for select
using (status = 'approved' or auth.uid() = user_id);

create policy "Users can insert own listings"
on public.listings for insert
with check (auth.uid() = user_id);

create policy "Users can update own pending listings"
on public.listings for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can see own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
