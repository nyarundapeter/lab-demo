// lib/biotest-client.ts — the single seam between the Partner Portal (this
// app) and DWS.07 (the real backend, apps/dws-07/). Modeled on
// Hotel-Demo-DXP-DWS/apps/dxp/lib/dws-client.ts, same as patient-app's copy —
// not shared code between the two apps, each owns its own.
//
// The real difference from patient-app's version: referrals are filtered by
// referrerAccountId (this account's own id), not patientPhone — the Partner
// Portal's account holder is never the patient. `referrerAccountId` was added
// to the exam-order entity in Biotest/scaffold/DWS.07/SOLUTION.md specifically
// so this filter has a field to use — see client-apps-plan.md.
//
// No trusted-caller guard exists on DWS.07's PS.DATA route as of this writing
// (confirmed by reading the route file directly). BIOTEST_INTERNAL_SHARED_SECRET
// is still sent, for forward compatibility if that guard is added later.

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

/** Referrer-visible, active services only — same open item as patient-app:
 * no separate referrer-visible publish-scope field exists yet, filtering on
 * status=active is the honest current behaviour. */
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

// ── exam-order — create (source: referral) + read (own referrals) ──────────

type ExamOrderFields = Omit<ExamOrder, "id" | "createdAt" | "updatedAt">;

function toExamOrder(record: DbpEntityRecord<ExamOrderFields>): ExamOrder {
  return {
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    ...record.data,
  };
}

export interface CreateReferralInput {
  patientName: string;
  patientPhone: string;
  department: Department;
  serviceCode: string;
  siteId: string;
  referrerAccountId: string;
  notes?: string;
}

export async function createReferral(input: CreateReferralInput): Promise<ExamOrder> {
  // source, status, and referrerAccountId are all forced here from the
  // authenticated session — never accepted from client input. A referral
  // created by this app is always source: referral, always starts
  // in-progress, always tagged to the submitting account.
  const payload: ExamOrderFields = {
    patientName: input.patientName,
    patientPhone: input.patientPhone,
    source: "referral",
    department: input.department,
    serviceCode: input.serviceCode,
    siteId: input.siteId,
    status: "in-progress",
    referrerAccountId: input.referrerAccountId,
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

/** "My Referrals" — filtered by referrerAccountId, not patientPhone. This
 * account is the referrer, never the patient. */
export async function listReferralsByAccountId(accountId: string): Promise<ExamOrder[]> {
  const url = new URL(`${biotestBaseUrl()}${entityPath("exam-order")}`);
  url.searchParams.set("filter.referrerAccountId", accountId);
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
