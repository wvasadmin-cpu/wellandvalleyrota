import { createHash, timingSafeEqual } from "crypto";

/**
 * The contacts list is unlocked with the Exhibitors' password. Matching is
 * forgiving (trimmed, case-insensitive) — this is a courtesy gate, not
 * real security.
 */
function normalise(password: string): string {
  return password.trim().toLowerCase();
}

/** Cookie value proving the password was entered. Changes if the password does. */
export function contactsToken(password: string): string {
  return createHash("sha256").update(`wvas-contacts:${normalise(password)}`).digest("hex");
}

export function passwordMatches(input: string, expected: string | undefined): boolean {
  if (!expected || !normalise(expected)) return false;
  const a = Buffer.from(contactsToken(input));
  const b = Buffer.from(contactsToken(expected));
  return timingSafeEqual(a, b);
}

export function tokenMatches(token: string | undefined, expected: string | undefined): boolean {
  if (!token || !expected || !normalise(expected)) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(contactsToken(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}
