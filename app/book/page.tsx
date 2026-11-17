import { listExhibitions, getActiveExhibition } from "@/lib/exhibitions";
import { listBookings } from "@/lib/bookings";
import { bookingOpensLabel } from "@/lib/holding";
import BookingNotice from "@/components/booking-notice";
import BookAShift from "@/components/book-a-shift";

export default async function BookPage() {
  const exhibitions = await listExhibitions();
  const active      = getActiveExhibition(exhibitions);

  if (!active) {
    return (
      <div className="border border-base-300 bg-base-200 p-10 text-center">
        <h2 className="font-display text-2xl text-primary mb-2">
          No Exhibition Scheduled
        </h2>
        <p className="text-base-content/60">
          Check back soon, or contact the society for details.
        </p>
      </div>
    );
  }

  // Phone numbers stay on the server — they're only shown on the Contacts tab.
  const bookings = (await listBookings(active.id)).map(b => ({ ...b, phone: "" }));
  const opens    = await bookingOpensLabel();
  return (
    <>
      {opens && <BookingNotice opens={opens} />}
      <BookAShift exhibition={active} bookings={bookings} opensLabel={opens} />
    </>
  );
}
