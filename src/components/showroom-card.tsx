import Image from "next/image";
import { buildGeneralWhatsAppUrl, siteContact } from "@/lib/site-contact";
import type { SiteSettings } from "@/lib/types";
import { MapPinIcon, WhatsAppIcon } from "./social-icons";

type ShowroomCardProps = {
  showroom?: SiteSettings["showroom"];
};

export function ShowroomCard({ showroom }: ShowroomCardProps) {
  const address = siteContact.location;
  const query = showroom?.mapQuery?.trim() || `${address}, Lebanon`;
  const encoded = encodeURIComponent(query);
  const photos = (showroom?.photos ?? []).slice(0, 4);

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1340px] px-5 py-16 sm:px-6 md:px-8 md:py-20">
        <div className="mb-8 md:mb-10">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
            Visit Us
          </p>
          <h2 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-4xl">
            {showroom?.heading?.trim() || "The Showroom"}
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          <div className="showroom-map relative min-h-[17rem] overflow-hidden border border-line bg-ink-deep lg:min-h-[22rem]">
            <iframe
              title={`Map to ${address}`}
              src={`https://www.google.com/maps?q=${encoded}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>

          <div className="flex flex-col justify-between gap-6 border border-line bg-surface p-5 sm:p-7">
            <div>
              <p className="inline-flex items-start gap-2.5 font-sans text-[0.625rem] uppercase tracking-[0.2em] text-gold">
                <MapPinIcon className="mt-px size-3.5 shrink-0" />
                Forn Chebek, Lebanon
              </p>

              <p className="mt-4 font-serif text-xl leading-snug text-ivory sm:text-2xl">
                {address}
              </p>

              <p className="mt-4 font-serif text-base leading-relaxed text-muted">
                {showroom?.body?.trim() ||
                  "See the pieces lit in person — crystal, brass and glass read differently under real light. Message us and we will have them ready for your visit."}
              </p>
            </div>

            {photos.length > 0 ? (
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {photos.map((photo, index) => (
                  <div
                    key={photo.imageUrl}
                    className="group relative aspect-[4/3] overflow-hidden border border-line bg-ink-deep"
                  >
                    <Image
                      src={photo.imageUrl}
                      alt={photo.imageAlt ?? `Showroom view ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 45vw, 20vw"
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                      placeholder={photo.imageLqip ? "blur" : "empty"}
                      blurDataURL={photo.imageLqip}
                    />
                    <span aria-hidden className="cs-bloom cs-bloom--card" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encoded}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold flex-1"
              >
                Get Directions
              </a>
              <a
                href={buildGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost inline-flex flex-1 items-center justify-center gap-2"
              >
                <WhatsAppIcon className="size-3.5" />
                Message Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
