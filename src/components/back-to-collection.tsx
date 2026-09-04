"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CATALOGUE_HREF_KEY, markCatalogueRestore } from "./catalogue-scroll";

function subscribe() {
  return () => undefined;
}

function getCatalogueHref() {
  return sessionStorage.getItem(CATALOGUE_HREF_KEY) || "/shop";
}

function getServerCatalogueHref() {
  return "/shop";
}

export function BackToCollection({ className }: { className?: string }) {
  const href = useSyncExternalStore(
    subscribe,
    getCatalogueHref,
    getServerCatalogueHref,
  );

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
