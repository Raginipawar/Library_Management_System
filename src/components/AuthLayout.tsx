"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function AuthLayout({
  children,
  color = "var(--color-forest)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl min-h-[520px]">
        <div
          className="hidden md:flex flex-col justify-center items-center p-10 relative overflow-hidden"
          style={{ backgroundColor: color }}
        >
          <div className="light-beam absolute inset-x-0 top-0 h-full opacity-40 pointer-events-none" />
          <motion.svg
            width="140"
            height="170"
            viewBox="0 0 140 170"
            className="animate-soft-bob relative"
          >
            <path d="M20 40 L70 20 L120 40 L120 150 L70 135 L20 150 Z" fill="white" fillOpacity="0.15" />
            <path d="M70 20 L70 135" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
            <path d="M32 55 h30 M32 68 h30 M32 81 h30" stroke="white" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
            <path d="M78 55 h30 M78 68 h30 M78 81 h20" stroke="white" strokeOpacity="0.6" strokeWidth="3" strokeLinecap="round" />
          </motion.svg>
          <p className="relative text-white/90 text-center italic mt-6 max-w-[220px]">
            &ldquo;Some pages don&apos;t just turn, they turn you.&rdquo;
          </p>
        </div>
        <div className="glass-panel p-8 sm:p-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
