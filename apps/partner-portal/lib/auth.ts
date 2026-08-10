import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { findAccountById } from "./data";
import type { Account, PublicAccount } from "./schemas";

export const SESSION_COOKIE = "biotest_partner_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

interface SessionRecord {
  accountId: string;
  expiresAt: number;
}

const globalForAuth = globalThis as unknown as {
  __partnerSessions?: Map<string, SessionRecord>;
};

function sessionStore(): Map<string, SessionRecord> {
  return (globalForAuth.__partnerSessions ??= new Map());
}

export async function createSession(accountId: string): Promise<string> {
  const token = randomBytes(24).toString("hex");
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  sessionStore().set(token, { accountId, expiresAt });
  return token;
}

export async function destroySession(token: string): Promise<void> {
  sessionStore().delete(token);
}

export async function getCurrentAccount(): Promise<Account | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const record = sessionStore().get(token);
  if (!record || record.expiresAt < Date.now()) {
    if (record) sessionStore().delete(token);
    return null;
  }

  return (await findAccountById(record.accountId)) ?? null;
}

export function toPublicAccount(account: Account): PublicAccount {
  const { passwordHash: _passwordHash, ...publicAccount } = account;
  return publicAccount;
}
