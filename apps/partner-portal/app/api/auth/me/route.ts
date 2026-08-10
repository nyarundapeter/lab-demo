import { NextResponse } from "next/server";
import { getCurrentAccount, toPublicAccount } from "@/lib/auth";

export async function GET() {
  const account = await getCurrentAccount();
  if (!account) return NextResponse.json({ account: null });
  return NextResponse.json({ account: toPublicAccount(account) });
}
