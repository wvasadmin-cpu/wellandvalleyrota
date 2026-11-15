/**
 * Rota configuration: date helpers, special-day rules, and formatting utilities.
 *
 * Intentionally NOT server-only so client components (the interactive shift
 * picker) can import the pure date helpers alongside server components.
 *
 * Special days follow the standard WVAS exhibition pattern and are worked out
 * from each exhibition's own start/end dates (see specialDayEntries):
 *   - start date (a Monday): Hanging Day, no booking
 *   - day after the start (a Tuesday): evening slot is the Private Viewing
 *   - every Sunday: closed
 *   - last Saturday: Customer Collection from 4:00pm (evening slot)
 *   - end date (a Monday): morning slot is collection of unsold work; the
 *     afternoon and evening slots are Exhibition Closed, no booking
 */

export type SpecialDayClosed = { type: "closed"; label: string };
export type SpecialDaySlotNote = {
  type: "slot-note";
  shiftId: string;
  note: string;
  noBook?: boolean;
};
export type SpecialDay = SpecialDayClosed | SpecialDaySlotNote;

/** The exhibition dates the special-day rules are worked out from. */
export type ExhibitionDates = { startDate: string; endDate: string };

/** All special-day rules that apply to date `d` of the exhibition `ex`. */
export function specialDayEntries(d: Date, ex: ExhibitionDates): SpecialDay[] {
  const offset    = dayOffset(d, ex.startDate);
  const fromEnd   = dayOffset(new Date(ex.endDate + "T12:00:00"), isoDate(d));
  const isSunday  = d.getDay() === 0;
  const isLastSat = d.getDay() === 6 && fromEnd >= 0 && fromEnd < 7;

  if (offset === 0) {
    return [
      { type: "slot-note", shiftId: "s1", note: "Hanging Day", noBook: true },
      { type: "slot-note", shiftId: "s2", note: "Hanging Day", noBook: true },
      { type: "slot-note", shiftId: "s3", note: "Closed",      noBook: true },
    ];
  }
  if (fromEnd === 0) {
    return [
      { type: "slot-note", shiftId: "s1", note: "Collection of unsold work" },
      { type: "slot-note", shiftId: "s2", note: "Exhibition Closed", noBook: true },
      { type: "slot-note", shiftId: "s3", note: "Exhibition Closed", noBook: true },
    ];
  }
  if (isSunday) return [{ type: "closed", label: "Closed" }];
  if (offset === 1) {
    return [{ type: "slot-note", shiftId: "s3", note: "Private Viewing" }];
  }
  if (isLastSat) {
    return [{ type: "slot-note", shiftId: "s3", note: "Customer Collection from 4:00pm" }];
  }
  return [];
}

/** All dates (inclusive) from startDate to endDate. */
export function getExhibitionDates(startDate: string, endDate: string): Date[] {
  const dates: Date[] = [];
  const cur = new Date(startDate + "T12:00:00");
  const end = new Date(endDate   + "T12:00:00");
  while (cur <= end) {
    dates.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

export function dayOffset(d: Date, startDate: string): number {
  const start = new Date(startDate + "T12:00:00");
  return Math.round((d.getTime() - start.getTime()) / 86_400_000);
}

export function getSpecialDay(d: Date, ex: ExhibitionDates): SpecialDayClosed | null {
  const closed = specialDayEntries(d, ex).find(e => e.type === "closed");
  return (closed as SpecialDayClosed) ?? null;
}

export function isDayClosed(d: Date, ex: ExhibitionDates): boolean {
  return specialDayEntries(d, ex).some(e => e.type === "closed");
}

export function getShiftSpecialDay(d: Date, ex: ExhibitionDates, shiftId: string): SpecialDaySlotNote | null {
  const match = specialDayEntries(d, ex).find(e => e.type === "slot-note" && e.shiftId === shiftId);
  return (match as SpecialDaySlotNote) ?? null;
}

export function isoDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

export function fmtLong(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "long",
  });
}

export function fmtShort(d: Date): string {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function fmtWday(d: Date): string {
  return d.toLocaleDateString("en-GB", { weekday: "short" });
}
