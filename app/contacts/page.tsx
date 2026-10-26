import { listExhibitions, getActiveExhibition } from "@/lib/exhibitions";
import { listBookings } from "@/lib/bookings";
import { listVolunteers } from "@/lib/volunteers";
import { hasContactsAccess } from "@/lib/contacts-access";
import { lockContactsAction } from "@/actions/contacts";
import { isHoldingNow } from "@/lib/holding";
import HoldingPage from "@/components/holding-page";
import ContactsUnlock from "@/components/contacts-unlock";
import VolunteerList from "@/components/volunteer-list";

export default async function ContactsPage() {
  if (await isHoldingNow()) return <HoldingPage />;

  // Nothing below is read or sent to the browser until the password is in.
  if (!(await hasContactsAccess())) return <ContactsUnlock />;

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

  const volunteers = listVolunteers(active, await listBookings(active.id));

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-1">
        <h2 className="font-display text-2xl text-primary">Contacts</h2>
        <form action={lockContactsAction}>
          <button type="submit" className="text-xs text-base-content/55 hover:text-primary underline">
            Lock
          </button>
        </form>
      </div>
      {active.title && (
        <p className="font-display text-base text-accent italic mb-1">
          {active.title}
        </p>
      )}
      <p className="text-sm text-base-content mb-6">
        Volunteers&apos; phone numbers, for members only — please don&apos;t
        share them. Use <em>Lock</em> if you&apos;re on a shared computer.
      </p>

      {volunteers.length === 0 ? (
        <p className="text-sm text-base-content/45 py-3">No bookings yet.</p>
      ) : (
        <VolunteerList volunteers={volunteers} showPhones />
      )}
    </div>
  );
}
