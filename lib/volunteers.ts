import {
  getExhibitionDates,
  getSpecialDay,
  isDayClosed,
  isoDate,
  type SpecialDaySlotNote,
} from "./rota-config";
import { SHIFTS } from "./shifts";
import type { Booking, Exhibition } from "./types";

export type Volunteer = {
  name:   string;
  phone:  string;
  shifts: { date: Date; shiftLabel: string }[];
};

/**
 * One entry per volunteer (matched by name) with all their bookable shifts,
 * sorted by surname then first name, each person's shifts in date order.
 */
export function listVolunteers(
  exhibition: Pick<Exhibition, "startDate" | "endDate">,
  bookings: Booking[],
): Volunteer[] {
  const people: Record<string, Volunteer> = {};

  getExhibitionDates(exhibition.startDate, exhibition.endDate).forEach(d => {
    if (isDayClosed(d, exhibition.startDate)) return;
    const dk = isoDate(d);
    SHIFTS.forEach(shift => {
      const sp = getSpecialDay(d, exhibition.startDate);
      if (
        sp?.type === "slot-note" &&
        sp.shiftId === shift.id &&
        (sp as SpecialDaySlotNote).noBook
      ) return;

      bookings
        .filter(b => b.date === dk && b.shiftId === shift.id)
        .forEach(b => {
          const key = b.name.trim().toLowerCase();
          if (!people[key]) {
            people[key] = { name: b.name.trim(), phone: b.phone.trim(), shifts: [] };
          }
          people[key].shifts.push({ date: d, shiftLabel: shift.label });
        });
    });
  });

  const surname = (n: string) =>
    n.trim().split(/\s+/).slice(-1)[0].toLowerCase();
  const firstName = (n: string) =>
    n.trim().split(/\s+/)[0].toLowerCase();

  const entries = Object.values(people);
  entries.sort((a, b) => {
    const sa = surname(a.name),   sb = surname(b.name);
    if (sa !== sb) return sa < sb ? -1 : 1;
    return firstName(a.name) < firstName(b.name) ? -1 : 1;
  });
  entries.forEach(e => e.shifts.sort((a, b) => a.date.getTime() - b.date.getTime()));
  return entries;
}
