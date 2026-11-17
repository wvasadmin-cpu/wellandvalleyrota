import { describe, it, expect } from "vitest";
import { bookingIsOpen, ukToday } from "./booking-window";

describe("bookingIsOpen", () => {
  it("is closed before the opening day", () => {
    expect(bookingIsOpen("2027-03-21", "2027-03-20")).toBe(false);
  });

  it("is open on and after the opening day", () => {
    expect(bookingIsOpen("2027-03-21", "2027-03-21")).toBe(true);
    expect(bookingIsOpen("2027-03-21", "2027-04-02")).toBe(true);
  });

  it("is open when no opening day is set", () => {
    expect(bookingIsOpen(null, "2027-03-20")).toBe(true);
    expect(bookingIsOpen("", "2027-03-20")).toBe(true);
  });
});

describe("ukToday", () => {
  it("uses UK time, so just after midnight BST is already the next day", () => {
    expect(ukToday(new Date("2027-04-01T23:30:00Z"))).toBe("2027-04-02");
  });

  it("matches UTC in winter", () => {
    expect(ukToday(new Date("2027-01-10T23:30:00Z"))).toBe("2027-01-10");
  });
});
