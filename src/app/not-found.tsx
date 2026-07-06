import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />

      <main className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-6 pb-16 pt-[var(--cs-header-height)] text-center">
        <p className="font-castellar text-[0.7rem] uppercase tracking-[0.28em] text-[#a8893f]">
          404
        </p>
        <h1 className="mt-4 font-serif text-3xl font-medium text-[#1a1a1a]">
          Piece not found
        </h1>
        <p className="mt-4 font-serif text-lg text-[#555]">
          This lighting piece may have been moved or is no longer in our
          collection.
        </p>
        <Link
          href="/shop"
          className="mt-8 min-h-11 border border-[#c9a962]/35 bg-white/50 px-8 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962]"
        >
          Return to the collection
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
