import type { Collection } from "@/lib/types";
import { SUPER_SALE_SLUG } from "@/lib/collection-membership";
import { CollectionCard } from "./collection-card";

type FeaturedCollectionsProps = {
  collections: Collection[];
};

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-5 md:grid-cols-2">
      {collections.map((collection, index) => (
        <div
          key={collection._id}
          className={
            collection.slug === SUPER_SALE_SLUG ? "md:col-span-2" : undefined
          }
        >
          <CollectionCard collection={collection} priority={index < 2} />
        </div>
      ))}
    </div>
  );
}
