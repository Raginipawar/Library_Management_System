"use client";

import { motion } from "framer-motion";

export default function WalkingCharacter({
  message,
  color = "var(--color-forest)",
}: {
  message: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -120 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-4"
    >
      <svg
        width="90"
        height="110"
        viewBox="0 0 90 110"
        className="animate-walk shrink-0"
      >
        {/* legs */}
        <rect x="34" y="78" width="8" height="24" rx="4" fill="#1c1712" />
        <rect x="50" y="78" width="8" height="24" rx="4" fill="#1c1712" />
        <ellipse cx="38" cy="104" rx="9" ry="6" fill="#3b2a1e" />
        <ellipse cx="54" cy="104" rx="9" ry="6" fill="#3b2a1e" />
        {/* book body */}
        <path d="M20 30 L45 20 L70 30 L70 85 L45 78 L20 85 Z" fill={color} />
        <path d="M45 20 L45 78" stroke="white" strokeOpacity="0.4" strokeWidth="2" />
        {/* waving arm */}
        <motion.g
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
          style={{ originX: "70px", originY: "45px" }}
        >
          <rect x="66" y="35" width="26" height="9" rx="4.5" fill="#f6b8a1" />
        </motion.g>
        <rect x="12" y="55" width="20" height="9" rx="4.5" fill="#f6b8a1" />
      </svg>
      <div className="glass-panel rounded-2xl rounded-bl-none px-6 py-4 flex-1">
        <p className="text-base font-medium">{message}</p>
      </div>
    </motion.div>
  );
}
