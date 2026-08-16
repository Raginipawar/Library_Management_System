"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { getSession, onAuthChange, signOut, LocalSession } from "@/lib/local-auth";

const links = [
  { href: "/catalog", label: "Catalog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Help" },
  { href: "/dashboard", label: "My Shelf" },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<LocalSession | null>(null);
  const { cartIds } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Session lives in a cookie, unreadable during SSR/first paint;
    // hydrate it post-mount to avoid a server/client mismatch.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(getSession());
    return onAuthChange(() => setUser(getSession()));
  }, []);

  const handleSignOut = () => {
    signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const firstName = user?.fullName.split(" ")[0] ?? user?.email.split("@")[0];

  return (
    <motion.header
      animate={{
        paddingTop: scrolled ? "0.5rem" : "1.25rem",
        paddingBottom: scrolled ? "0.5rem" : "1.25rem",
      }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 px-4 md:px-8"
    >
      <div
        className={`glass-panel mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-300 ${
          scrolled ? "py-1.5" : "py-2.5"
        }`}
      >
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          MindfulReading
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            aria-label="View cart"
            className="relative rounded-full w-9 h-9 grid place-items-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M2 3h2l1.6 9.6a1.5 1.5 0 0 0 1.48 1.25h6.24a1.5 1.5 0 0 0 1.48-1.25L16 6H4.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="7.5" cy="17" r="1.2" fill="currentColor" />
              <circle cx="14" cy="17" r="1.2" fill="currentColor" />
            </svg>
            <AnimatePresence>
              {cartIds.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-[var(--color-burnt)] text-white text-[10px] font-bold rounded-full w-4 h-4 grid place-items-center"
                >
                  {cartIds.length}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          {user ? (
            <button
              onClick={handleSignOut}
              className="hidden sm:inline-block bg-[var(--color-forest)] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[var(--color-maroon)] transition-colors"
            >
              Sign out{firstName ? `, ${firstName}` : ""}
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-block bg-[var(--color-burnt)] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[var(--color-maroon)] transition-colors"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </motion.header>
  );
}
