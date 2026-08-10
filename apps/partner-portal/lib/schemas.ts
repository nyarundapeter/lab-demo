import { z } from "zod";

// ── Catalog — lab-service, proxied read-only from DWS.07 ───────────────────
// Same shape as patient-app/lib/schemas.ts — not shared code between apps
// (deliberate, per the dxp/dws precedent: each app owns its own copy).

export const DepartmentSchema = z.enum([
  "imaging",
  "diagnostic-procedures",
  "sample-collection",
  "back-office",
]);
export type Department = z.infer<typeof DepartmentSchema>;

export const DEPARTMENT_LABELS: Record<Department, string> = {
  imaging: "Imaging & Radiology",
  "diagnostic-procedures": "Diagnostic Procedures",
  "sample-collection": "Sample Collection",
  "back-office": "Back Office",
};

export const LabServiceSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  summary: z.string().min(1),
  department: DepartmentSchema,
  status: z.enum(["active", "draft"]),
  code: z.string().min(1),
  slaTargetHours: z.number().positive(),
});
export type LabService = z.infer<typeof LabServiceSchema>;

// ── Accounts — the referring clinician's own record, owned by this app ─────
// AD-03: two flat roles, no hierarchy — `role` is descriptive (who's behind
// the login), never a permission gate. Both roles get identical rights.
// `practiceName` is nullable/optional on purpose: a standalone account (a
// solo consultant, or an independent referral coordinator with no linked
// practice) is a valid, first-class state, not an error.

export const PartnerRoleSchema = z.enum(["consultant", "front-desk"]);
export type PartnerRole = z.infer<typeof PartnerRoleSchema>;

export const ROLE_LABELS: Record<PartnerRole, string> = {
  consultant: "Doctor / Consultant",
  "front-desk": "Referral Front Desk",
};

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  role: PartnerRoleSchema,
  practiceName: z.string().optional(),
  passwordHash: z.string(),
  createdAt: z.string(),
});
export type Account = z.infer<typeof AccountSchema>;

export const PublicAccountSchema = AccountSchema.omit({ passwordHash: true });
export type PublicAccount = z.infer<typeof PublicAccountSchema>;

export const SignUpInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  role: PartnerRoleSchema,
  practiceName: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignUpInput = z.infer<typeof SignUpInputSchema>;

export const SignInInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type SignInInput = z.infer<typeof SignInInputSchema>;

// ── Referrals — exam-order, proxied through to DWS.07 ───────────────────────
// Status enum mirrors the real entity exactly — no pending-approval/approved/
// rejected states exist (AD-02: no internal review gate).

export const ExamOrderStatusSchema = z.enum([
  "in-progress",
  "released",
  "recapture-requested",
]);
export type ExamOrderStatus = z.infer<typeof ExamOrderStatusSchema>;

export const EXAM_ORDER_STATUS_LABELS: Record<ExamOrderStatus, string> = {
  "in-progress": "In Progress",
  released: "Released",
  "recapture-requested": "Recapture Requested",
};

export const ExamOrderSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  patientPhone: z.string(),
  source: z.enum(["walk-in", "dxp", "referral"]),
  department: DepartmentSchema,
  serviceCode: z.string(),
  siteId: z.string(),
  status: ExamOrderStatusSchema,
  technicianId: z.string().optional(),
  releasedAt: z.string().optional(),
  notes: z.string().optional(),
  referrerAccountId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ExamOrder = z.infer<typeof ExamOrderSchema>;

// Submitted by an already-signed-in Partner account, but ON BEHALF OF a
// patient — unlike patient-app's BookingInputSchema, patient name/phone are
// NOT pulled from the session. The account holder isn't the patient.
export const ReferralInputSchema = z.object({
  serviceCode: z.string().min(1, "Choose a service"),
  department: DepartmentSchema,
  patientName: z.string().min(1, "Patient name is required"),
  patientPhone: z.string().min(7, "Enter a valid phone number"),
  notes: z.string().optional(),
});
export type ReferralInput = z.infer<typeof ReferralInputSchema>;

// BioTest is single-site at launch (AD-04) — hardcoded, not user-selectable.
export const DEFAULT_SITE_ID = "upper-hill";
