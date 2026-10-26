import { formatPhone } from "@/lib/format";
import { fmtLong } from "@/lib/rota-config";
import type { Volunteer } from "@/lib/volunteers";

/** Alphabetical list of volunteers and their shifts; phones only when passed. */
export default function VolunteerList({
  volunteers,
  showPhones = false,
}: {
  volunteers: Volunteer[];
  showPhones?: boolean;
}) {
  return (
    <div className="divide-y divide-base-300">
      {volunteers.map(v => (
        <div key={v.name.toLowerCase()} className="py-4">
          <div className="font-semibold text-[15px] text-primary">
            {v.name}
          </div>
          {showPhones && v.phone && (
            <div className="text-sm text-base-content/70 mb-1.5">
              {/\d{5}/.test(v.phone.replace(/\s/g, "")) ? (
                <a href={`tel:${v.phone.replace(/[^\d+]/g, "")}`} className="tel-link underline decoration-dotted">
                  {formatPhone(v.phone)}
                </a>
              ) : (
                formatPhone(v.phone)
              )}
            </div>
          )}
          <div className="space-y-0.5 mt-1">
            {v.shifts.map((s, i) => (
              <div key={i} className="text-sm text-base-content/65 pl-2.5">
                {fmtLong(s.date)} · {s.shiftLabel}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
