import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/auth";
import { listBookingsByPhone } from "@/lib/biotest-client";
import { DEPARTMENT_LABELS, EXAM_ORDER_STATUS_LABELS } from "@/lib/schemas";

const STATUS_BADGE_CLASS: Record<string, string> = {
  "in-progress": "badge-in-progress",
  released: "badge-released",
  "recapture-requested": "badge-recapture-requested",
};

export default async function MyBookingsPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/sign-in?returnTo=/my-bookings");

  const bookings = await listBookingsByPhone(account.phone);

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">My Bookings</h1>
      <p className="mt-2 text-ink-500">Every visit you&apos;ve booked or been referred for.</p>

      {bookings.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-ink-200 bg-white p-8 text-center">
          <p className="text-ink-500">No bookings yet.</p>
          <Link href="/marketplace" className="btn-primary mt-4 inline-flex">
            Browse services
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="rounded-card border border-ink-100 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-ink-900">
                    {DEPARTMENT_LABELS[booking.department]}
                  </p>
                  <p className="mt-1 text-sm text-ink-500">Service {booking.serviceCode}</p>
                </div>
                <span className={`badge ${STATUS_BADGE_CLASS[booking.status]}`}>
                  {EXAM_ORDER_STATUS_LABELS[booking.status]}
                </span>
              </div>
              {booking.notes && <p className="mt-3 text-sm text-ink-600">{booking.notes}</p>}
              <p className="mt-3 text-xs text-ink-400">
                Booked {new Date(booking.createdAt).toLocaleString()}
                {booking.releasedAt && ` · Released ${new Date(booking.releasedAt).toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
