"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/theme-context";

export default function LampHero() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="relative flex flex-col items-center justify-center pb-2 select-none">
      <div
        className="relative w-[140px] sm:w-[160px] animate-lamp-sway"
        style={{ transformOrigin: "top center" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lamp-real.png"
          alt="Hanging pendant lamp"
          className="w-full h-auto drop-shadow-xl relative z-10"
        />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            bottom: "2%",
            width: "180%",
            height: "70px",
            background:
              "radial-gradient(ellipse at center, #ffd23f 0%, #ff8a3d 50%, transparent 75%)",
            filter: "blur(14px)",
          }}
          initial={false}
          animate={{ opacity: isDark ? 0.2 : 0.85 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <button
        onClick={toggleTheme}
        className="glass-panel mt-4 rounded-full px-5 py-2 text-sm font-semibold tracking-wide cursor-pointer hover:scale-105 active:scale-95 transition-transform"
        aria-label="Toggle lamp / dark mode"
      >
        {isDark ? "Turn the lamp on" : "Dim the lights"}
      </button>
    </div>
  );
}
