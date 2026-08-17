import Link from "next/link";
import type { Collection, HomepagePromo, SiteSettings } from "@/lib/types";
import { buildGeneralWhatsAppUrl } from "@/lib/site-contact";
import { FeaturedCollections } from "./featured-collections";
import { HeroChandelier } from "./hero-chandelier";
import { InstagramFeed } from "./instagram-feed";
import { PromoRibbon } from "./promo-ribbon";
import { ShowroomCard } from "./showroom-card";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ValueBadges } from "./value-badges";

type HomeViewProps = {
  collections: Collection[];
  promo?: HomepagePromo | null;
  settings?: SiteSettings;
};

export function HomeView({
  collections,
  promo,
  settings,
}: HomeViewProps) {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        {/* Hero */}
        <section className="relative mx-auto flex w-full max-w-[1340px] flex-col items-center px-5 pb-16 pt-44 text-center sm:px-6 md:px-8 md:pb-20 md:pt-60">
          {/* Chandelier hanging from under the header, behind the copy */}
          <HeroChandelier />

          {/* Soft shade behind the copy for readability */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-28 z-0 h-[28rem] bg-[radial-gradient(ellipse_52%_46%_at_50%_48%,rgba(10,8,7,0.88),transparent_74%)] md:top-36"
          />

          {/* Light spilling from the chandelier over the shade */}
          <span aria-hidden className="cs-bloom cs-bloom--hero z-0" />

          <p className="reveal reveal-2 relative z-10 font-sans text-[0.625rem] uppercase tracking-[0.32em] text-white-gold [text-shadow:0_1px_18px_rgba(10,8,7,0.9),0_0_28px_rgba(10,8,7,0.55)] sm:text-[0.6875rem]">
            Luxury Lighting Atelier · Lebanon
          </p>

          <h1 className="reveal reveal-2 relative z-10 mt-5 max-w-3xl font-serif text-[2.5rem] font-normal leading-[1.05] text-ivory [text-shadow:0_2px_28px_rgba(10,8,7,0.85),0_0_40px_rgba(10,8,7,0.55)] sm:text-6xl md:text-7xl">
            The art of <em className="italic text-gold-bright">light</em>,
            <br />
            piece by piece.
          </h1>

          <p className="reveal reveal-3 relative z-10 mt-6 max-w-xl font-serif text-lg leading-relaxed text-muted sm:text-xl">
            Curated chandeliers, pendants and sculptural lighting — chosen to
            become the centerpiece of the rooms they illuminate.
          </p>

          <div className="reveal reveal-4 relative z-10 mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link href="/shop" className="btn btn--gold">
              Explore the Collection
            </Link>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              Inquire
            </a>
          </div>

          <div className="reveal reveal-4 relative z-10 mt-10 flex w-full justify-center pb-28 sm:mt-16 md:pb-8">
            <ValueBadges />
          </div>
        </section>

        {promo ? <PromoRibbon promo={promo} /> : null}

        {/* Featured collections */}
        <section className="mx-auto w-full max-w-[1340px] px-3 py-16 sm:px-4 md:px-8 md:py-20">
          <div className="mb-8 flex items-end justify-between gap-4 px-2 sm:px-0 md:mb-10">
            <div>
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                The Atelier
              </p>
              <h2 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-4xl">
                Featured Collections
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-2 pb-1 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition hover:text-gold-bright sm:inline-flex"
            >
              View All
              <span aria-hidden className="text-gold">
                →
              </span>
            </Link>
          </div>

          {collections.length > 0 ? (
            <FeaturedCollections collections={collections} />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center border border-line px-8 py-16 text-center">
              <p className="font-serif text-xl text-muted">
                Collections are being curated.
              </p>
              <p className="mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Publish collections in the studio to see them here
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/shop" className="btn btn--ghost w-full max-w-xs">
              View the Full Collection
            </Link>
          </div>
        </section>

        <InstagramFeed instagram={settings?.instagram} />

        <ShowroomCard showroom={settings?.showroom} />

        {/* Closing note */}
        <section className="border-t border-line">
          <div className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-5 py-16 text-center sm:px-6 md:py-20">
            <p className="font-castellar text-[0.6875rem] uppercase tracking-[0.3em] text-gold">
              Chandelier Solderie
            </p>
            <p className="mt-5 max-w-2xl font-serif text-2xl leading-snug text-ivory sm:text-3xl">
              Every room deserves a centerpiece.
              <em className="italic text-muted"> Let us help you find yours.</em>
            </p>
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--gold mt-8"
            >
              Start a Conversation
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
