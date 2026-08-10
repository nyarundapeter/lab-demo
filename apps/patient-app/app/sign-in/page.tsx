"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/my-bookings";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const res = await fetch("/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Sign in failed. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push(returnTo);
    router.refresh();
  }

  return (
    <div className="container-page max-w-md py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">Sign in</h1>
      <p className="mt-2 text-ink-500">Track your bookings and book your next visit.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
        <div>
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" type="email" className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" type="password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <p className="text-center text-sm text-ink-500">
          New to BioTest?{" "}
          <Link href={`/sign-up?returnTo=${encodeURIComponent(returnTo)}`} className="font-semibold text-teal-600 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="container-page py-12 text-ink-400">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
