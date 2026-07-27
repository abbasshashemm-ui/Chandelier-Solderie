import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildGeneralWhatsAppUrl, getInstagramUrl } from "@/lib/site-contact";

export const metadata = {
  title: "Inquire",
  description:
    "Contact Chandelier Solderie for luxury lighting inquiries in Lebanon.",
};

export default function InquirePage() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />

      <main className="mx-auto flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height)-var(--cs-mobile-nav-height))] max-w-2xl flex-col items-center justify-center px-5 pb-12 pt-[var(--cs-header-height)] text-center sm:px-6 md:pb-20">
        <div aria-hidden>
          <div className="hero-cord" />
          <div className="hero-jewel" />
        </div>

        <p className="mt-8 font-castellar text-[0.6875rem] uppercase tracking-[0.3em] text-gold">
          Chandelier Solderie
        </p>
        <h1 className="mt-4 font-serif text-4xl font-normal text-ivory md:text-5xl">
          Begin Your <em className="italic text-gold-bright">Inquiry</em>
        </h1>
        <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-muted">
          Share your vision with us — we will guide you through our curated
          collection and bespoke lighting options.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--gold"
          >
            WhatsApp Inquiry
          </a>
          <a
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost"
          >
            Instagram
          </a>
        </div>

        <Link
          href="/shop"
          className="mt-10 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-faint transition hover:text-gold-bright"
        >
          Browse the collection
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
