// lib/biotest-client.ts — the single seam between the Patient App (this app,
// self-booking) and DWS.07 (the real backend, apps/dws-07/). Modeled field-for-
// field on Hotel-Demo-DXP-DWS/apps/dxp/lib/dws-client.ts.
//
// The Patient App owns its own identity/session (lib/auth.ts, lib/data.ts) and
// nothing else — every read/write of lab-service or exam-order goes through
// DWS.07's PS.DATA route via this file. No other file in this app imports
// fetch() against DWS.07 directly.
//
// Contract notes (read from apps/dws-07 source, read-only reference):
//   - Entity shapes: Biotest/scaffold/DWS.07/SOLUTION.md `entities:` block —
//     lab-service and exam-order, matching lib/schemas.ts field-for-field.
//   - Route shape: apps/dws-07/app/api/platform/data/[[...path]]/route.ts,
//     backed by @dbp/ps-data/server (PS.DATA):
//       POST /api/platform/data/entities/<type>          body: { data: <fields> }
//       GET  /api/platform/data/entities/<type>?filter.<field>=<value>
//     requires an `x-tenant-id` header; responses wrap entity fields under
//     `.data` alongside id/createdAt/updatedAt.
//   - No trusted-caller guard exists on that route as of this writing
//     (confirmed by reading the route file directly — no x-dbp-internal-key
//     check present). BIOTEST_INTERNAL_SHARED_SECRET is sent anyway, for
//     forward compatibility if that guard is added later, per the open item
//     in Biotest/scaffold/client-apps-plan.md.

import type { Department, ExamOrder, LabService } from "./schemas";

function biotestBaseUrl(): string {
  return process.env.BIOTEST_BASE_URL ?? "http://localhost:3000";
}

function biotestTenantId(): string {
  return process.env.BIOTEST_TENANT_ID ?? "tenant-alpha";
}

function biotestHeaders(): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-tenant-id": biotestTenantId(),
    "x-dbp-internal-key": process.env.BIOTEST_INTERNAL_SHARED_SECRET ?? "",
  };
}

export class BiotestClientError extends Error {
  readonly status: number;
  readonly issues?: unknown;

  constructor(message: string, status: number, issues?: unknown) {
    super(message);
    this.name = "BiotestClientError";
    this.status = status;
    this.issues = issues;
  }
}

async function readErrorBody(res: Response): Promise<{ message: string; issues?: unknown }> {
  try {
    const body = (await res.json()) as { error?: string; issues?: unknown };
    return {
      message: body.error ?? `DWS.07 request failed with status ${res.status}`,
      issues: body.issues,
    };
  } catch {
    return { message: `DWS.07 request failed with status ${res.status}` };
  }
}

async function biotestFetch(url: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown network error";
    throw new BiotestClientError(`Could not reach DWS.07: ${message}`, 502);
  }
}

function entityPath(type: string): string {
  return `/api/platform/data/entities/${type}`;
}

interface DbpEntityRecord<T> {
  id: string;
  createdAt: string;
  updatedAt: string;
  data: T;
}

interface DbpListResponse<T> {
  rows: DbpEntityRecord<T>[];
  total: number;
  page: number;
  pageSize: number;
}

// ── lab-service — read-only from this app ───────────────────────────────────

type LabServiceFields = Omit<LabService, "id">;

function toLabService(record: DbpEntityRecord<LabServiceFields>): LabService {
  return { id: record.id, ...record.data };
}

/** Published, active services only — no separate patient-visible publish-scope
 * field exists yet (flagged as an open item in client-apps-plan.md); filtering
 * on status=active is the honest current behaviour, not a workaround. */
export async function listPublishedServices(): Promise<LabService[]> {
  const url = new URL(`${biotestBaseUrl()}${entityPath("lab-service")}`);
  url.searchParams.set("filter.status", "active");
  url.searchParams.set("pageSize", "100");

  const res = await biotestFetch(url.toString(), { method: "GET", headers: biotestHeaders() });
  if (!res.ok) {
    const { message, issues } = await readErrorBody(res);
    throw new BiotestClientError(message, res.status, issues);
  }
  const body = (await res.json()) as DbpListResponse<LabServiceFields>;
  return body.rows.map(toLabService);
}

export async function getServiceByCode(code: string): Promise<LabService | null> {
  const url = new URL(`${biotestBaseUrl()}${entityPath("lab-service")}`);
  url.searchParams.set("filter.code", code);
  url.searchParams.set("pageSize", "1");

  const res = await biotestFetch(url.toString(), { method: "GET", headers: biotestHeaders() });
  if (!res.ok) {
    const { message, issues } = await readErrorBody(res);
    throw new BiotestClientError(message, res.status, issues);
  }
  const body = (await res.json()) as DbpListResponse<LabServiceFields>;
  const record = body.rows[0];
  return record ? toLabService(record) : null;
}

// ── exam-order — create (source: dxp) + read (own bookings) ─────────────────

type ExamOrderFields = Omit<ExamOrder, "id" | "createdAt" | "updatedAt">;

function toExamOrder(record: DbpEntityRecord<ExamOrderFields>): ExamOrder {
  return {
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    ...record.data,
  };
}

export interface CreateBookingInput {
  patientName: string;
  patientPhone: string;
  department: Department;
  serviceCode: string;
  siteId: string;
  notes?: string;
}

export async function createBooking(input: CreateBookingInput): Promise<ExamOrder> {
  // source and status are forced here, never accepted from a caller — a
  // booking created by this app is always source: dxp, always starts
  // in-progress. Same discipline as apps/dxp forcing its own request shape.
  const payload: ExamOrderFields = {
    patientName: input.patientName,
    patientPhone: input.patientPhone,
    source: "dxp",
    department: input.department,
    serviceCode: input.serviceCode,
    siteId: input.siteId,
    status: "in-progress",
    ...(input.notes ? { notes: input.notes } : {}),
  };

  const res = await biotestFetch(`${biotestBaseUrl()}${entityPath("exam-order")}`, {
    method: "POST",
    headers: biotestHeaders(),
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) {
    const { message, issues } = await readErrorBody(res);
    throw new BiotestClientError(message, res.status, issues);
  }
  const record = (await res.json()) as DbpEntityRecord<ExamOrderFields>;
  return toExamOrder(record);
}

/** "My Bookings" — filtered by patientPhone, the same role guestEmail plays
 * in apps/dxp's listServicingRequestsByGuestEmail. */
export async function listBookingsByPhone(phone: string): Promise<ExamOrder[]> {
  const url = new URL(`${biotestBaseUrl()}${entityPath("exam-order")}`);
  url.searchParams.set("filter.patientPhone", phone);
  url.searchParams.set("pageSize", "100");

  const res = await biotestFetch(url.toString(), { method: "GET", headers: biotestHeaders() });
  if (!res.ok) {
    const { message, issues } = await readErrorBody(res);
    throw new BiotestClientError(message, res.status, issues);
  }
  const body = (await res.json()) as DbpListResponse<ExamOrderFields>;
  return body.rows
    .map(toExamOrder)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
