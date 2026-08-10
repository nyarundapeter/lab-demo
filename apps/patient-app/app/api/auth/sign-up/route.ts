import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSession, SESSION_COOKIE, toPublicAccount } from "@/lib/auth";
import { hashPassword } from "@/lib/crypto";
import { createAccount, findAccountByEmail } from "@/lib/data";
import { SignUpInputSchema } from "@/lib/schemas";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = SignUpInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const { name, email, phone, password } = parsed.data;

  if (await findAccountByEmail(email)) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: { email: ["An account with this email already exists — sign in instead."] },
      },
      { status: 422 },
    );
  }

  const account = await createAccount({ name, email, phone, passwordHash: hashPassword(password) });
  const token = await createSession(account.id);

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ account: toPublicAccount(account) }, { status: 201 });
}
