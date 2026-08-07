"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function SectionReveal({
  children,
  className = "",
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0.15, filter: "grayscale(1) brightness(0.7)" }}
      whileInView={{ opacity: 1, filter: "grayscale(0) brightness(1)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      {children}
    </motion.section>
  );
}
