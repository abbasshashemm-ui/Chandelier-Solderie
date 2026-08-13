import Image from "next/image";
import Link from "next/link";
import { SUPER_SALE_SLUG } from "@/lib/collection-membership";
import type { Collection } from "@/lib/types";

type CollectionCardProps = {
  collection: Collection;
  priority?: boolean;
};

export function CollectionCard({
  collection,
  priority = false,
}: CollectionCardProps) {
  const count = collection.productCount ?? 0;

  return (
    <article className="group relative overflow-hidden border border-line bg-ink-deep transition-colors duration-500 hover:border-line-strong">
      <Link
        href={`/collection/${collection.slug}`}
        className="relative block aspect-[16/10] overflow-hidden"
      >
        {collection.imageUrl ? (
          <Image
            src={collection.imageUrl}
            alt={collection.imageAlt ?? collection.title}
            fill
            priority={priority}
            sizes={
              collection.slug === SUPER_SALE_SLUG
                ? "100vw"
                : "(max-width: 768px) 100vw, 50vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-faint">
            No image
          </div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
        />

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-gold">
            {collection.slug === SUPER_SALE_SLUG ? "Limited offering" : "Collection"}
          </p>
          <h3 className="mt-1.5 font-serif text-2xl font-normal text-ivory sm:text-3xl md:text-4xl">
            {collection.title}
          </h3>
          {collection.description ? (
            <p className="mt-2 max-w-md font-serif text-sm leading-relaxed text-muted line-clamp-2 sm:text-base">
              {collection.description}
            </p>
          ) : null}
          <p className="mt-3 inline-flex items-center gap-2 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-gold-bright">
            {count > 0
              ? `${count} piece${count === 1 ? "" : "s"}`
              : "Explore"}
            <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
