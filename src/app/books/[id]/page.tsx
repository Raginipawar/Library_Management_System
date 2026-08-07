import Link from "next/link";
import { notFound } from "next/navigation";
import BookCard from "@/components/BookCard";
import ReserveButton from "@/components/ReserveButton";
import AddToCartButton from "@/components/AddToCartButton";
import SectionReveal from "@/components/SectionReveal";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { createClient } from "@/lib/supabase/server";
import { DbBook } from "@/lib/types";

const availabilityCopy: Record<string, { label: string; color: string }> = {
  available: { label: "Available now", color: "var(--color-forest)" },
  waitlist: { label: "On waitlist", color: "var(--color-mustard)" },
  reserved: { label: "Currently reserved", color: "var(--color-maroon)" },
};

async function getRelatedBooks(supabase: Awaited<ReturnType<typeof createClient>>, book: DbBook) {
  const { data: sameGenre } = await supabase
    .from("books")
    .select("*")
    .eq("genre", book.genre)
    .neq("id", book.id)
    .limit(4);

  const related: DbBook[] = sameGenre ?? [];
  if (related.length >= 4) return related;

  const { data: others } = await supabase
    .from("books")
    .select("*")
    .neq("genre", book.genre)
    .neq("id", book.id)
    .limit(4 - related.length);

  return [...related, ...(others ?? [])];
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: book } = await supabase.from("books").select("*").eq("id", id).single();
  if (!book) notFound();

  const related = await getRelatedBooks(supabase, book);
  const avail = availabilityCopy[book.availability];
  const cover = book.cover_path;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-[280px_1fr] gap-12">
        {/* COVER */}
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-2xl h-[380px] shadow-2xl flex items-end p-6 sticky top-24"
            style={{ backgroundColor: book.color }}
          >
            {cover && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={`${book.title} cover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, ${book.color} 25%, transparent 70%)`,
                  }}
                />
              </>
            )}
            <div className="relative">
              <p className="text-white/70 text-xs uppercase tracking-widest">
                {book.genre}
              </p>
              <h2 className="font-display text-2xl text-white leading-tight mt-1 drop-shadow">
                {book.title}
              </h2>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-sm text-current/60 mb-1">{book.format} · {book.year}</p>
          <h1 className="font-display text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-lg text-current/70 mb-4">by {book.author}</p>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-sm font-semibold">★ {book.rating} rating</span>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white"
              style={{ backgroundColor: avail.color }}
            >
              {avail.label}
            </span>
            {book.tags.map((t: string) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-current/20 text-current/60"
              >
                #{t}
              </span>
            ))}
          </div>

          <p className="text-current/80 leading-relaxed mb-8 max-w-xl">
            {book.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/books/${book.id}/reserve`}>
              <ReserveButton>
                {book.availability === "available" ? "Reserve this copy" : "Join the waitlist"}
              </ReserveButton>
            </Link>
            <AddToCartButton bookId={book.id} labeled />
          </div>
        </div>
      </div>

      {/* RELATED */}
      <SectionReveal className="mt-24">
        <h2 className="font-display text-2xl font-bold mb-6">You might also like</h2>
        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {related.map((b) => (
            <StaggerItem key={b.id}>
              <BookCard book={b} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      </SectionReveal>
    </div>
  );
}
