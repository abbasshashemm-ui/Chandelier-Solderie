"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export const CATALOGUE_HREF_KEY = "cs:catalogue-href";
const RESTORE_KEY = "cs:catalogue-restore";
const POP_KEY = "cs:catalogue-pop";
const FREEZE_KEY = "cs:catalogue-freeze";
const LAST_Y_KEY = "cs:catalogue-last-y";
const SCROLL_PREFIX = "cs:scroll:";

function isCataloguePath(pathname: string) {
  return pathname === "/shop" || pathname.startsWith("/collection/");
}

function isProductPath(pathname: string) {
  return pathname.startsWith("/product/");
}

function scrollStorageKey(pathname: string, search: string) {
  return `${SCROLL_PREFIX}${pathname}${search}`;
}

export function markCatalogueRestore() {
  sessionStorage.setItem(RESTORE_KEY, "1");
}

function shouldRestoreCatalogue() {
  return (
    sessionStorage.getItem(FREEZE_KEY) === "1" ||
    sessionStorage.getItem(RESTORE_KEY) === "1" ||
    sessionStorage.getItem(POP_KEY) === "1"
  );
}

function clearRestoreFlags() {
  sessionStorage.removeItem(POP_KEY);
  sessionStorage.removeItem(RESTORE_KEY);
  sessionStorage.removeItem(FREEZE_KEY);
}

function snapshotCatalogueScroll() {
  const pathname = window.location.pathname;
  if (!isCataloguePath(pathname)) return;
  const search = window.location.search;
  const y = window.scrollY;
  sessionStorage.setItem(CATALOGUE_HREF_KEY, `${pathname}${search}`);
  sessionStorage.setItem(scrollStorageKey(pathname, search), String(y));
  sessionStorage.setItem(LAST_Y_KEY, String(y));
}

function savedScrollFor(pathname: string) {
  const exact = Number(
    sessionStorage.getItem(scrollStorageKey(pathname, window.location.search)),
  );
  if (Number.isFinite(exact) && exact > 0) return exact;
  return Number(sessionStorage.getItem(LAST_Y_KEY));
}

function applyScroll(y: number) {
  if (!Number.isFinite(y) || y <= 0) return;
  document.documentElement.scrollTop = y;
  document.body.scrollTop = y;
  window.scrollTo(0, y);
}

function linkUrl(link: Element) {
  const href = link.getAttribute("href");
  if (!href) return null;
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function handleCatalogueIntent(event: Event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const link = target.closest("a[href]");
  if (!link) return;
  const url = linkUrl(link);
  if (!url || url.origin !== window.location.origin) return;

  if (link.hasAttribute("data-restore-catalogue")) {
    snapshotCatalogueScroll();
    sessionStorage.setItem(RESTORE_KEY, "1");
    return;
  }

  if (isCataloguePath(url.pathname)) {
    clearRestoreFlags();
    return;
  }

  if (isProductPath(url.pathname) && isCataloguePath(window.location.pathname)) {
    snapshotCatalogueScroll();
    sessionStorage.setItem(FREEZE_KEY, "1");
  }
}

function installGlobalListeners() {
  if (window.__csCatalogueScrollInstalled) return;
  window.__csCatalogueScrollInstalled = true;
  window.history.scrollRestoration = "manual";

  window.addEventListener(
    "popstate",
    () => {
      sessionStorage.setItem(POP_KEY, "1");
    },
    true,
  );

  const navigation = window.navigation;
  if (navigation) {
    navigation.addEventListener("navigate", (event) => {
      if (event.navigationType === "traverse") {
        sessionStorage.setItem(POP_KEY, "1");
      }
    });
  }

  window.addEventListener("pointerdown", handleCatalogueIntent, true);
  window.addEventListener("click", handleCatalogueIntent, true);
}

export function CatalogueScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";

  useLayoutEffect(() => {
    installGlobalListeners();
    if (!isCataloguePath(pathname) || !shouldRestoreCatalogue()) return;
    applyScroll(savedScrollFor(pathname));
  }, [pathname, search]);

  useEffect(() => {
    installGlobalListeners();

    if (!isCataloguePath(pathname)) return;

    sessionStorage.setItem(CATALOGUE_HREF_KEY, `${pathname}${search}`);

    let restoring = shouldRestoreCatalogue();
    let userMoved = false;
    const y = savedScrollFor(pathname);

    const save = () => {
      if (restoring) return;
      if (window.location.pathname !== pathname) return;
      snapshotCatalogueScroll();
    };

    const markUserMoved = () => {
      if (!restoring) return;
      userMoved = true;
      restoring = false;
      clearRestoreFlags();
    };

    const apply = () => {
      if (!restoring || userMoved) return;
      applyScroll(y);
    };

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    window.addEventListener("wheel", markUserMoved, { passive: true });
    window.addEventListener("touchmove", markUserMoved, { passive: true });

    if (!restoring) {
      return () => {
        window.removeEventListener("scroll", save);
        window.removeEventListener("pagehide", save);
        window.removeEventListener("wheel", markUserMoved);
        window.removeEventListener("touchmove", markUserMoved);
      };
    }

    apply();
    let raf = 0;
    const tick = () => {
      apply();
      if (restoring && !userMoved) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const finish = window.setTimeout(() => {
      apply();
      restoring = false;
      clearRestoreFlags();
    }, 1500);

    return () => {
      restoring = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(finish);
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
      window.removeEventListener("wheel", markUserMoved);
      window.removeEventListener("touchmove", markUserMoved);
    };
  }, [pathname, search]);

  return null;
}

declare global {
  interface Window {
    __csCatalogueScrollInstalled?: boolean;
    navigation?: {
      addEventListener: (
        type: "navigate",
        listener: (event: { navigationType: string }) => void,
      ) => void;
    };
  }
}
