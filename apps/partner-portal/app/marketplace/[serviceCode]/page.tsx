import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceByCode } from "@/lib/biotest-client";
import { DEPARTMENT_LABELS } from "@/lib/schemas";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceCode: string }>;
}) {
  const { serviceCode } = await params;
  const service = await getServiceByCode(serviceCode);
  if (!service) notFound();

  return (
    <div className="container-page max-w-2xl py-12">
      <Link href="/marketplace" className="text-sm text-teal-600 hover:underline">
        ← Back to services
      </Link>

      <div className="mt-4 rounded-card border border-ink-100 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
          {DEPARTMENT_LABELS[service.department]}
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink-900">{service.name}</h1>
        <p className="mt-3 text-ink-600">{service.summary}</p>

        <div className="mt-6 flex items-center gap-2 text-sm text-ink-500">
          <span className="badge badge-released">~{service.slaTargetHours}h turnaround</span>
        </div>

        <Link
          href={`/refer?service=${encodeURIComponent(service.code)}`}
          className="btn-primary mt-8 inline-flex"
        >
          Refer a patient for this service
        </Link>
      </div>
    </div>
  );
}
