"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AuthLayout from "@/components/AuthLayout";
import ReserveButton from "@/components/ReserveButton";
import { signUp } from "@/lib/local-auth";

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export default function SignupClient() {
  const router = useRouter();
  const params = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!PASSWORD_RULE.test(password)) {
      setError(
        "Password must be at least 8 characters and include a letter, a number, and a symbol."
      );
      return;
    }

    setLoading(true);
    const { error } = await signUp(email, password, fullName);
    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    router.push(params.get("redirect") || "/dashboard");
    router.refresh();
  };

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
        <div>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-current/15 bg-transparent px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-burnt)]"
          />
          <p className="text-xs text-current/50 mt-1.5">
            At least 8 characters, with a letter, a number, and a symbol.
          </p>
        </div>
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
