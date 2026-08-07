"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const colors = [
  "var(--color-burnt)",
  "var(--color-maroon)",
  "var(--color-forest)",
  "var(--color-lavender)",
  "var(--color-mustard)",
  "var(--color-pink)",
  "var(--color-cobalt)",
];

function generatePieces(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 600,
    rotate: Math.random() * 720 - 360,
    delay: Math.random() * 0.3,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? "50%" : "2px",
  }));
}

export default function Confetti({ count = 60 }: { count?: number }) {
  // Generated once on mount via lazy initializer — a fresh burst per
  // confetti instance, not recomputed on re-render.
  const [pieces] = useState(() => generatePieces(count));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            x: p.x,
            y: [0, -140, 260],
            opacity: [1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{ duration: 1.6, delay: p.delay, ease: "easeOut" }}
          className="absolute left-1/2 top-1/3 block"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape,
          }}
        />
      ))}
    </div>
  );
}
