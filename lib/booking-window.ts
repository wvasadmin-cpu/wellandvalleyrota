/** Today's date in the UK as yyyy-mm-dd. */
export function ukToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(now);
}

/** Bookings are open from the start of the opening day (UK time); no opening day means open. */
export function bookingIsOpen(opensOn: string | null | undefined, today: string = ukToday()): boolean {
  return !opensOn || today >= opensOn;
}
