import { listExhibitions, getActiveExhibition } from "@/lib/exhibitions";
import { listBookings } from "@/lib/bookings";
import { listVolunteers } from "@/lib/volunteers";
import { isHoldingNow } from "@/lib/holding";
import HoldingPage from "@/components/holding-page";
import VolunteerList from "@/components/volunteer-list";

export default async function BookedPage() {
  if (await isHoldingNow()) return <HoldingPage />;

  const exhibitions = await listExhibitions();
  const active      = getActiveExhibition(exhibitions);

  if (!active) {
    return (
      <div className="border border-base-300 bg-base-200 p-10 text-center">
        <h2 className="font-display text-2xl text-primary mb-2">
          No Exhibition Scheduled
        </h2>
        <p className="text-base-content/60">Check back soon.</p>
      </div>
    );
  }

  // Phone numbers stay on the server — they're only shown on the Contacts tab.
  const volunteers = listVolunteers(active, await listBookings(active.id))
    .map(v => ({ ...v, phone: "" }));

  if (volunteers.length === 0) {
    return (
      <div>
        <h2 className="font-display text-2xl text-primary mb-2">
          Who&apos;s Booked
        </h2>
        <p className="text-sm text-base-content/45 py-3">No bookings yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl text-primary mb-1">
        Who&apos;s Booked
      </h2>
      {active.title && (
        <p className="font-display text-base text-accent italic mb-1">
          {active.title}
        </p>
      )}
      <p className="text-sm text-base-content mb-6">
        All volunteers who have committed, listed alphabetically by surname.
        Phone numbers are on the <strong>Contacts</strong> tab.
      </p>

      <VolunteerList volunteers={volunteers} />
    </div>
  );
}
