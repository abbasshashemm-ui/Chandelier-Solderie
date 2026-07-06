"use client";

import { LightSwitch } from "./light-switch";
import { buildGeneralWhatsAppUrl } from "@/lib/site-contact";

type SiteHeaderActionsProps = {
  className?: string;
};

export function SiteHeaderActions({ className = "" }: SiteHeaderActionsProps) {
  return (
    <div
      className={`relative z-20 flex shrink-0 items-center gap-2 sm:gap-4 md:gap-5 ${className}`}
    >
      <a
        href={buildGeneralWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden min-h-11 items-center px-2 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#444] transition hover:text-[#c9a962] sm:flex sm:px-3 sm:py-1.5"
      >
        Inquire
      </a>
      <LightSwitch />
    </div>
  );
}
