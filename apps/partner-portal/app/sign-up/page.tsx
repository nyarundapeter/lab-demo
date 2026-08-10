"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ROLE_LABELS, type PartnerRole } from "@/lib/schemas";

type FieldErrors = Record<string, string[] | undefined>;

const ROLE_OPTIONS = Object.entries(ROLE_LABELS) as [PartnerRole, string][];

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") ?? "/my-referrals";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<PartnerRole>("consultant");
  const [practiceName, setPracticeName] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setFormError(null);

    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        role,
        ...(practiceName ? { practiceName } : {}),
        password,
      }),
    });

    if (res.status === 422) {
      const data = await res.json();
      setErrors(data.issues ?? {});
      setSubmitting(false);
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push(returnTo);
    router.refresh();
  }

  return (
    <div className="container-page max-w-md py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">Create your account</h1>
      <p className="mt-2 text-ink-500">
        For referring clinicians and front-desk staff — a practice is optional.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
        <div>
          <label className="field-label" htmlFor="name">Full name</label>
          <input id="name" className="field-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Amara Osei" />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name[0]}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" type="email" className="field-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email[0]}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor="role">You are a</label>
          <select id="role" className="field-input" value={role} onChange={(e) => setRole(e.target.value as PartnerRole)}>
            {ROLE_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="practiceName">Practice name (optional)</label>
          <input
            id="practiceName"
            className="field-input"
            value={practiceName}
            onChange={(e) => setPracticeName(e.target.value)}
            placeholder="Leave blank if you're referring on your own"
          />
          {errors.practiceName && <p className="mt-1 text-xs text-red-600">{errors.practiceName[0]}</p>}
        </div>
        <div>
          <label className="field-label" htmlFor="password">Password</label>
          <input id="password" type="password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password[0]}</p>}
        </div>

        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? "Creating account…" : "Create account"}
        </button>

        <p className="text-center text-sm text-ink-500">
          Already have an account?{" "}
          <Link href={`/sign-in?returnTo=${encodeURIComponent(returnTo)}`} className="font-semibold text-teal-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="container-page py-12 text-ink-400">Loading…</div>}>
      <SignUpForm />
    </Suspense>
  );
}
