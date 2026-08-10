import Link from "next/link";
import { getCurrentAccount } from "@/lib/auth";

export default async function HomePage() {
  const account = await getCurrentAccount();

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-wide text-teal-600">
          BioTest Diagnostics — Referral Portal
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
          Refer with confidence.{" "}
          <span className="text-teal-500">Track every result.</span>
        </h1>
        <p className="mt-4 text-lg text-ink-600">
          Send a patient for imaging or diagnostics, see the SLA up front, and
          follow every referral through to the released report — all in one
          place.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/marketplace" className="btn-primary">
            Browse Services
          </Link>
          {account ? (
            <Link href="/my-referrals" className="btn-secondary">
              My Referrals
            </Link>
          ) : (
            <Link href="/sign-up" className="btn-secondary">
              Create an account
            </Link>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <div className="rounded-card border border-ink-100 bg-white p-6">
          <p className="font-display text-sm font-bold text-ink-900">Refer in minutes</p>
          <p className="mt-2 text-sm text-ink-600">
            Pick a service, add the patient&apos;s details, and it&apos;s in
            the queue — no phone calls required.
          </p>
        </div>
        <div className="rounded-card border border-ink-100 bg-white p-6">
          <p className="font-display text-sm font-bold text-ink-900">SLA before you commit</p>
          <p className="mt-2 text-sm text-ink-600">
            Every service lists its expected turnaround, so you can set
            expectations with your patient.
          </p>
        </div>
        <div className="rounded-card border border-ink-100 bg-white p-6">
          <p className="font-display text-sm font-bold text-ink-900">One list, every referral</p>
          <p className="mt-2 text-sm text-ink-600">
            Solo consultant or front-desk team — see the status of everyone
            you&apos;ve referred, in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
