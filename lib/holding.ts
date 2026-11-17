import "server-only";
import { auth } from "@/lib/auth";
import { getBookingOpens } from "@/lib/entry-settings";
import { bookingIsOpen } from "@/lib/booking-window";

// Before bookings open, the rota is shown read-only so members can see the
// days and shifts and pencil dates in. Signed-in committee members can still
// book early. The opening day is "Entries Open On" in Entry Form Settings.

/** Null when bookings are open; otherwise the wording of the day they open. */
export async function bookingOpensLabel(): Promise<string | null> {
  const opens = await getBookingOpens();
  if (bookingIsOpen(opens?.on)) return null;
  const session = await auth();
  return session?.user ? null : opens!.label;
}
