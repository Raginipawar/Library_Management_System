"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long can I borrow a book for?",
    a: "Most titles are a 21-day loan, renewable once if no one else is waiting.",
  },
  {
    q: "What happens if I'm on a waitlist?",
    a: "You'll get an email and a dashboard notification the moment your copy is ready for pickup.",
  },
  {
    q: "Can I reserve a seat without borrowing a book?",
    a: "Yes, the Events page lets you book study room seats and workshop spots on their own.",
  },
  {
    q: "Is there a fine for late returns?",
    a: "We use a grace-period system rather than fines, you'll just lose reservation priority for a week.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={f.q} className="glass-panel rounded-2xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold"
          >
            {f.q}
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-xl">
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5"
              >
                <p className="text-sm text-current/70 pb-4">{f.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
