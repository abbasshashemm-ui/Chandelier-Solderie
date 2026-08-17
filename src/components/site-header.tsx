import Link from "next/link";
import { CartButton } from "./cart-button";
import { SiteLogo } from "./site-logo";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="site-header fixed top-0 left-0 right-0 z-50 grid min-h-[var(--cs-header-height)] grid-cols-[1fr_auto] items-center gap-2 px-3 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-8">
      <SiteLogo />

      <SiteNav />

      <div className="flex shrink-0 items-center justify-self-end gap-1 sm:gap-3">
        <CartButton />
        <Link
          href="/inquire"
          className="hidden min-h-10 items-center border border-line-strong px-5 font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-ivory transition hover:border-gold hover:text-gold-bright sm:inline-flex"
        >
          Inquire
        </Link>
      </div>
    </header>
  );
}
