/** Shown above the rota before bookings open. */
export default function BookingNotice({ opens }: { opens: string }) {
  return (
    <div className="border-2 border-secondary bg-base-200 px-6 py-4 flex items-center gap-4 mb-6">
      <span className="text-2xl flex-shrink-0" aria-hidden="true">🗓️</span>
      <div>
        <p className="font-display text-lg text-primary mb-1">Bookings open on {opens}</p>
        <p className="text-sm leading-relaxed">
          This is the rota for the coming exhibition. Have a look at the days and shift times
          and pencil dates into your diary — you’ll be able to sign up from {opens}.
        </p>
      </div>
    </div>
  );
}
