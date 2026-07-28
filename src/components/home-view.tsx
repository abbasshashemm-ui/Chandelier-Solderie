import Link from "next/link";
import type { Product } from "@/lib/types";
import { buildGeneralWhatsAppUrl, siteContact } from "@/lib/site-contact";
import { HeroChandelier } from "./hero-chandelier";
import { ProductGrid } from "./product-grid";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type HomeViewProps = {
  products: Product[];
};

const hallmarks = [
  {
    title: "Curated Collection",
    copy: "Crystal, brass and modern pieces, selected one by one.",
  },
  {
    title: "Showroom in Lebanon",
    copy: siteContact.location,
  },
  {
    title: "Personal Service",
    copy: "Advice and quotes, directly on WhatsApp.",
  },
] as const;

export function HomeView({ products }: HomeViewProps) {
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

          <p className="reveal reveal-2 relative z-10 font-sans text-[0.625rem] uppercase tracking-[0.32em] text-gold sm:text-[0.6875rem]">
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

          <dl className="reveal reveal-4 relative z-10 mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 border-y border-line py-5 pb-28 sm:mt-16 sm:grid-cols-3 sm:gap-4 sm:py-8 md:pb-8">
            {hallmarks.map((item) => (
              <div key={item.title} className="px-2">
                <dt className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold sm:text-[0.625rem]">
                  {item.title}
                </dt>
                <dd className="mt-1.5 font-serif text-sm leading-snug text-muted sm:mt-2 sm:text-base">
                  {item.copy}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Featured pieces */}
        <section className="mx-auto w-full max-w-[1340px] px-3 pb-16 sm:px-4 md:px-8 md:pb-20">
          <div className="mb-8 flex items-end justify-between gap-4 px-2 sm:px-0 md:mb-10">
            <div>
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                The Collection
              </p>
              <h2 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-4xl">
                Featured Pieces
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

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center border border-line px-8 py-16 text-center">
              <p className="font-serif text-xl text-muted">
                The collection is being curated.
              </p>
              <p className="mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                Publish products in the studio to see them here
              </p>
            </div>
          )}

          <div className="mt-8 flex justify-center sm:hidden">
            <Link href="/shop" className="btn btn--ghost w-full max-w-xs">
              View the Full Collection
            </Link>
          </div>
        </section>

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
