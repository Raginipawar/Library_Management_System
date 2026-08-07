# Pageturn — Animated Library Booking Website

> "Some pages don't just turn, they turn you."

A full-featured, animated library booking website: browse a real database-backed
catalog, sign in, reserve books and seats, manage a personal shelf, and RSVP to
library events, styled like a bold editorial/poster illustration site rather than
a generic SaaS dashboard. Built with Next.js (App Router), TypeScript, Tailwind
CSS v4, Framer Motion, and Supabase (Postgres + Auth).

---

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack dev server)
- **Supabase** — Postgres database + authentication, free tier. Deploys as one
  Next.js app (no separate backend service needed); Server Components and
  Server Actions talk to Supabase directly.
- **Tailwind CSS v4** for layout + a small custom CSS layer (`globals.css`)
  for the illustration-specific effects (glassmorphism, light beams, sway/walk
  keyframes) that utility classes alone can't express
- **Framer Motion** for every animation: hover/tap physics, scroll reveals,
  staggered grids, page transitions, and the confetti burst

---

## Database & Auth

Everything lives in one Supabase Postgres project. Schema, security policies,
and seed data are all checked into this repo so the whole backend can be
recreated from scratch on a fresh Supabase project.

| File | Purpose |
|---|---|
| `supabase/schema.sql` | Creates `books`, `profiles`, `cart_items`, `reservations`, enables Row Level Security on all four, and adds a trigger that auto-creates a `profiles` row on signup. Paste into the Supabase SQL Editor and run once. Safe to re-run. |
| `scripts/seed-books.ts` | Loads the 30-book catalog (`src/data/books.ts` + cover paths from `src/data/covers.ts`) into the `books` table via the Supabase admin (`service_role`) client. Run with `npm run db:seed`. |
| `src/lib/supabase/client.ts` | Browser Supabase client, used in Client Components. |
| `src/lib/supabase/server.ts` | Server Supabase client (reads/writes the session cookie), used in Server Components/Actions. |
| `src/lib/supabase/middleware.ts` + `src/middleware.ts` | Refreshes the auth session cookie on every request. |
| `src/lib/cart-context.tsx` | `useCart()` hook — same API as before, but now backed by the `cart_items` table instead of `localStorage`, keyed to the signed-in user. |

**Tables:**
- `books` — the catalog. Publicly readable by anyone (RLS `select` policy);
  writes only happen via the seed script's `service_role` key, never from the app.
- `profiles` — one row per signed-up user (name/email), auto-created by a
  database trigger on signup.
- `cart_items` — `(user_id, book_id)` pairs; a user can only see/modify their own.
- `reservations` — `(user_id, book_id, status, pickup_slot)`; same per-user isolation.

**Auth:** real Supabase email/password accounts (`/signup`, `/login`,
`/reset-password`, `/update-password`). Cart and reservations are tied to the
signed-in user, so `/cart` and `/dashboard` require being signed in.

---

## Design system

- **Palette** (`src/app/globals.css`): burnt orange, maroon, forest/olive
  green, lavender, mustard, hot pink, cobalt blue, cream, defined as CSS
  variables and re-exposed through Tailwind's `@theme inline`.
- **Typography**: a Times New Roman-style serif (`--font-serif`) for both
  display and body text, set globally in `globals.css`.
- **Glassmorphism**: `.glass-panel` / `.glass-dark` utility classes (blur +
  saturation + translucent border) used on the nav bar, search bar, book
  detail chips, dashboard cards, event rows, and auth form panels.
- **Light-beam gradient** (`.light-beam`) reused across the homepage hero,
  auth illustration panel, and section backgrounds to tie the lamp motif
  together site-wide.
- Color-blocked, poster-style sections (forest green / mustard / cream
  panels back-to-back) instead of one flat background.
- Real cover photography: 19 covers sourced from the Open Library Covers API
  plus 11 hand-picked images for invented titles, all in `public/images/covers/`.

### Signature animations
1. **Lamp light on/off toggle** (`LampHero.tsx`) — an animated SVG desk lamp
   that sways continuously and doubles as the site's light/dark mode switch
   (`ThemeProvider` in `src/lib/theme-context.tsx`, persisted to `localStorage`).
2. **Scroll-triggered light sweep** (`SectionReveal.tsx`) — sections animate
   from desaturated/dim to full color as they enter the viewport.
3. **Book spine hover-tilt** (`BookCard.tsx`) — catalog cards rotate and lift
   on hover with a spring transition.
4. **Walking/waving character** (`WalkingCharacter.tsx`) — a hand-built SVG
   book-character with a looping wave and slide-in-on-scroll entrance.
