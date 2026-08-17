import type { Collection } from "@/lib/types";
import { CollectionCard } from "./collection-card";

type FeaturedCollectionsProps = {
  collections: Collection[];
};

export function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  if (collections.length === 0) return null;

  return (
    <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {collections.map((collection, index) => (
        <CollectionCard
          key={collection._id}
          collection={collection}
          priority={index < 4}
        />
      ))}
    </div>
  );
}
