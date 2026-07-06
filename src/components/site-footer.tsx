import Link from "next/link";
import {
  buildGeneralWhatsAppUrl,
  getInstagramUrl,
  siteContact,
} from "@/lib/site-contact";
import {
  InstagramIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "./social-icons";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
] as const;

export function SiteFooter() {
  const whatsappUrl = buildGeneralWhatsAppUrl();
  const instagramUrl = getInstagramUrl();

  return (
    <footer className="site-footer mx-auto w-full max-w-[1340px] px-3 pb-8 pt-8 sm:px-4 md:px-8 md:pb-10 md:pt-10">
      <div className="liquid-glass relative px-5 py-8 sm:px-8 sm:py-10">
        <div className="relative z-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr] md:gap-8">
          <div className="text-center md:text-left">
            <p className="font-castellar text-sm uppercase tracking-[0.2em] text-[#1a1a1a] sm:text-base">
              Chandelier Solderie
            </p>
            <p className="mt-3 max-w-sm font-serif text-base leading-relaxed text-[#555] md:mx-0 mx-auto">
              {siteContact.tagline}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="site-footer__social flex size-10 items-center justify-center border border-[#c9a962]/25 bg-white/40 text-[#444] transition hover:border-[#c9a962] hover:bg-[#c9a962] hover:text-white"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="site-footer__social flex size-10 items-center justify-center border border-[#c9a962]/25 bg-white/40 text-[#444] transition hover:border-[#c9a962] hover:bg-[#c9a962] hover:text-white"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#888]">
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#555] transition hover:text-[#c9a962]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/inquire"
                  className="font-sans text-sm text-[#555] transition hover:text-[#c9a962]"
                >
                  Inquire
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h2 className="font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#888]">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__contact-link inline-flex items-center justify-center gap-2.5 font-sans text-sm text-[#555] transition hover:text-[#c9a962] md:justify-start"
                >
                  <WhatsAppIcon className="size-4 shrink-0" />
                  +961 71 568 063
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-footer__contact-link inline-flex items-center justify-center gap-2.5 font-sans text-sm text-[#555] transition hover:text-[#c9a962] md:justify-start"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  Instagram
                </a>
              </li>
              <li>
                <p className="site-footer__contact-link inline-flex items-center justify-center gap-2.5 font-sans text-sm text-[#555] md:justify-start">
                  <MapPinIcon className="size-4 shrink-0" />
                  {siteContact.location}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 mt-8 border-t border-[#c9a962]/15 pt-6 text-center">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.14em] text-[#999]">
            © {new Date().getFullYear()} {siteContact.brandName}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
