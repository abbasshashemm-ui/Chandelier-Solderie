import type { Collection } from "@/lib/types";
import { CollectionCard } from "./collection-card";

type FeaturedCollectionsProps = {
  collections: Collection[];
};

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <div
      className={`grid items-stretch gap-3 sm:gap-5 ${
        collections.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection._id}
          collection={collection}
          priority={index < 2}
        />
      ))}
    </div>
  );
}
