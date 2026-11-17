import "server-only";
import { cache } from "react";

// The exhibition dates in the header banner, and the day bookings open, come
// from the entry form's public settings (Exhibition Admin → Entry Form
// Settings), so they are set once per exhibition and the rota, entry form and
// Exhibition Home page always agree.
const SETTINGS_URL =
  process.env.ENTRY_SETTINGS_URL || "https://wvas-ex-entry.netlify.app/.netlify/functions/config";

export type BannerDate = { label: string; value: string };

type EntrySettings = Partial<
  Record<
    "entryOpens" | "entryOpensOn" | "entryCloses" | "handIn" | "privateView" | "exhibitionDates" | "collection",
    string
  >
>;

/** The entry form's settings; empty if they can't be read. */
const getEntrySettings = cache(async (): Promise<EntrySettings> => {
  try {
    const resp = await fetch(SETTINGS_URL, { next: { revalidate: 300 } });
    if (resp.ok) return await resp.json();
    console.error("Entry settings read failed:", resp.status);
  } catch (err) {
    console.error("Entry settings read failed:", err);
  }
  return {};
});

/** The banner's dates, in order; blank settings are left out. */
export async function getBannerDates(): Promise<BannerDate[]> {
  const s = await getEntrySettings();
  return [
    { label: "Entry Opens", value: s.entryOpens },
    { label: "Entry Closes", value: s.entryCloses },
    { label: "Hand-In", value: s.handIn },
    { label: "Private Preview", value: s.privateView },
    { label: "Exhibition Dates", value: s.exhibitionDates },
    { label: "Collect Unsold Work", value: s.collection },
  ]
    .map(d => ({ label: d.label, value: String(d.value ?? "").trim() }))
    .filter(d => d.value);
}

/** Bookings open on the day entries open: that day (yyyy-mm-dd) and its wording, if set. */
export async function getBookingOpens(): Promise<{ on: string; label: string } | null> {
  const s = await getEntrySettings();
  const on = String(s.entryOpensOn ?? "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(on)) return null;
  return { on, label: String(s.entryOpens ?? "").trim() || on };
}
