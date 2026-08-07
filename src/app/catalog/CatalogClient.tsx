"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import SearchBar from "@/components/SearchBar";
import BookCard from "@/components/BookCard";
import { StaggerGrid, StaggerItem } from "@/components/StaggerGrid";
import { genres, formats } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import { DbBook } from "@/lib/types";

export default function CatalogClient() {
  const params = useSearchParams();
  const initialGenre = params.get("genre") || "All";

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [genre, setGenre] = useState(initialGenre);
  const [format, setFormat] = useState("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [books, setBooks] = useState<DbBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [retryToken, setRetryToken] = useState(0);

  // Debounce the search box so we're not hitting the database on every keystroke.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Every filter change re-queries the database directly.
  useEffect(() => {
    // Flip the loading flag as the filter-driven query kicks off.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setLoadError(false);

    const controller = new AbortController();
    const supabase = createClient();
    let q = supabase.from("books").select("*").abortSignal(controller.signal);

    const safeQuery = debouncedQuery.replace(/[,%]/g, " ").trim();
    if (safeQuery) {
      q = q.or(`title.ilike.%${safeQuery}%,author.ilike.%${safeQuery}%`);
    }
    if (genre !== "All") q = q.eq("genre", genre);
    if (format !== "All") q = q.eq("format", format);
    if (availableOnly) q = q.eq("availability", "available");

    q.order("title").then(({ data, error }) => {
      // Stale/duplicate mounts (e.g. StrictMode, fast route transitions)
      // get their requests aborted above, so only the live one lands here.
      if (error) {
        if (error.message.startsWith("AbortError")) return;
        console.error(error);
        setLoadError(true);
        setLoading(false);
        return;
      }
      setBooks(data ?? []);
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, genre, format, availableOnly, retryToken]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          The full shelf
        </p>
        <h1 className="font-display text-4xl font-bold mb-6">Browse the Catalog</h1>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        {/* FILTERS SIDEBAR */}
        <aside className="glass-panel rounded-2xl p-5 h-fit md:sticky md:top-24">
          <div className="mb-6">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-3 text-current/60">
              Genre
            </h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setGenre(g)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    genre === g
                      ? "bg-[var(--color-burnt)] text-white border-[var(--color-burnt)]"
                      : "border-current/20 hover:border-current/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-sm uppercase tracking-widest mb-3 text-current/60">
              Format
            </h3>
            <div className="flex flex-wrap gap-2">
              {formats.map((f) => (
                <button
                  key={f}
                  onClick={() => setFormat(f)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    format === f
                      ? "bg-[var(--color-cobalt)] text-white border-[var(--color-cobalt)]"
                      : "border-current/20 hover:border-current/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="accent-[var(--color-forest)] w-4 h-4"
            />
            Available only
          </label>
        </aside>

        {/* RESULTS */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-current/60">
              {loading ? "Searching…" : `${books.length} books found`}
            </p>
            <div className="glass-panel rounded-full flex p-1">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${
                    view === v ? "bg-[var(--color-forest)] text-white" : ""
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {!loading && loadError ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-current/50 mb-4">
                Couldn&apos;t load the catalog. Check your connection and try again.
              </p>
              <button
                onClick={() => setRetryToken((t) => t + 1)}
                className="text-xs px-4 py-2 rounded-full border border-current/20 hover:border-current/40 font-semibold"
              >
                Retry
              </button>
            </motion.div>
          ) : !loading && books.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-current/50"
            >
              No books match those filters yet. Try widening your search.
            </motion.p>
          ) : (
            <StaggerGrid
              className={
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 gap-5"
                  : "flex flex-col gap-4"
              }
            >
              {books.map((b) =>
                view === "grid" ? (
                  <StaggerItem key={b.id}>
                    <BookCard book={b} />
                  </StaggerItem>
                ) : (
                  <StaggerItem key={b.id}>
                    <a
                      href={`/books/${b.id}`}
                      className="glass-panel flex items-center gap-4 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <div
                        className="w-10 h-14 rounded shrink-0"
                        style={{ backgroundColor: b.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold truncate">{b.title}</p>
                        <p className="text-sm text-current/60">{b.author} · {b.genre}</p>
                      </div>
                      <span className="text-xs text-current/50">★ {b.rating}</span>
                    </a>
                  </StaggerItem>
                )
              )}
            </StaggerGrid>
          )}
        </div>
      </div>
    </div>
  );
}
