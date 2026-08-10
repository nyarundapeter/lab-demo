import { z } from "zod";

// ── Catalog — lab-service, proxied read-only from DWS.07 ───────────────────
// Field names mirror Biotest/scaffold/DWS.07/SOLUTION.md `entities: lab-service`
// exactly, not re-derived.

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

// ── Accounts — the patient's own record, owned by this app ─────────────────
// Phone is required (not optional, unlike the dxp reference's guest account) —
// "My Bookings" filters exam-order by patientPhone, the same role guestEmail
// plays in apps/dxp's lib/dws-client.ts.

export const AccountSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  passwordHash: z.string(),
  createdAt: z.string(),
});
export type Account = z.infer<typeof AccountSchema>;

export const PublicAccountSchema = AccountSchema.omit({ passwordHash: true });
export type PublicAccount = z.infer<typeof PublicAccountSchema>;

export const SignUpInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignUpInput = z.infer<typeof SignUpInputSchema>;

export const SignInInputSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
export type SignInInput = z.infer<typeof SignInInputSchema>;

// ── Bookings — exam-order, proxied through to DWS.07 ────────────────────────
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
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type ExamOrder = z.infer<typeof ExamOrderSchema>;

// Submitted by an already-signed-in account — patientName/patientPhone come
// from the session, not re-entered (same "confirm, don't re-enter" pattern
// as apps/dxp's RequestInputSchema).
export const BookingInputSchema = z.object({
  serviceCode: z.string().min(1, "Choose a service"),
  department: DepartmentSchema,
  notes: z.string().optional(),
});
export type BookingInput = z.infer<typeof BookingInputSchema>;

// BioTest is single-site at launch (AD-04) — hardcoded, not user-selectable.
export const DEFAULT_SITE_ID = "upper-hill";
