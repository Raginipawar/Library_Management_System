-- Adds the contact/address details captured during checkout.
-- Run once in Supabase Dashboard -> SQL Editor -> New query -> Run.
alter table public.reservations
  add column if not exists delivery_details text;
