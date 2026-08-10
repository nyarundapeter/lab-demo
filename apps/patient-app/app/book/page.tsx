"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { LabService } from "@/lib/schemas";

function BookForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presetServiceCode = searchParams.get("service") ?? "";

  const [services, setServices] = useState<LabService[]>([]);
  const [serviceCode, setServiceCode] = useState(presetServiceCode);
  const [notes, setNotes] = useState("");
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [signInRequired, setSignInRequired] = useState(false);

  useEffect(() => {
    fetch("/api/catalog")
      .then((res) => res.json())
      .then((data) => setServices(data.services ?? []))
      .finally(() => setLoadingCatalog(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setSignInRequired(false);

    const selected = services.find((s) => s.code === serviceCode);
    if (!selected) {
      setFormError("Choose a service to book.");
      setSubmitting(false);
      return;
    }

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceCode: selected.code,
        department: selected.department,
        ...(notes ? { notes } : {}),
      }),
    });

    if (res.status === 401) {
      setSignInRequired(true);
      setSubmitting(false);
      return;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setFormError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    router.push("/my-bookings");
    router.refresh();
  }

  return (
    <div className="container-page max-w-md py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">Book a visit</h1>
      <p className="mt-2 text-ink-500">We&apos;ll register your order the moment you submit.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-card border border-ink-100 bg-white p-6 shadow-sm">
        <div>
          <label className="field-label" htmlFor="service">Service</label>
          <select
            id="service"
            className="field-input"
            value={serviceCode}
            onChange={(e) => setServiceCode(e.target.value)}
            disabled={loadingCatalog}
          >
            <option value="">{loadingCatalog ? "Loading services…" : "Choose a service"}</option>
            {services.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name} (~{s.slaTargetHours}h)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="notes">Notes (optional)</label>
          <textarea
            id="notes"
            className="field-input"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything the front desk should know"
          />
        </div>

        {signInRequired && (
          <p className="text-sm text-red-600">
            Sign in first —{" "}
            <Link href={`/sign-in?returnTo=${encodeURIComponent(`/book?service=${serviceCode}`)}`} className="font-semibold underline">
              sign in
            </Link>{" "}
            to book.
          </p>
        )}
        {formError && <p className="text-sm text-red-600">{formError}</p>}

        <button type="submit" className="btn-primary w-full" disabled={submitting || loadingCatalog}>
          {submitting ? "Booking…" : "Book this visit"}
        </button>
      </form>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="container-page py-12 text-ink-400">Loading…</div>}>
      <BookForm />
    </Suspense>
  );
}
