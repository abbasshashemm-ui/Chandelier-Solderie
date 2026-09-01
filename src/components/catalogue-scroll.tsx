"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export const CATALOGUE_HREF_KEY = "cs:catalogue-href";
const RESTORE_KEY = "cs:catalogue-restore";
const CAN_BACK_KEY = "cs:catalogue-can-back";
const SCROLL_PREFIX = "cs:scroll:";

let pendingPop = false;
let listenersInstalled = false;
let lastPathname = "";

function isCataloguePath(pathname: string) {
  return pathname === "/shop" || pathname.startsWith("/collection/");
}

function locationKey(pathname: string, search: string) {
  return `${SCROLL_PREFIX}${pathname}${search}`;
}

function searchString(params: { toString(): string }) {
  const value = params.toString();
  return value ? `?${value}` : "";
}

export function markCatalogueRestore() {
  sessionStorage.setItem(RESTORE_KEY, "1");
}

export function canBackToCatalogue() {
  return sessionStorage.getItem(CAN_BACK_KEY) === "1";
}

function consumeRestore() {
  pendingPop = false;
  sessionStorage.removeItem(RESTORE_KEY);
}

function restoreScroll(y: number) {
  if (!Number.isFinite(y) || y <= 0) return;
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
}

function ensureListeners() {
  if (listenersInstalled || typeof window === "undefined") return;
  listenersInstalled = true;
  window.history.scrollRestoration = "manual";
  window.addEventListener("popstate", () => {
    pendingPop = true;
  });
}

export function CatalogueScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchString(searchParams);

  useLayoutEffect(() => {
    ensureListeners();

    const wasCatalogue = isCataloguePath(lastPathname);
    const isProduct = pathname.startsWith("/product/");
    if (wasCatalogue && isProduct) {
      sessionStorage.setItem(CAN_BACK_KEY, "1");
    } else if (!isProduct && !isCataloguePath(pathname)) {
      sessionStorage.removeItem(CAN_BACK_KEY);
    }
    lastPathname = pathname;

    if (!isCataloguePath(pathname)) {
      if (pendingPop) pendingPop = false;
      return;
    }

    sessionStorage.setItem(CATALOGUE_HREF_KEY, `${pathname}${search}`);

    const shouldRestore =
      pendingPop || sessionStorage.getItem(RESTORE_KEY) === "1";
    if (!shouldRestore) return;

    const y = Number(sessionStorage.getItem(locationKey(pathname, search)));
    consumeRestore();
    restoreScroll(y);

    let cancelled = false;
    let userMoved = false;
    const onUserScroll = () => {
      userMoved = true;
    };
    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchmove", onUserScroll, { passive: true });

    const apply = () => {
      if (cancelled || userMoved) return;
      restoreScroll(y);
    };
    const raf = requestAnimationFrame(apply);
    const timers = [0, 80, 200, 400].map((ms) => window.setTimeout(apply, ms));

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchmove", onUserScroll);
    };
  }, [pathname, search]);

  useEffect(() => {
    if (!isCataloguePath(pathname)) return;

    const save = () => {
      sessionStorage.setItem(CATALOGUE_HREF_KEY, `${pathname}${search}`);
      sessionStorage.setItem(
        locationKey(pathname, search),
        String(window.scrollY),
      );
    };

    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("pagehide", save);
    save();
    return () => {
      save();
      window.removeEventListener("scroll", save);
      window.removeEventListener("pagehide", save);
    };
  }, [pathname, search]);

  return null;
}
