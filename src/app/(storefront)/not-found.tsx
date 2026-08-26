import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />

      <main className="mx-auto flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] max-w-lg flex-col items-center justify-center px-6 pb-16 pt-[var(--cs-header-height)] text-center">
        <p className="font-castellar text-[0.6875rem] uppercase tracking-[0.3em] text-gold">
          404
        </p>
        <h1 className="mt-4 font-serif text-4xl font-normal text-ivory">
          The lights are out here
        </h1>
        <p className="mt-4 font-serif text-lg text-muted">
          This piece may have been moved or is no longer in our collection.
        </p>
        <Link href="/shop" className="btn btn--ghost mt-9">
          Return to the Collection
        </Link>
      </main>

      <SiteFooter />
    </div>
  );
}
