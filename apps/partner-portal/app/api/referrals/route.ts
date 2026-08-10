import { NextRequest, NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth";
import {
  BiotestClientError,
  createReferral,
  listReferralsByAccountId,
} from "@/lib/biotest-client";
import { DEFAULT_SITE_ID, ReferralInputSchema } from "@/lib/schemas";

export async function GET() {
  const account = await getCurrentAccount();
  if (!account) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  try {
    const referrals = await listReferralsByAccountId(account.id);
    return NextResponse.json({ referrals });
  } catch (err) {
    if (err instanceof BiotestClientError) {
      return NextResponse.json({ error: err.message, issues: err.issues }, { status: err.status });
    }
    throw err;
  }
}

export async function POST(req: NextRequest) {
  const account = await getCurrentAccount();
  if (!account) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  const body = await req.json();
  const parsed = ReferralInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const referral = await createReferral({
      patientName: parsed.data.patientName,
      patientPhone: parsed.data.patientPhone,
      department: parsed.data.department,
      serviceCode: parsed.data.serviceCode,
      siteId: DEFAULT_SITE_ID,
      referrerAccountId: account.id,
      ...(parsed.data.notes ? { notes: parsed.data.notes } : {}),
    });
    return NextResponse.json({ referral }, { status: 201 });
  } catch (err) {
    if (err instanceof BiotestClientError) {
      return NextResponse.json({ error: err.message, issues: err.issues }, { status: err.status });
    }
    throw err;
  }
}
