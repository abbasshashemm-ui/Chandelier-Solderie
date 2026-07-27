import Link from "next/link";
import {
  buildGeneralWhatsAppUrl,
  getInstagramUrl,
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
      <div className="mx-auto w-full max-w-[1340px] px-5 pb-10 pt-12 sm:px-6 md:px-8 md:pt-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_0.8fr_1fr] md:gap-8">
          <div className="text-center md:text-left">
            <p className="font-castellar text-sm uppercase tracking-[0.22em] text-ivory sm:text-base">
              Chandelier Solderie
            </p>
            <p className="mx-auto mt-4 max-w-sm font-serif text-base leading-relaxed text-muted md:mx-0">
              {siteContact.tagline}. Every piece in our collection is chosen to
              be the centerpiece of the room it lights.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 md:justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-11 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold-bright"
              >
                <WhatsAppIcon className="size-4" />
              </a>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-11 items-center justify-center border border-line text-muted transition hover:border-gold hover:text-gold-bright"
              >
                <InstagramIcon className="size-4" />
              </a>
            </div>
          </div>

          <nav className="text-center md:text-left" aria-label="Footer">
            <h2 className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-muted transition hover:text-gold-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center md:text-left">
            <h2 className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.22em] text-gold">
              Visit &amp; Contact
            </h2>
            <ul className="mt-5 space-y-3.5">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 font-sans text-sm text-muted transition hover:text-gold-bright md:justify-start"
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
                  className="inline-flex items-center justify-center gap-2.5 font-sans text-sm text-muted transition hover:text-gold-bright md:justify-start"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  @chandeliersolderie
                </a>
              </li>
              <li>
                <p className="inline-flex items-center justify-center gap-2.5 font-sans text-sm text-muted md:justify-start">
                  <MapPinIcon className="size-4 shrink-0" />
                  {siteContact.location}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-faint">
            © {new Date().getFullYear()} {siteContact.brandName}. All rights
            reserved.
          </p>
          <Link
            href="/legal"
            className="font-sans text-[0.625rem] uppercase tracking-[0.16em] text-faint transition hover:text-gold-bright"
          >
            Privacy &amp; Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
