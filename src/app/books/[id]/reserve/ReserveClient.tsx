"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { DbBook } from "@/lib/types";
import ReserveButton from "@/components/ReserveButton";
import Confetti from "@/components/Confetti";
import { createClient } from "@/lib/supabase/client";
import { getSession } from "@/lib/local-auth";

const days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});

const slots = ["9:00 AM", "11:30 AM", "2:00 PM", "4:30 PM", "6:00 PM"];

export default function ReserveClient({ book }: { book: DbBook }) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);

    const session = getSession();
    if (!session) {
      router.push(`/login?redirect=/books/${book.id}/reserve`);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.from("reservations").insert({
      user_id: session.id,
      book_id: book.id,
      status: book.availability === "available" ? "active" : "waitlist",
      pickup_slot: `${day.toLocaleDateString(undefined, {
        weekday: "long",
        month: "long",
        day: "numeric",
      })} at ${slot}`,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    setStep(3);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        {step === 3 && <Confetti />}

        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                step >= s ? "bg-[var(--color-burnt)]" : "bg-current/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
                Step 1 of 3
              </p>
              <h1 className="font-display text-2xl font-bold mb-1">Pick a pickup day</h1>
              <p className="text-sm text-current/60 mb-6">
                Reserving <span className="font-semibold">{book.title}</span>
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-8">
                {days.map((d) => {
                  const active = d.toDateString() === day.toDateString();
                  return (
                    <button
                      key={d.toISOString()}
                      onClick={() => setDay(d)}
                      className={`rounded-xl py-3 text-xs font-semibold transition-colors ${
                        active
                          ? "bg-[var(--color-forest)] text-white"
                          : "bg-current/5 hover:bg-current/10"
                      }`}
                    >
                      <span className="block text-[10px] opacity-70">
                        {d.toLocaleDateString(undefined, { weekday: "short" })}
                      </span>
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
              <ReserveButton onClick={() => setStep(2)}>Next: choose a time</ReserveButton>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
                Step 2 of 3
              </p>
              <h1 className="font-display text-2xl font-bold mb-1">Pick a time slot</h1>
              <p className="text-sm text-current/60 mb-6">
                {day.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {slots.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSlot(s)}
                    className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                      slot === s
                        ? "bg-[var(--color-burnt)] text-white"
                        : "bg-current/5 hover:bg-current/10"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {error && <p className="text-sm text-[var(--color-maroon)] mb-4">{error}</p>}
              <div className="flex gap-3">
                <ReserveButton variant="ghost" onClick={() => setStep(1)}>
                  Back
                </ReserveButton>
                <ReserveButton disabled={!slot || submitting} onClick={handleConfirm}>
                  {submitting ? "Confirming…" : "Confirm reservation"}
                </ReserveButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <h1 className="font-display text-2xl font-bold mb-2">You&apos;re all set!</h1>
              <p className="text-current/70 mb-1">
                <span className="font-semibold">{book.title}</span> is reserved for
              </p>
              <p className="text-current/70 mb-6">
                {day.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {slot}
              </p>
              <Link href="/dashboard">
                <ReserveButton>Go to My Shelf</ReserveButton>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
