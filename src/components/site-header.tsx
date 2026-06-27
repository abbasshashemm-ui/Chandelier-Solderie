import Link from "next/link";
import { GlassPanel } from "./glass-panel";

export function SiteHeader() {
  return (
    <GlassPanel
      as="header"
      variant="dark"
      className="sticky top-3 z-50 mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-5 md:top-4 md:px-6"
    >
      <Link
        href="/"
        className="font-serif text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:text-[#c9a962]"
      >
        Chandelier Solderie
      </Link>

      <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
        {[
          { href: "/", label: "Home" },
          { href: "/shop", label: "Shop" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.14em] text-white/85 transition hover:bg-white/10 hover:text-[#c9a962]"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/shop"
        className="rounded-full px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-white/85 transition hover:text-[#c9a962]"
      >
        Inquire
      </Link>
    </GlassPanel>
  );
}
