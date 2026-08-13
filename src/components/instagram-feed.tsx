import Image from "next/image";
import Link from "next/link";
import { getInstagramUrl } from "@/lib/site-contact";
import type { InstagramPost, Product, SiteSettings } from "@/lib/types";
import { InstagramIcon } from "./social-icons";

type InstagramFeedProps = {
  instagram?: SiteSettings["instagram"];
  fallbackProducts?: Product[];
};

type Tile = {
  key: string;
  imageUrl: string;
  imageLqip?: string;
  imageAlt: string;
  caption?: string;
  href: string;
  external: boolean;
};

const TILE_COUNT = 6;

function fromPosts(posts: InstagramPost[], profileUrl: string): Tile[] {
  return posts.slice(0, TILE_COUNT).map((post) => ({
    key: post._key,
    imageUrl: post.imageUrl,
    imageLqip: post.imageLqip,
    imageAlt: post.imageAlt ?? post.caption ?? "Installed piece",
    caption: post.caption,
    href: post.url?.trim() || profileUrl,
    external: true,
  }));
}

function fromProducts(products: Product[]): Tile[] {
  return products
    .filter((product) => Boolean(product.imageUrl))
    .slice(0, TILE_COUNT)
    .map((product) => ({
      key: product._id,
      imageUrl: product.imageUrl as string,
      imageLqip: product.imageLqip,
      imageAlt: product.imageAlt ?? product.title,
      caption: product.title,
      href: `/product/${product.slug}`,
      external: false,
    }));
}

export function InstagramFeed({
  instagram,
  fallbackProducts = [],
}: InstagramFeedProps) {
  const profileUrl = getInstagramUrl();
  const posts = instagram?.posts ?? [];
  const tiles =
    posts.length > 0
      ? fromPosts(posts, profileUrl)
      : fromProducts(fallbackProducts);

  if (tiles.length === 0) return null;

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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
          {tiles.map((tile, index) => {
            const media = (
              <>
                <Image
                  src={tile.imageUrl}
                  alt={tile.imageAlt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 17vw"
                  className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  placeholder={tile.imageLqip ? "blur" : "empty"}
                  blurDataURL={tile.imageLqip}
                />

                <span aria-hidden className="cs-bloom cs-bloom--card" />

                <span
                  aria-hidden
                  className="ig-tile__glyph absolute inset-0 flex items-center justify-center bg-black/45 text-gold-bright"
                >
                  <InstagramIcon className="size-6" />
                </span>
              </>
            );

            const className =
              "group relative block aspect-square overflow-hidden border border-line bg-ink-deep transition-colors duration-500 hover:border-line-strong";
            const label = tile.caption
              ? `${tile.caption} — view on Instagram`
              : "View on Instagram";

            return tile.external ? (
              <a
                key={tile.key}
                href={tile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={className}
              >
                {media}
              </a>
            ) : (
              <Link
                key={tile.key}
                href={tile.href}
                aria-label={tile.caption ?? `Piece ${index + 1}`}
                className={className}
              >
                {media}
              </Link>
            );
          })}
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
