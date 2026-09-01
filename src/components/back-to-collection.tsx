"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CATALOGUE_HREF_KEY, markCatalogueRestore } from "./catalogue-scroll";

export function BackToCollection({ className }: { className?: string }) {
  const [href, setHref] = useState("/shop");

  useEffect(() => {
    const saved = sessionStorage.getItem(CATALOGUE_HREF_KEY);
    if (saved) setHref(saved);
  }, []);

  return (
    <Link
      href={href}
      scroll={false}
      data-restore-catalogue=""
      className={className}
      onNavigate={() => {
        markCatalogueRestore();
      }}
    >
      <span aria-hidden className="text-gold">
        ←
      </span>
      The Collection
    </Link>
  );
}
