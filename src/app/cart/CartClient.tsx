"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/client";
import { getSession, onAuthChange } from "@/lib/local-auth";
import { DbBook } from "@/lib/types";
import ReserveButton from "@/components/ReserveButton";

const availabilityStyles: Record<DbBook["availability"], string> = {
  available: "bg-[var(--color-forest)] text-white",
  waitlist: "bg-[var(--color-mustard)] text-[#1c1712]",
  reserved: "bg-[var(--color-maroon)] text-white",
};

const availabilityLabel: Record<DbBook["availability"], string> = {
  available: "In stock",
  waitlist: "Waitlist",
  reserved: "Reserved",
};

export default function CartClient() {
  const { cartIds, removeFromCart, clearCart, loading: cartLoading } = useCart();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [items, setItems] = useState<DbBook[]>([]);

  useEffect(() => {
    const sync = () => setSignedIn(Boolean(getSession()));
    sync();
    return onAuthChange(sync);
  }, []);

  useEffect(() => {
    if (cartIds.length === 0) {
      // Short-circuit clear, no fetch needed when the cart is empty.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems([]);
      return;
    }
    const supabase = createClient();
    supabase
      .from("books")
      .select("*")
      .in("id", cartIds)
      .then(({ data }) => setItems(data ?? []));
  }, [cartIds]);

  if (signedIn === false) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold mb-3">Sign in to see your cart</h1>
        <p className="text-current/70 mb-8">
          Your cart is tied to your account so it follows you across devices.
        </p>
        <Link href="/login?redirect=/cart">
          <ReserveButton>Sign in</ReserveButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          My bag
        </p>
        <h1 className="font-display text-4xl font-bold">
          Cart {items.length > 0 && <span className="text-current/40">({items.length})</span>}
        </h1>
      </div>

      {!cartLoading && items.length === 0 ? (
        <div className="glass-panel rounded-2xl p-10 text-center">
          <p className="text-current/70 mb-6">
            Your cart is empty. Add a few books from the catalog and they&apos;ll show up here.
          </p>
          <Link href="/catalog">
            <ReserveButton>Browse the catalog</ReserveButton>
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            <AnimatePresence initial={false}>
              {items.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="glass-panel rounded-2xl p-4 flex gap-4 shadow-sm">
                    <Link
                      href={`/books/${book.id}`}
                      className="relative w-16 h-24 rounded-lg shrink-0 overflow-hidden"
                      style={{ backgroundColor: book.color }}
                    >
                      {book.cover_path && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={book.cover_path}
                          alt={`${book.title} cover`}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                    </Link>

                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[10px] uppercase tracking-widest text-current/50">
                            {book.genre} · {book.format}
                          </p>
                          <Link
                            href={`/books/${book.id}`}
                            className="font-display font-semibold leading-tight hover:underline block truncate"
                          >
                            {book.title}
                          </Link>
                          <p className="text-xs text-current/60">{book.author}</p>
                        </div>
                        <span
                          className={`shrink-0 text-[10px] font-semibold px-2 py-1 rounded-full ${availabilityStyles[book.availability]}`}
                        >
                          {availabilityLabel[book.availability]}
                        </span>
                      </div>

                      <div className="mt-auto pt-3 flex items-center justify-between gap-3">
                        <span className="text-xs text-current/50">★ {book.rating}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(book.id)}
                            className="text-xs font-semibold text-current/50 hover:text-[var(--color-maroon)] px-3 py-1.5 rounded-full transition-colors"
                          >
                            Remove
                          </button>
                          <Link
                            href={`/books/${book.id}/order`}
                            className="text-xs font-semibold text-white bg-[var(--color-burnt)] hover:bg-[var(--color-maroon)] px-4 py-1.5 rounded-full transition-colors"
                          >
                            Order now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="glass-panel rounded-2xl p-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-current/70">
              <span className="font-semibold text-current">{items.length}</span>{" "}
              {items.length === 1 ? "book" : "books"} ready to order, no payment needed, just pick a
              time.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/catalog">
                <ReserveButton variant="ghost">Keep browsing</ReserveButton>
              </Link>
              <ReserveButton variant="ghost" onClick={clearCart}>
                Clear cart
              </ReserveButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
