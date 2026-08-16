-- MindfulReading library schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS guards.
--
-- Auth note: this project does NOT use Supabase Auth. Accounts are a
-- simple app-managed "local_accounts" table (plain-text passwords, no
-- email confirmation) -- appropriate for a zero-budget class demo, not
-- for anything handling real user data. See local-auth-migration.sql
-- for the delta if you're upgrading an existing database that still has
-- the old Supabase-Auth-based schema.

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
-- LOCAL ACCOUNTS (app-managed, no Supabase Auth)
-- ============================================================
create table if not exists public.local_accounts (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  full_name text not null,
  created_at timestamptz not null default now()
);

alter table public.local_accounts enable row level security;

drop policy if exists "Anyone can read accounts for login" on public.local_accounts;
create policy "Anyone can read accounts for login"
  on public.local_accounts for select
  using (true);

drop policy if exists "Anyone can create an account" on public.local_accounts;
create policy "Anyone can create an account"
  on public.local_accounts for insert
  with check (true);


-- ============================================================
-- CART ITEMS
-- ============================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.local_accounts (id) on delete cascade,
  book_id text not null references public.books (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, book_id)
);

alter table public.cart_items enable row level security;

drop policy if exists "Users manage own cart" on public.cart_items;
create policy "Users manage own cart"
  on public.cart_items for all
  using (true)
  with check (true);


-- ============================================================
-- RESERVATIONS
-- ============================================================
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.local_accounts (id) on delete cascade,
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
  using (true)
  with check (true);
