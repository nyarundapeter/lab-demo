import Link from "next/link";
import { getCurrentAccount } from "@/lib/auth";

export default async function HomePage() {
  const account = await getCurrentAccount();

  return (
    <div className="container-page py-16">
      <div className="max-w-2xl">
        <p className="font-display text-xs font-bold uppercase tracking-wide text-teal-600">
          BioTest Diagnostics
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
          Precision Imaging.{" "}
          <span className="text-teal-500">Trusted Care.</span>
        </h1>
        <p className="mt-4 text-lg text-ink-600">
          Browse our services, see the turnaround time up front, and book a
          visit — no chasing, no guessing when your results will be ready.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/marketplace" className="btn-primary">
            Browse Services
          </Link>
          {account ? (
            <Link href="/my-bookings" className="btn-secondary">
              My Bookings
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
          <p className="font-display text-sm font-bold text-ink-900">Same-day reports</p>
          <p className="mt-2 text-sm text-ink-600">
            SLA shown on every service before you book — not a surprise after.
          </p>
        </div>
        <div className="rounded-card border border-ink-100 bg-white p-6">
          <p className="font-display text-sm font-bold text-ink-900">One place to track it</p>
          <p className="mt-2 text-sm text-ink-600">
            See your booking status without calling the front desk.
          </p>
        </div>
        <div className="rounded-card border border-ink-100 bg-white p-6">
          <p className="font-display text-sm font-bold text-ink-900">Your own doctor, informed</p>
          <p className="mt-2 text-sm text-ink-600">
            Your report reaches your referring doctor if you were sent by one.
          </p>
        </div>
      </div>
    </div>
  );
}
