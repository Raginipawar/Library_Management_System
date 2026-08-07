"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import ReserveButton from "@/components/ReserveButton";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmation is on, there's no session yet: show a
    // "check your inbox" state instead of pretending we're signed in.
    if (!data.session) {
      setCheckEmail(true);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  if (checkEmail) {
    return (
      <AuthLayout color="var(--color-burnt)">
        <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
          Almost there
        </p>
        <h1 className="font-display text-3xl font-bold mb-4">Check your inbox</h1>
        <p className="text-sm text-current/70">
          We sent a confirmation link to <span className="font-semibold">{email}</span>.
          Click it to activate your account, then sign in.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout color="var(--color-burnt)">
      <p className="text-xs uppercase tracking-widest text-[var(--color-maroon)] font-semibold mb-1">
        Join the library
      </p>
      <h1 className="font-display text-3xl font-bold mb-6">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full name"
          className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
        />
        <input
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
        />
        {error && <p className="text-sm text-[var(--color-maroon)]">{error}</p>}
        <ReserveButton type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </ReserveButton>
      </form>
      <p className="text-sm text-current/60 mt-6 text-center">
        Already a member?{" "}
        <Link href="/login" className="font-semibold underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
