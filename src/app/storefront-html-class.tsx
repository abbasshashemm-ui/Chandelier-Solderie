"use client";

import { useLayoutEffect } from "react";

export function StorefrontHtmlClass({ className }: { className: string }) {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const tokens = className.split(/\s+/).filter(Boolean);
    html.classList.add(...tokens);
    html.setAttribute("data-scroll-behavior", "smooth");
    return () => {
      html.classList.remove(...tokens);
      html.removeAttribute("data-scroll-behavior");
    };
  }, [className]);

  return null;
}
