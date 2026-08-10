import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, toPublicAccount } from "@/lib/auth";
import { verifyPassword } from "@/lib/crypto";
import { findAccountByEmail } from "@/lib/data";
import { SignInInputSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = SignInInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { email, password } = parsed.data;
  const account = await findAccountByEmail(email);

  if (!account || !verifyPassword(password, account.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSession(account.id);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ account: toPublicAccount(account) });
}
