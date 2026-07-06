"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className="mobile-bottom-nav liquid-glass fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 md:hidden"
    >
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-[var(--cs-mobile-nav-height)] flex-col items-center justify-center gap-1 font-sans text-[0.625rem] uppercase tracking-[0.14em] transition ${
              active ? "text-[#c9a962]" : "text-[#666]"
            }`}
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
