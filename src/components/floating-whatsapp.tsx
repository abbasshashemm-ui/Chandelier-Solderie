"use client";

import { usePathname } from "next/navigation";
import { buildGeneralWhatsAppUrl } from "@/lib/site-contact";
import { WhatsAppIcon } from "./social-icons";

export function FloatingWhatsApp() {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return null;
  }

  return (
    <a
      href={buildGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="floating-whatsapp fixed right-4 bottom-[calc(var(--cs-mobile-nav-height)+1rem)] z-[60] flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_28px_rgba(37,211,102,0.35)] transition duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_14px_36px_rgba(37,211,102,0.45)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:right-7 md:bottom-8"
    >
      <span className="floating-whatsapp__label font-sans text-[0.5625rem] uppercase tracking-[0.18em]">
        Online now
      </span>
      <WhatsAppIcon className="size-7" />
      <span className="floating-whatsapp__pulse" aria-hidden />
      <span className="floating-whatsapp__status" aria-hidden />
    </a>
  );
}
