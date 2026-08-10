import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

// Demo-grade password hashing — real scrypt KDF, not plaintext, but no rate
// limiting / pepper / rotation. Fine for an account system that only needs to
// prove "sign-in gates repeat requests," not for a production credential store.

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, derivedHex] = stored.split(":");
  if (!salt || !derivedHex) return false;
  const derived = scryptSync(password, salt, KEY_LENGTH);
  const expected = Buffer.from(derivedHex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}
