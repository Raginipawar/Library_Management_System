"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

interface Props extends HTMLMotionProps<"button"> {
  variant?: "primary" | "ghost";
}

export default function ReserveButton({
  children,
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className={clsx(
        "px-6 py-3 rounded-full font-semibold cursor-pointer transition-colors",
        variant === "primary"
          ? "bg-[var(--color-burnt)] text-white hover:bg-[var(--color-maroon)]"
          : "glass-panel text-current",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
