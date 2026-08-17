import { homepageInstagramReels } from "@/lib/instagram-reels";
import { getInstagramUrl } from "@/lib/site-contact";
import type { SiteSettings } from "@/lib/types";
import { InstagramReel } from "./instagram-reel";
import { InstagramIcon } from "./social-icons";

type InstagramFeedProps = {
  instagram?: SiteSettings["instagram"];
};

export function InstagramFeed({ instagram }: InstagramFeedProps) {
  const profileUrl = getInstagramUrl();

  return (
    <section className="border-t border-line">
      <div className="mx-auto w-full max-w-[1340px] px-3 py-16 sm:px-4 md:px-8 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4 px-2 sm:px-0 md:mb-10">
          <div>
            <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
              Installed
            </p>
            <h2 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-4xl">
              {instagram?.heading?.trim() || "In Their Homes"}
            </h2>
            {instagram?.body?.trim() ? (
              <p className="mt-3 max-w-xl font-serif text-base leading-relaxed text-muted">
                {instagram.body}
              </p>
            ) : null}
          </div>

          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-2 pb-1 font-sans text-[0.6875rem] uppercase tracking-[0.18em] text-muted transition hover:text-gold-bright sm:inline-flex"
          >
            <InstagramIcon className="size-3.5" />
            @chandeliersolderie
          </a>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {homepageInstagramReels.map((reel) => (
            <a
              key={reel.id}
              href={reel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this installation on Instagram"
              className="group relative block aspect-[9/16] overflow-hidden border border-line bg-ink-deep transition-colors duration-500 hover:border-line-strong"
            >
              <InstagramReel src={reel.videoSrc} poster={reel.posterSrc} />

              <span aria-hidden className="cs-bloom cs-bloom--card" />

              <span
                aria-hidden
                className="ig-tile__glyph absolute inset-0 flex items-center justify-center bg-black/45 text-gold-bright"
              >
                <InstagramIcon className="size-6" />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost w-full max-w-xs"
          >
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
