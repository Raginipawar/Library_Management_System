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

export default function OrderClient({ book }: { book: DbBook }) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [day, setDay] = useState(days[0]);
  const [slot, setSlot] = useState<string | null>(null);

  const session = getSession();
  const [fullName, setFullName] = useState(session?.fullName ?? "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const addressValid = fullName && phone && address && city && pin;

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(null);

    const session = getSession();
    if (!session) {
      router.push(`/login?redirect=/books/${book.id}/order`);
      return;
    }

    const supabase = createClient();
    const { data, error } = await supabase
      .from("reservations")
      .insert({
        user_id: session.id,
        book_id: book.id,
        status: book.availability === "available" ? "active" : "waitlist",
        pickup_slot: `${day.toLocaleDateString(undefined, {
          weekday: "long",
          month: "long",
          day: "numeric",
        })} at ${slot}`,
        delivery_details: `${fullName}, ${address}, ${city} - ${pin}, ${phone}`,
      })
      .select()
      .single();

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }

    setOrderId(data.id);
    setStep(4);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="glass-panel rounded-3xl p-8 relative overflow-hidden">
        {step === 4 && <Confetti />}

        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3, 4].map((s) => (
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
                Step 1 of 4
              </p>
              <h1 className="font-display text-2xl font-bold mb-1">Pick a pickup day</h1>
              <p className="text-sm text-current/60 mb-6">
                Ordering <span className="font-semibold">{book.title}</span>
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
                Step 2 of 4
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
              <div className="flex gap-3">
                <ReserveButton variant="ghost" onClick={() => setStep(1)}>
                  Back
                </ReserveButton>
                <ReserveButton disabled={!slot} onClick={() => setStep(3)}>
                  Next: your details
                </ReserveButton>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
            >
              <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
                Step 3 of 4
              </p>
              <h1 className="font-display text-2xl font-bold mb-1">Your details</h1>
              <p className="text-sm text-current/60 mb-6">
                So the front desk knows who&apos;s picking this up.
              </p>
              <div className="space-y-3 mb-8">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
                />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
                  />
                  <input
                    type="text"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="PIN code"
                    className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
                  />
                </div>
              </div>
              {error && <p className="text-sm text-[var(--color-maroon)] mb-4">{error}</p>}
              <div className="flex gap-3">
                <ReserveButton variant="ghost" onClick={() => setStep(2)}>
                  Back
                </ReserveButton>
                <ReserveButton disabled={!addressValid || submitting} onClick={handleConfirm}>
                  {submitting ? "Placing order…" : "Place order"}
                </ReserveButton>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-forest)] text-white grid place-items-center">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 10l4 4 8-9"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h1 className="font-display text-2xl font-bold mb-1">Order placed!</h1>
              <p className="text-current/70 mb-4">
                <span className="font-semibold">{book.title}</span> is ready for pickup{" "}
                {day.toLocaleDateString(undefined, {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {slot}
              </p>
              {orderId && (
                <p className="inline-block text-xs font-semibold text-current/50 bg-current/5 px-4 py-2 rounded-full mb-6">
                  Order ID: #{orderId.slice(0, 8).toUpperCase()}
                </p>
              )}
              <div>
                <Link href="/dashboard">
                  <ReserveButton>View my orders</ReserveButton>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
