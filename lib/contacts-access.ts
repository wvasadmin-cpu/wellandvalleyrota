import "server-only";
import { cookies } from "next/headers";
import { contactsToken, passwordMatches, tokenMatches } from "./contacts-password";

const COOKIE = "wvas_contacts";
const MAX_AGE = 60 * 60 * 24 * 90; // 90 days

export async function hasContactsAccess(): Promise<boolean> {
  const jar = await cookies();
  return tokenMatches(jar.get(COOKIE)?.value, process.env.CONTACTS_PASSWORD);
}

/** Sets the access cookie if the password is right. Returns whether it was. */
export async function grantContactsAccess(password: string): Promise<boolean> {
  if (!passwordMatches(password, process.env.CONTACTS_PASSWORD)) return false;
  const jar = await cookies();
  jar.set(COOKIE, contactsToken(password), {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "lax",
    path:     "/",
    maxAge:   MAX_AGE,
  });
  return true;
}

export async function revokeContactsAccess(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
