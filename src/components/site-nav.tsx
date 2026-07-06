"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 hidden items-center gap-2 justify-self-center md:flex">
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
            className={`px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.14em] transition ${
              active
                ? "text-[#c9a962]"
                : "text-[#444] hover:text-[#c9a962]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
