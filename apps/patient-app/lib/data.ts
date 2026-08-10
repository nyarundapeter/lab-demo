import { randomUUID } from "crypto";
import type { Account } from "./schemas";

// In-memory patient account store — deliberate, not an oversight. BioTest has
// no database provisioned yet (HLAD AD-07 / BIOTEST-G-01, still open). This is
// the same stage apps/dxp itself started at before migrating to Postgres (see
// that app's lib/auth.ts comment on its own history) — a real, working
// interim step, not a stub. Function shapes below match what a Postgres-backed
// version would expose, so swapping the implementation later is a small,
// isolated change, not a rewrite.
//
// Pinned to globalThis so accounts survive Next.js dev-mode hot reload.

interface AccountInput {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
}

const globalForData = globalThis as unknown as {
  __patientAccounts?: Map<string, Account>;
};

function store(): Map<string, Account> {
  return (globalForData.__patientAccounts ??= new Map());
}

export async function createAccount(input: AccountInput): Promise<Account> {
  const account: Account = {
    id: randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  store().set(account.id, account);
  return account;
}

export async function findAccountById(id: string): Promise<Account | null> {
  return store().get(id) ?? null;
}

export async function findAccountByEmail(email: string): Promise<Account | null> {
  for (const account of store().values()) {
    if (account.email.toLowerCase() === email.toLowerCase()) return account;
  }
  return null;
}
