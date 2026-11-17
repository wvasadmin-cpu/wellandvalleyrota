import Image from "next/image";
import { getBannerDates } from "@/lib/entry-settings";

export default async function SiteHeader() {
  const dates = await getBannerDates();

  return (
    <header className="bg-primary border-b-[3px] border-secondary">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-5">
        <Image
          src="/wvas-mark.jpg"
          alt="Welland Valley Art Society"
          width={72}
          height={72}
          className="flex-shrink-0 bg-white object-contain p-1"
          priority
        />
        <div>
          <p className="text-secondary text-[11px] tracking-[0.18em] uppercase mb-1">
            Welland Valley Art Society
          </p>
          <h1 className="font-display text-2xl text-primary-content font-normal leading-tight">
            Exhibition Stewarding Rota
          </h1>
        </div>
      </div>
      {dates.length > 0 && <div
        className="border-t border-primary-content/10"
        style={{ background: "var(--wvas-green-mid)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap">
          {dates.map((d, i) => (
            <div
              key={d.label}
              className={`px-3 py-2 flex-1 basis-1/2 sm:basis-auto min-w-0 ${
                i < dates.length - 1 ? "border-r border-primary-content/10" : ""
              }`}
            >
              <span className="block text-[9px] tracking-[0.10em] uppercase text-secondary mb-0.5 whitespace-nowrap">
                {d.label}
              </span>
              <span className="text-xs text-primary-content font-semibold whitespace-nowrap">
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>}
    </header>
  );
}
