"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildGeneralWhatsAppUrl } from "@/lib/site-contact";

const NAV_ITEMS = [
  { href: "/", label: "Home", external: false },
  { href: "/shop", label: "Shop", external: false },
  {
    href: buildGeneralWhatsAppUrl(),
    label: "Inquire",
    external: true,
  },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-bottom-nav liquid-glass fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active =
          !item.external &&
          (item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`));

        const className = `flex min-h-[var(--cs-mobile-nav-bar)] flex-col items-center justify-center gap-0.5 px-1 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.1em] transition ${
          active ? "text-[#c9a962]" : "text-[#666]"
        }`;

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              <span className="h-0.5 w-5 bg-transparent" aria-hidden />
              {item.label}
            </a>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={className}
          >
            <span
              className={`h-0.5 w-5 ${active ? "bg-[#c9a962]" : "bg-transparent"}`}
              aria-hidden
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
