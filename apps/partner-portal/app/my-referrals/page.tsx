import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentAccount } from "@/lib/auth";
import { listReferralsByAccountId } from "@/lib/biotest-client";
import { DEPARTMENT_LABELS, EXAM_ORDER_STATUS_LABELS } from "@/lib/schemas";

const STATUS_BADGE_CLASS: Record<string, string> = {
  "in-progress": "badge-in-progress",
  released: "badge-released",
  "recapture-requested": "badge-recapture-requested",
};

export default async function MyReferralsPage() {
  const account = await getCurrentAccount();
  if (!account) redirect("/sign-in?returnTo=/my-referrals");

  const referrals = await listReferralsByAccountId(account.id);

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">My Referrals</h1>
      <p className="mt-2 text-ink-500">Every patient you&apos;ve referred, and where their order stands.</p>

      {referrals.length === 0 ? (
        <div className="mt-8 rounded-card border border-dashed border-ink-200 bg-white p-8 text-center">
          <p className="text-ink-500">No referrals yet.</p>
          <Link href="/marketplace" className="btn-primary mt-4 inline-flex">
            Browse services
          </Link>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {referrals.map((referral) => (
            <div key={referral.id} className="rounded-card border border-ink-100 bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-base font-bold text-ink-900">{referral.patientName}</p>
                  <p className="mt-1 text-sm text-ink-500">
                    {DEPARTMENT_LABELS[referral.department]} · Service {referral.serviceCode}
                  </p>
                  <p className="mt-1 text-xs text-ink-400">{referral.patientPhone}</p>
                </div>
                <span className={`badge ${STATUS_BADGE_CLASS[referral.status]}`}>
                  {EXAM_ORDER_STATUS_LABELS[referral.status]}
                </span>
              </div>
              {referral.notes && <p className="mt-3 text-sm text-ink-600">{referral.notes}</p>}
              <p className="mt-3 text-xs text-ink-400">
                Referred {new Date(referral.createdAt).toLocaleString()}
                {referral.releasedAt && ` · Released ${new Date(referral.releasedAt).toLocaleString()}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
