import { NextRequest, NextResponse } from "next/server";
import { getCurrentAccount } from "@/lib/auth";
import {
  BiotestClientError,
  createBooking,
  listBookingsByPhone,
} from "@/lib/biotest-client";
import { BookingInputSchema, DEFAULT_SITE_ID } from "@/lib/schemas";

export async function GET() {
  const account = await getCurrentAccount();
  if (!account) return NextResponse.json({ error: "Sign in required" }, { status: 401 });

  try {
    const bookings = await listBookingsByPhone(account.phone);
    return NextResponse.json({ bookings });
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
  const parsed = BookingInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const booking = await createBooking({
      patientName: account.name,
      patientPhone: account.phone,
      department: parsed.data.department,
      serviceCode: parsed.data.serviceCode,
      siteId: DEFAULT_SITE_ID,
      ...(parsed.data.notes ? { notes: parsed.data.notes } : {}),
    });
    return NextResponse.json({ booking }, { status: 201 });
  } catch (err) {
    if (err instanceof BiotestClientError) {
      return NextResponse.json({ error: err.message, issues: err.issues }, { status: err.status });
    }
    throw err;
  }
}
