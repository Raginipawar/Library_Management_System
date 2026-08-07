-- Pageturn library schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS guards.

-- ============================================================
-- BOOKS
-- ============================================================
create table if not exists public.books (
  id text primary key,
  title text not null,
  author text not null,
  genre text not null,
  format text not null,
  color text not null,
  rating numeric(2,1) not null,
  year int not null,
  availability text not null default 'available'
    check (availability in ('available', 'waitlist', 'reserved')),
  description text not null,
  tags text[] not null default '{}',
  is_new boolean not null default false,
  cover_path text
);

alter table public.books enable row level security;

drop policy if exists "Books are publicly readable" on public.books;
create policy "Books are publicly readable"
  on public.books for select
  using (true);

-- No insert/update/delete policy for regular users on purpose:
-- the catalog is managed via the seed script (service_role key), not the app.


-- ============================================================
-- PROFILES (one row per signed-up user)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ============================================================
-- CART ITEMS
-- ============================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id text not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, book_id)
);

alter table public.cart_items enable row level security;

drop policy if exists "Users manage own cart" on public.cart_items;
create policy "Users manage own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


-- ============================================================
-- RESERVATIONS
-- ============================================================
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  book_id text not null references public.books (id) on delete cascade,
  status text not null default 'active'
    check (status in ('active', 'returned', 'waitlist')),
  pickup_slot text,
  due_date date,
  created_at timestamptz not null default now()
);

alter table public.reservations enable row level security;

drop policy if exists "Users manage own reservations" on public.reservations;
create policy "Users manage own reservations"
  on public.reservations for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
