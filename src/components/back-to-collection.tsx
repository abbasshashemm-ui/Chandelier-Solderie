"use client";

import Link from "next/link";
import { useSyncExternalStore, type ReactNode } from "react";
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

export function BackToCollection({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
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
      {children ?? (
        <>
          <span aria-hidden className="text-gold">
            ←
          </span>
          The Collection
        </>
      )}
    </Link>
  );
}
