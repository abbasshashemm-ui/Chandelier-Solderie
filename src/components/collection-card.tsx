import Image from "next/image";
import Link from "next/link";
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
        className="relative block aspect-[4/5] overflow-hidden sm:aspect-square"
      >
        {collection.imageUrl ? (
          <Image
            src={collection.imageUrl}
            alt={collection.imageAlt ?? collection.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
            placeholder={collection.imageLqip ? "blur" : "empty"}
            blurDataURL={collection.imageLqip}
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

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="font-sans text-[0.5rem] uppercase tracking-[0.28em] text-gold sm:text-[0.5625rem]">
            {collection.cardEyebrow?.trim() ||
              (collection.includeSaleItems ? "Limited offering" : "Collection")}
          </p>
          <h3 className="mt-1 font-serif text-lg font-normal text-ivory sm:text-xl md:text-2xl">
            {collection.title}
          </h3>
          {collection.description ? (
            <p className="mt-1.5 hidden font-serif text-sm leading-relaxed text-muted line-clamp-2 sm:block">
              {collection.description}
            </p>
          ) : null}
          <p className="mt-2 inline-flex items-center gap-2 font-sans text-[0.5625rem] uppercase tracking-[0.18em] text-gold-bright sm:mt-3 sm:text-[0.625rem]">
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
