"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collection" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 hidden items-center gap-8 justify-self-center md:flex">
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
            className={`group relative py-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.2em] transition ${
              active ? "text-gold-bright" : "text-muted hover:text-ivory"
            }`}
          >
            {item.label}
            <span
              aria-hidden
              className={`absolute inset-x-0 -bottom-px h-px bg-gold transition-opacity ${
                active ? "opacity-100" : "opacity-0 group-hover:opacity-40"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
