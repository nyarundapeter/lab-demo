import { randomUUID } from "crypto";
import type { Account, PartnerRole } from "./schemas";

// In-memory partner account store — same deliberate choice as patient-app/
// lib/data.ts (BIOTEST-G-01, no database provisioned yet). Same function
// shapes a Postgres-backed version would expose.

interface AccountInput {
  name: string;
  email: string;
  role: PartnerRole;
  practiceName?: string;
  passwordHash: string;
}

const globalForData = globalThis as unknown as {
  __partnerAccounts?: Map<string, Account>;
};

function store(): Map<string, Account> {
  return (globalForData.__partnerAccounts ??= new Map());
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
