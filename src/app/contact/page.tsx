"use client";

import { useState } from "react";
import FaqAccordion from "@/components/FaqAccordion";
import ReserveButton from "@/components/ReserveButton";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          We&apos;re here to help
        </p>
        <h1 className="font-display text-4xl font-bold">Contact &amp; FAQ</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold mb-4">Send us a note</h2>
          {sent ? (
            <p className="text-sm text-current/70">
              Thanks, we&apos;ll get back to you within a day.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-3"
            >
              <input
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
              />
              <input
                required
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
              />
              <textarea
                required
                rows={4}
                placeholder="How can we help?"
                className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
              />
              <ReserveButton type="submit" className="w-full">
                Send message
              </ReserveButton>
            </form>
          )}
        </div>

        <div className="rounded-2xl p-6 text-white flex flex-col justify-center gap-4" style={{ backgroundColor: "var(--color-forest)" }}>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Visit</p>
            <p className="font-semibold">124 Willowmere Ave, Reading Corner</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Hours</p>
            <p className="font-semibold">Mon–Sat, 9am–8pm</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-white/60">Email</p>
            <p className="font-semibold">hello@pageturn.example</p>
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold mb-6">Frequently asked</h2>
      <FaqAccordion />
    </div>
  );
}
