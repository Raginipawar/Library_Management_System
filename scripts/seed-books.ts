// One-time / re-runnable seed script: loads the 30 books from
// src/data/books.ts into the Supabase `books` table.
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env.local (service_role key
// bypasses RLS so it can write to a table regular users can't insert
// into). Add that key to .env.local yourself; it must never be
// committed or shared in chat.
//
// Run with: npm run db:seed

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });
import { books } from "../src/data/books";
import { getCoverImage } from "../src/data/covers";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  const rows = books.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre,
    format: b.format,
    color: b.color,
    rating: b.rating,
    year: b.year,
    availability: b.availability,
    description: b.description,
    tags: b.tags,
    is_new: b.isNew ?? false,
    cover_path: getCoverImage(b.id),
  }));

  const { error, count } = await supabase
    .from("books")
    .upsert(rows, { onConflict: "id", count: "exact" });

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${count ?? rows.length} books into Supabase.`);
}

main();
