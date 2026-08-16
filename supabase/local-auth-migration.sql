-- Migration: replace Supabase Auth with a simple local (no-email) login.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.
--
-- WHAT THIS DOES:
--  1. Adds a "local_accounts" table that the app manages entirely itself
--     (no Supabase Auth, no confirmation emails, no sessions). Passwords
--     are stored in PLAIN TEXT here, on purpose -- there is no backend
--     server to hash them safely, everything runs from the browser with
--     the public anon key. This is fine for a friends/family class demo,
--     it is NOT fine for anything handling real user data.
--  2. Points cart_items/reservations at local_accounts instead of
--     auth.users, and opens up their row-level security so the app (using
--     only the public anon key) can read/write them without a real signed
--     session. Access control now lives entirely in the app code, not the
--     database -- anyone who guesses/knows a user's id could read or
--     modify their cart/reservations. Same tradeoff as above.

-- ============================================================
-- LOCAL ACCOUNTS
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
-- CART ITEMS -- repoint at local_accounts, open up RLS
-- ============================================================
alter table public.cart_items
  drop constraint if exists cart_items_user_id_fkey;

alter table public.cart_items
  add constraint cart_items_user_id_fkey
  foreign key (user_id) references public.local_accounts (id) on delete cascade;

drop policy if exists "Users manage own cart" on public.cart_items;
create policy "Users manage own cart"
  on public.cart_items for all
  using (true)
  with check (true);


-- ============================================================
-- RESERVATIONS -- repoint at local_accounts, open up RLS
-- ============================================================
alter table public.reservations
  drop constraint if exists reservations_user_id_fkey;

alter table public.reservations
  add constraint reservations_user_id_fkey
  foreign key (user_id) references public.local_accounts (id) on delete cascade;

drop policy if exists "Users manage own reservations" on public.reservations;
create policy "Users manage own reservations"
  on public.reservations for all
  using (true)
  with check (true);

-- Note: the old "profiles" table (tied to auth.users) is left alone,
-- just unused now. Safe to ignore or drop later.
