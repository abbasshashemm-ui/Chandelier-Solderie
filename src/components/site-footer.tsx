import Link from "next/link";
import {
  buildGeneralWhatsAppUrl,
  getInstagramUrl,
  getWhatsAppDisplay,
  siteContact,
} from "@/lib/site-contact";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "./social-icons";

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collection" },
  { href: "/inquire", label: "Inquire" },
  { href: "/legal", label: "Legal" },
] as const;

export function SiteFooter() {
  const whatsappUrl = buildGeneralWhatsAppUrl();
  const instagramUrl = getInstagramUrl();

  return (
    <footer className="site-footer border-t border-line bg-ink-deep">
      <div className="mx-auto w-full max-w-[1340px] px-5 pb-8 pt-8 sm:px-6 md:px-8 md:pb-10 md:pt-14">
        {/* Brand — compact on mobile */}
        <div className="text-center md:text-left">
          <p className="font-castellar text-[0.6875rem] uppercase tracking-[0.2em] text-ivory sm:text-sm md:text-base md:tracking-[0.22em]">
            Chandelier Solderie
          </p>
          <p className="mx-auto mt-2 max-w-sm font-serif text-sm leading-relaxed text-muted md:mx-0 md:mt-4 md:text-base">
            {siteContact.tagline}. Every piece in our collection is chosen to be
            the centerpiece of the room it lights.
          </p>
        </div>

        {/* Mobile: two columns (Explore | Contact/socials). Desktop: same row. */}
        <div className="mt-6 grid grid-cols-2 gap-4 md:mt-10 md:grid-cols-[0.8fr_1fr_auto] md:gap-8">
          <nav className="text-left" aria-label="Footer">
            <h2 className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold md:text-[0.625rem]">
              Explore
            </h2>
            <ul className="mt-2.5 space-y-0 md:mt-5">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex min-h-9 items-center font-sans text-xs text-muted transition hover:text-gold-bright md:min-h-11 md:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-left">
            <h2 className="font-sans text-[0.5625rem] font-medium uppercase tracking-[0.22em] text-gold md:text-[0.625rem]">
              Visit &amp; Contact
            </h2>
            <ul className="mt-2.5 space-y-0 md:mt-5 md:space-y-1">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 font-sans text-xs text-muted transition hover:text-gold-bright md:min-h-11 md:gap-2.5 md:text-sm"
                >
                  <WhatsAppIcon className="size-3.5 shrink-0 md:size-4" />
                  <span className="truncate">{getWhatsAppDisplay()}</span>
                </a>
              </li>
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 font-sans text-xs text-muted transition hover:text-gold-bright md:min-h-11 md:gap-2.5 md:text-sm"
                >
                  <InstagramIcon className="size-3.5 shrink-0 md:size-4" />
                  <span className="truncate">@chandeliersolderie</span>
                </a>
              </li>
              <li>
                <p className="inline-flex min-h-9 items-start gap-2 font-sans text-xs text-muted md:min-h-11 md:items-center md:gap-2.5 md:text-sm">
                  <MapPinIcon className="mt-0.5 size-3.5 shrink-0 md:mt-0 md:size-4" />
                  <span className="leading-snug">{siteContact.location}</span>
                </p>
              </li>
            </ul>
          </div>

          {/* Social icons sit under the contact column on mobile */}
          <div className="col-start-2 flex items-center justify-start gap-2.5 md:col-start-auto md:items-start md:justify-end md:gap-3 md:pt-7">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex size-10 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold-bright md:size-11"
            >
              <WhatsAppIcon className="size-3.5 md:size-4" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold-bright md:size-11"
            >
              <InstagramIcon className="size-3.5 md:size-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-line pt-5 md:mt-12 md:flex-row md:gap-3 md:pt-6 md:pr-20">
          <p className="font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-muted md:text-[0.625rem] md:tracking-[0.16em]">
            © {new Date().getFullYear()} {siteContact.brandName}. All rights
            reserved.
          </p>
          <Link
            href="/legal"
            className="inline-flex min-h-10 items-center font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-muted transition hover:text-gold-bright md:min-h-11 md:text-[0.625rem] md:tracking-[0.16em]"
          >
            Privacy &amp; Terms
          </Link>
        </div>

        <p className="mt-4 pb-1 text-center font-sans text-[0.5625rem] uppercase tracking-[0.14em] text-faint md:mt-5 md:text-[0.625rem] md:tracking-[0.16em]">
          Powered By{" "}
          <a
            href="https://quantexai.solutions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition hover:text-gold-bright"
          >
            Quantex AI Solutions
          </a>
        </p>
      </div>
    </footer>
  );
}
