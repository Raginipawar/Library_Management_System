"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import ReserveButton from "@/components/ReserveButton";
import { createClient } from "@/lib/supabase/client";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 1500);
  };

  return (
    <AuthLayout color="var(--color-cobalt)">
      <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
        Almost done
      </p>
      <h1 className="font-display text-3xl font-bold mb-6">Set a new password</h1>
      {done ? (
        <p className="text-sm text-current/70">Password updated, taking you to My Shelf…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-cobalt)]"
          />
          {error && <p className="text-sm text-[var(--color-maroon)]">{error}</p>}
          <ReserveButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating…" : "Update password"}
          </ReserveButton>
        </form>
      )}
    </AuthLayout>
  );
}
