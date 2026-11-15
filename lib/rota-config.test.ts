import { describe, it, expect } from "vitest";
import {
  getExhibitionDates,
  dayOffset,
  getSpecialDay,
  getShiftSpecialDay,
  isDayClosed,
  isoDate,
} from "./rota-config";

describe("rota-config", () => {
  it("calculates exhibition dates correctly", () => {
    const dates = getExhibitionDates("2026-09-28", "2026-09-30");
    expect(dates).toHaveLength(3);
    expect(isoDate(dates[0])).toBe("2026-09-28");
    expect(isoDate(dates[1])).toBe("2026-09-29");
    expect(isoDate(dates[2])).toBe("2026-09-30");
  });

  it("calculates day offsets correctly", () => {
    const start = "2026-09-28";
    expect(dayOffset(new Date(start + "T12:00:00"), start)).toBe(0);
    expect(dayOffset(new Date("2026-09-29T12:00:00"), start)).toBe(1);
  });

  // Autumn 2026: Hanging Day Mon 28 Sep, last day Mon 19 Oct.
  const autumn = { startDate: "2026-09-28", endDate: "2026-10-19" };
  const day = (iso: string) => new Date(iso + "T12:00:00");

  it("start date is Hanging Day with nothing bookable", () => {
    const d = day("2026-09-28");
    expect(getSpecialDay(d, autumn)).toBeNull();
    expect(isDayClosed(d, autumn)).toBe(false);
    expect(getShiftSpecialDay(d, autumn, "s1")).toMatchObject({ note: "Hanging Day", noBook: true });
    expect(getShiftSpecialDay(d, autumn, "s2")).toMatchObject({ note: "Hanging Day", noBook: true });
    expect(getShiftSpecialDay(d, autumn, "s3")?.noBook).toBe(true);
  });

  it("first Tuesday evening is a bookable Private Viewing", () => {
    const d = day("2026-09-29");
    const s3 = getShiftSpecialDay(d, autumn, "s3");
    expect(s3?.note).toBe("Private Viewing");
    expect(s3?.noBook).toBeFalsy();
    expect(getShiftSpecialDay(d, autumn, "s1")).toBeNull();
  });

  it("closes every Sunday", () => {
    for (const iso of ["2026-10-04", "2026-10-11", "2026-10-18"]) {
      expect(isDayClosed(day(iso), autumn)).toBe(true);
      expect(getSpecialDay(day(iso), autumn)?.label).toBe("Closed");
    }
  });

  it("last Saturday evening notes Customer Collection", () => {
    expect(getShiftSpecialDay(day("2026-10-17"), autumn, "s3")?.note)
      .toBe("Customer Collection from 4:00pm");
    expect(getShiftSpecialDay(day("2026-10-10"), autumn, "s3")).toBeNull();
  });

  it("last Monday: morning bookable for collection, rest Exhibition Closed", () => {
    const d = day("2026-10-19");
    expect(isDayClosed(d, autumn)).toBe(false);
    const s1 = getShiftSpecialDay(d, autumn, "s1");
    expect(s1?.note).toBe("Collection of unsold work");
    expect(s1?.noBook).toBeFalsy();
    expect(getShiftSpecialDay(d, autumn, "s2")).toMatchObject({ note: "Exhibition Closed", noBook: true });
    expect(getShiftSpecialDay(d, autumn, "s3")).toMatchObject({ note: "Exhibition Closed", noBook: true });
  });

  it("ordinary days have no rules", () => {
    const d = day("2026-09-30");
    expect(getSpecialDay(d, autumn)).toBeNull();
    expect(isDayClosed(d, autumn)).toBe(false);
    for (const s of ["s1", "s2", "s3"]) expect(getShiftSpecialDay(d, autumn, s)).toBeNull();
  });

  it("follows a different exhibition's own dates", () => {
    const spring = { startDate: "2027-04-12", endDate: "2027-05-03" };
    expect(getShiftSpecialDay(day("2027-04-12"), spring, "s1")?.note).toBe("Hanging Day");
    expect(getShiftSpecialDay(day("2027-04-13"), spring, "s3")?.note).toBe("Private Viewing");
    expect(isDayClosed(day("2027-04-18"), spring)).toBe(true);
    expect(getShiftSpecialDay(day("2027-05-01"), spring, "s3")?.note).toBe("Customer Collection from 4:00pm");
    expect(getShiftSpecialDay(day("2027-05-03"), spring, "s2")?.note).toBe("Exhibition Closed");
    // Autumn's offsets no longer leak into other exhibitions
    expect(getShiftSpecialDay(day("2027-04-14"), spring, "s3")).toBeNull();
  });
});
