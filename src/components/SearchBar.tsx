"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search titles, authors, genres…",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative max-w-xl w-full mx-auto">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          rotate: focused ? -3 : 0,
          scale: focused ? 1.03 : 1,
        }}
        style={{ backgroundColor: "var(--color-mustard)", originX: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        animate={{
          rotate: focused ? 2 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="relative glass-panel rounded-2xl flex items-center gap-3 px-5 py-3"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          className="shrink-0 text-current/60"
        >
          <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
          <line x1="12.4" y1="12.4" x2="17" y2="17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="bg-transparent outline-none flex-1 text-sm placeholder-current/50"
        />
      </motion.div>
    </div>
  );
}
