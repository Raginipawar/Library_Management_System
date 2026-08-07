"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="mt-24 bg-[var(--color-forest)] text-[#fdfaf3]">
      <div className="max-w-6xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl mb-2">MindfulReading</h3>
          <p className="text-sm text-white/70 mb-1 italic">
            Some pages don&apos;t just turn, they turn you.
          </p>
          <p className="text-sm text-white/60 max-w-sm">
            Reading is how ideas travel. Reserve a book, book a seat, and let
            the light guide you to your next chapter.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
            className="mt-6 flex gap-2 max-w-sm"
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              className="glass-dark flex-1 rounded-full px-4 py-2 text-sm placeholder-white/50 outline-none focus:ring-2 focus:ring-[var(--color-mustard)]"
            />
            <motion.button
              whileTap={{ scale: 0.92 }}
              type="submit"
              className="bg-[var(--color-mustard)] text-[#1c1712] font-semibold text-sm px-4 py-2 rounded-full"
            >
              {subscribed ? "Joined" : "Join"}
            </motion.button>
          </form>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-widest text-white/60">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/catalog" className="hover:text-white">Catalog</Link></li>
            <li><Link href="/events" className="hover:text-white">Events</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">My Shelf</Link></li>
            <li><Link href="/about" className="hover:text-white">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-widest text-white/60">
            Follow along
          </h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><a href="#" className="hover:text-white">Instagram</a></li>
            <li><a href="#" className="hover:text-white">Pinterest</a></li>
            <li><Link href="/contact" className="hover:text-white">Contact / FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        Made with paper, light and a little bit of code.
      </div>
    </footer>
  );
}
