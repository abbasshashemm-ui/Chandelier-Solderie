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
    sessionStorage.getItem(POP_KEY) === "1" ||
    sessionStorage.getItem(RESTORE_KEY) === "1"
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

function installGlobalListeners() {
  if (window.__csCatalogueScrollInstalled) return;
  window.__csCatalogueScrollInstalled = true;
  window.history.scrollRestoration = "manual";

  window.addEventListener("popstate", () => {
    sessionStorage.setItem(POP_KEY, "1");
  });

  const freezeIfProductLink = (event: Event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const link = target.closest("a[href]");
    if (!link) return;
    let url: URL;
    try {
      url = new URL(link.getAttribute("href") ?? "", window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;
    if (
      isProductPath(url.pathname) &&
      isCataloguePath(window.location.pathname)
    ) {
      snapshotCatalogueScroll();
      sessionStorage.setItem(FREEZE_KEY, "1");
    }
  };

  window.addEventListener("pointerdown", freezeIfProductLink, true);
  window.addEventListener("click", freezeIfProductLink, true);
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

    if (!isCataloguePath(pathname)) {
      return;
    }

    sessionStorage.setItem(CATALOGUE_HREF_KEY, `${pathname}${search}`);

    let restoring = shouldRestoreCatalogue();
    let userMoved = false;
    const y = savedScrollFor(pathname);

    const save = () => {
      if (restoring || userMoved) return;
      if (sessionStorage.getItem(FREEZE_KEY) === "1") return;
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

    if (restoring) apply();

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    window.addEventListener("wheel", markUserMoved, { passive: true });
    window.addEventListener("touchmove", markUserMoved, { passive: true });

    const raf = restoring ? requestAnimationFrame(apply) : 0;
    const interval = restoring ? window.setInterval(apply, 50) : 0;
    const finish =
      restoring
        ? window.setTimeout(() => {
            apply();
            restoring = false;
            clearRestoreFlags();
          }, 1000)
        : 0;

    return () => {
      restoring = false;
      if (raf) cancelAnimationFrame(raf);
      if (interval) window.clearInterval(interval);
      if (finish) window.clearTimeout(finish);
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
  }
}
