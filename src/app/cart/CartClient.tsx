"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { createClient } from "@/lib/supabase/client";
import { DbBook } from "@/lib/types";
import ReserveButton from "@/components/ReserveButton";

export default function CartClient() {
  const { cartIds, removeFromCart, clearCart, loading: cartLoading } = useCart();
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [items, setItems] = useState<DbBook[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
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
          Added to cart
        </p>
        <h1 className="font-display text-4xl font-bold">Cart</h1>
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
          <div className="glass-panel rounded-2xl divide-y divide-current/10 mb-6">
            <AnimatePresence initial={false}>
              {items.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 p-4 overflow-hidden"
                >
                  <Link
                    href={`/books/${book.id}`}
                    className="w-10 h-14 rounded shrink-0"
                    style={{ backgroundColor: book.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <Link href={`/books/${book.id}`} className="font-semibold text-sm truncate block hover:underline">
                      {book.title}
                    </Link>
                    <p className="text-xs text-current/60">{book.author}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="text-xs font-semibold text-current/50 hover:text-[var(--color-maroon)] px-3 py-1.5 rounded-full transition-colors"
                  >
                    Remove
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/catalog">
              <ReserveButton variant="ghost">Keep browsing</ReserveButton>
            </Link>
            <ReserveButton variant="ghost" onClick={clearCart}>
              Clear cart
            </ReserveButton>
          </div>
        </>
      )}
    </div>
  );
}
