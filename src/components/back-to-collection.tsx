"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CATALOGUE_HREF_KEY,
  canBackToCatalogue,
  markCatalogueRestore,
} from "./catalogue-scroll";

export function BackToCollection({ className }: { className?: string }) {
  const router = useRouter();
  const [href, setHref] = useState("/shop");

  useEffect(() => {
    const saved = sessionStorage.getItem(CATALOGUE_HREF_KEY);
    if (saved) setHref(saved);
  }, []);

  return (
    <Link
      href={href}
      scroll={false}
      className={className}
      onNavigate={(event) => {
        markCatalogueRestore();
        if (!canBackToCatalogue()) return;
        event.preventDefault();
        router.back();
      }}
    >
      <span aria-hidden className="text-gold">
        ←
      </span>
      The Collection
    </Link>
  );
}