5. **Page-turn transitions** (`PageTransition.tsx`) — route changes animate
   with a 3D `rotateX` + fade instead of a flat cut.

### Micro-interactions
- Bouncy buttons (`ReserveButton.tsx`) — spring hover/tap scale on every CTA.
- Confetti burst (`Confetti.tsx`) on successful reservation.
- Search bar "opens like a book" on focus (`SearchBar.tsx`).
- FAQ accordion (`FaqAccordion.tsx`) on the Contact page.
- Add-to-cart icon toggles state instantly with an optimistic UI update.

---

## Site map / pages

| Route | Notes |
|---|---|
| `/` | Hero (lamp), New Arrivals (live `is_new` query), Categories, How it works, Testimonials |
| `/catalog` | Search + genre/format/availability filters — every filter change queries the database directly |
| `/books/[id]` | Cover, description, tags, availability, related books (same-genre DB query) |
| `/books/[id]/reserve` | 3-step date → time → confirmation flow; writes a real row to `reservations` |
| `/cart` | Requires sign-in; DB-backed cart with "Reserve all" (bulk insert into `reservations`, clears cart) |
| `/dashboard` | "My Shelf" — requires sign-in; real reservations (active/waitlist/returned) + cart preview, all queried per signed-in user |
| `/login`, `/signup`, `/reset-password`, `/update-password` | Real Supabase Auth |
| `/events` | Illustrated event list — **still mock data**, deferred (see Known limitations) |
| `/about` | Library story + values + a note from the (fictional) head librarian |
| `/contact` | Contact form + FAQ accordion |

---

## Project structure

```
supabase/
  schema.sql              # run once in Supabase SQL Editor
scripts/
  seed-books.ts           # npm run db:seed
  create-test-user.ts     # local-only helper for E2E testing
src/
  app/
    page.tsx              # homepage (Server Component, queries Supabase)
    catalog/               CatalogClient.tsx queries Supabase per filter change
    books/[id]/             detail page + reserve flow
    cart/                  DB-backed cart page
    dashboard/             per-user reservations/cart (Server Component)
    login/ signup/ reset-password/ update-password/
    events/ about/ contact/
    layout.tsx             fonts, ThemeProvider, CartProvider, Navbar, Footer
    globals.css
  components/               shared UI + animation building blocks
  data/                     categories.ts, events.ts, testimonials.ts (still mock)
                             books.ts, covers.ts (seed source only, not used at runtime)
  lib/
    supabase/               client.ts, server.ts, middleware.ts
    theme-context.tsx       light/dark theme provider
    cart-context.tsx        DB-backed cart hook
    types.ts                DbBook / DbReservation / DbCartItem
    constants.ts            genre/format filter option lists
  middleware.ts             session-refresh middleware
```

---

## Running it locally

```bash
cd library-booking
npm install
```

**One-time Supabase setup** (skip if already done):
1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run the contents of `supabase/schema.sql`.
3. Copy `.env.example` to `.env.local` and fill in your project URL + anon key
   (Project Settings → API).
4. Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` yourself (the `secret` key
   from the same page) — needed only for the seed script, never committed.
5. Seed the catalog: `npm run db:seed`.

**Run the app:**
```bash
npm run dev
```
Then open http://localhost:3000.

**Other commands:**
```bash
npm run build     # production build
npm run lint      # ESLint (react-hooks / purity rules included)
npx tsc --noEmit  # type-check
npm run db:seed   # re-sync the books table from src/data/books.ts
```

---

## Deploying

- **App:** deploy to Vercel (already linked to this repo's GitHub remote).
  Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as
  environment variables in the Vercel project settings — same values as
  `.env.local`. No separate backend/server needed.
- **Database:** already cloud-hosted on Supabase, so it's reachable from the
  deployed app with no extra setup.
- Never add `SUPABASE_SERVICE_ROLE_KEY` to Vercel — it's a local/admin-only
  key used solely by the seed script.

---

## Known limitations

- **Events page is still mock data** — seat booking for workshops/book clubs
  was deferred to keep this pass focused on books/cart/accounts.
- **No "mark as returned" flow** — reservation history will stay empty until
  a return/checkout-in process is built (e.g. an admin action or a due-date
  cron job).
- **Delivery address / full checkout** is not built — reservations are
  pickup-only (day + time slot), matching the library-not-shop use case.
- Responsive down to mobile widths throughout, but animation-heavy sections
  (lamp hero, walking character) intentionally keep their motion rather than
  being stripped on small screens.
- Admin panel was listed as optional/lower priority and was not built.
