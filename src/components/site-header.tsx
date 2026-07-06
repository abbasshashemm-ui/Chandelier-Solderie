import { SiteHeaderActions } from "./site-header-actions";
import { SiteLogo } from "./site-logo";
import { SiteNav } from "./site-nav";

export function SiteHeader() {
  return (
    <header className="site-header liquid-glass liquid-glass--header fixed top-0 left-0 right-0 z-50 grid h-[var(--cs-header-height)] grid-cols-[1fr_auto] items-center gap-2 px-3 sm:px-5 md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-8">
      <SiteLogo />

      <SiteNav />

      <SiteHeaderActions className="justify-self-end" />
    </header>
  );
}
