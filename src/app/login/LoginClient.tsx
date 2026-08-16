"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import ReserveButton from "@/components/ReserveButton";
import { signIn } from "@/lib/local-auth";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);

    setLoading(false);
    if (error) {
      setError(error);
      return;
    }

    router.push(params.get("redirect") || "/dashboard");
    router.refresh();
  };

  return (
    <AuthLayout color="var(--color-forest)">
      <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
        Welcome back
      </p>
      <h1 className="font-display text-3xl font-bold mb-6">Sign in</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-forest)]"
        />
        {error && <p className="text-sm text-[var(--color-maroon)]">{error}</p>}
        <ReserveButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </ReserveButton>
      </form>
      <p className="text-sm text-current/60 mt-6 text-center">
        New here?{" "}
        <Link href="/signup" className="font-semibold underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
