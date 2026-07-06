import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildGeneralWhatsAppUrl } from "@/lib/site-contact";
import { getInstagramUrl, getMailtoUrl } from "@/lib/site-contact";

export const metadata = {
  title: "Inquire",
  description:
    "Contact Chandelier Solderie for luxury lighting inquiries in Lebanon.",
};

export default function InquirePage() {
  return (
    <div className="page-shell min-h-screen pt-[var(--cs-header-height)]">
      <SiteHeader />

      <main className="mx-auto flex min-h-[calc(100vh-var(--cs-header-height))] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        <p className="font-castellar text-[0.7rem] uppercase tracking-[0.28em] text-[#a8893f]">
          Chandelier Solderie
        </p>
        <h1 className="mt-4 font-serif text-3xl font-medium text-[#1a1a1a] md:text-4xl">
          Begin Your Inquiry
        </h1>
        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent" />
        <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-[#555]">
          Share your vision with us — we will guide you through our curated
          collection and bespoke lighting options.
        </p>

        <div className="mt-10 flex w-full max-w-sm flex-col gap-3">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-12 items-center justify-center bg-gradient-to-r from-[#c9a962] to-[#a8893f] px-6 py-3.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white shadow-[0_10px_32px_rgba(201,169,98,0.35)] transition hover:from-[#d4bc7a] hover:to-[#c9a962]"
          >
            WhatsApp Inquiry
          </a>
          <a
            href={getMailtoUrl()}
            className="flex min-h-11 items-center justify-center border border-[#c9a962]/35 bg-white/50 px-6 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962]"
          >
            Email Us
          </a>
          <a
            href={getInstagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center border border-[#c9a962]/35 bg-white/50 px-6 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962]"
          >
            Instagram
          </a>
        </div>

        <Link
          href="/shop"
          className="mt-8 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#777] transition hover:text-[#c9a962]"
        >
          Browse the collection
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
