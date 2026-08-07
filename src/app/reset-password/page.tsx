"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import ReserveButton from "@/components/ReserveButton";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);
    // Always show the same confirmation, whether or not the email
    // exists, so we don't leak which addresses have accounts.
    setSent(true);
  };

  return (
    <AuthLayout color="var(--color-cobalt)">
      <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
        No worries
      </p>
      <h1 className="font-display text-3xl font-bold mb-6">Reset your password</h1>
      {sent ? (
        <p className="text-sm text-current/70">
          If an account exists for that email, a reset link is on its way.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-cobalt)]"
          />
          <ReserveButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </ReserveButton>
        </form>
      )}
      <p className="text-sm text-current/60 mt-6 text-center">
        <Link href="/login" className="font-semibold underline underline-offset-4">
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
