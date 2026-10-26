import { describe, it, expect } from "vitest";
import { contactsToken, passwordMatches, tokenMatches } from "./contacts-password";

describe("passwordMatches", () => {
  it("accepts the password, ignoring case and surrounding spaces", () => {
    expect(passwordMatches("Palette", "palette")).toBe(true);
    expect(passwordMatches("  PALETTE ", "palette")).toBe(true);
  });

  it("rejects a wrong password", () => {
    expect(passwordMatches("brush", "palette")).toBe(false);
  });

  it("rejects everything when no password is configured", () => {
    expect(passwordMatches("", undefined)).toBe(false);
    expect(passwordMatches("", "")).toBe(false);
    expect(passwordMatches("  ", "  ")).toBe(false);
  });
});

describe("tokenMatches", () => {
  it("accepts a token made from the current password", () => {
    expect(tokenMatches(contactsToken("palette"), "Palette")).toBe(true);
  });

  it("rejects a token from an old password, junk, or a missing cookie", () => {
    expect(tokenMatches(contactsToken("old"), "palette")).toBe(false);
    expect(tokenMatches("junk", "palette")).toBe(false);
    expect(tokenMatches(undefined, "palette")).toBe(false);
  });
});
