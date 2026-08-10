import Link from "next/link";
import { listPublishedServices } from "@/lib/biotest-client";
import { DEPARTMENT_LABELS } from "@/lib/schemas";

export default async function MarketplacePage() {
  const services = await listPublishedServices();
  const byDepartment = Object.groupBy(services, (s) => s.department);

  return (
    <div className="container-page py-12">
      <h1 className="font-display text-3xl font-bold text-ink-900">Our Services</h1>
      <p className="mt-2 text-ink-500">
        Every service shows its expected turnaround before you book.
      </p>

      <div className="mt-10 space-y-10">
        {Object.entries(byDepartment).map(([department, items]) => (
          <section key={department}>
            <h2 className="font-display text-lg font-bold text-ink-900">
              {DEPARTMENT_LABELS[department as keyof typeof DEPARTMENT_LABELS]}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {items?.map((service) => (
                <Link
                  key={service.id}
                  href={`/marketplace/${service.code}`}
                  className="rounded-card border border-ink-100 bg-white p-5 transition hover:border-teal-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-base font-bold text-ink-900">{service.name}</p>
                    <span className="badge badge-released whitespace-nowrap">
                      ~{service.slaTargetHours}h
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink-500">{service.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
