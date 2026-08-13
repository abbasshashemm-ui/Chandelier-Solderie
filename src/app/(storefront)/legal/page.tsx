import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteContact } from "@/lib/site-contact";
import { siteName } from "@/lib/site-metadata";

export const metadata = {
  title: "Legal",
  description: `Privacy policy and terms of use for ${siteName}.`,
};

export default function LegalPage() {
  const year = new Date().getFullYear();

  return (
    <div className="page-shell min-h-screen">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-5 pb-[calc(3rem+var(--cs-mobile-nav-height))] pt-[calc(var(--cs-header-height)+2rem)] sm:px-8 md:pb-20 md:pt-[calc(var(--cs-header-height)+3rem)]">
        <p className="font-castellar text-[0.6875rem] uppercase tracking-[0.3em] text-gold">
          {siteContact.brandName}
        </p>
        <h1 className="mt-4 font-serif text-4xl font-normal text-ivory md:text-5xl">
          Legal
        </h1>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-serif text-2xl text-ivory">Privacy Policy</h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-muted">
            {siteContact.brandName} respects your privacy. This website is a
            catalogue for luxury lighting. We do not operate an online checkout —
            inquiries are handled directly through WhatsApp, Instagram, or in
            person at our showroom.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 font-serif text-base leading-relaxed text-muted marker:text-gold">
            <li>
              When you contact us via WhatsApp or Instagram, those platforms
              handle your messages under their own privacy policies.
            </li>
            <li>
              We may collect basic analytics data (such as page views and device
              type) to improve the website experience. This data is aggregated
              and does not personally identify you.
            </li>
            <li>We do not sell personal information to third parties.</li>
          </ul>
        </section>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-serif text-2xl text-ivory">Terms of Use</h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-muted">
            By using this website, you agree to the following terms:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 font-serif text-base leading-relaxed text-muted marker:text-gold">
            <li>
              Product images, descriptions, and prices are provided for catalogue
              purposes and may change without notice.
            </li>
            <li>
              Availability, final pricing, and specifications are confirmed
              directly with our team before purchase.
            </li>
            <li>
              All content on this site — including photography, copy, and
              branding — is owned by {siteContact.brandName} and may not be
              reproduced without permission.
            </li>
            <li>
              This website is provided as-is. We aim for accuracy but do not
              guarantee that all information is complete or error-free at all
              times.
            </li>
          </ul>
        </section>

        <section className="mt-12 border-t border-line pt-8">
          <h2 className="font-serif text-2xl text-ivory">Contact</h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-muted">
            For questions about these policies or your inquiry, reach us through
            our{" "}
            <Link
              href="/inquire"
              className="text-gold-bright underline-offset-4 hover:underline"
            >
              Inquire page
            </Link>{" "}
            or visit us at {siteContact.location}.
          </p>
        </section>

        <p className="mt-14 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-faint">
          Last updated {year}
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
