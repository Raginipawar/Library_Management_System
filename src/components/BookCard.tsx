"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { DbBook } from "@/lib/types";
import AddToCartButton from "@/components/AddToCartButton";

const availabilityStyles: Record<DbBook["availability"], string> = {
  available: "bg-[var(--color-forest)] text-white",
  waitlist: "bg-[var(--color-mustard)] text-[#1c1712]",
  reserved: "bg-[var(--color-maroon)] text-white",
};

const availabilityLabel: Record<DbBook["availability"], string> = {
  available: "Available",
  waitlist: "Waitlist",
  reserved: "Reserved",
};

export default function BookCard({ book }: { book: DbBook }) {
  const cover = book.cover_path;

  return (
    <Link href={`/books/${book.id}`} className="group block">
      <motion.div
        whileHover={{ rotate: -6, y: -10 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="relative overflow-hidden rounded-xl px-4 py-6 h-56 flex flex-col justify-between shadow-md group-hover:shadow-2xl origin-bottom"
        style={{ backgroundColor: book.color }}
      >
        {cover && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cover}
              alt={`${book.title} cover`}
              className="absolute inset-0 w-full h-full object-cover opacity-55"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${book.color} 15%, transparent 65%)`,
              }}
            />
          </>
        )}
        {book.is_new && (
          <span className="absolute -top-2 -right-2 bg-[var(--color-pink)] text-white text-[10px] font-bold px-2 py-1 rounded-full rotate-6 shadow z-10">
            NEW
          </span>
        )}
        <AddToCartButton bookId={book.id} className="absolute -top-2 -left-2 shadow z-10" />
        <div className="relative">
          <p className="text-white/70 text-xs uppercase tracking-widest">{book.genre}</p>
          <h3 className="text-white font-display text-lg leading-tight mt-1 drop-shadow">
            {book.title}
          </h3>
        </div>
        <div className="relative">
          <p className="text-white/80 text-sm">{book.author}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-white/90 text-xs">★ {book.rating}</span>
            <span
              className={`text-[10px] font-semibold px-2 py-1 rounded-full ${availabilityStyles[book.availability]}`}
            >
              {availabilityLabel[book.availability]}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
