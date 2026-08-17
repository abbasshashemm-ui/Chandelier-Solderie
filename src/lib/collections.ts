import { cache } from "react";
import { sanityFetchOptions } from "./cache";
import { productBelongsToCollection } from "./collection-membership";
import { getSalePercent, getStartingPrice } from "./pricing";
import { getProducts } from "./products";
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_SLUG_QUERY,
  COLLECTION_SLUGS_QUERY,
} from "./sanity.queries";
import { sanityClient, isSanityConfigured } from "./sanity.client";
import { slugify } from "./slug";
import type { Collection, HomepagePromo, Product } from "./types";

function withCounts(
  collections: Collection[],
  products: Product[],
): Collection[] {
  return collections.map((collection) => {
    const members = products.filter((product) =>
      productBelongsToCollection(
        product,
        collection.slug,
        collection.includeSaleItems,
      ),
    );

    return {
      ...collection,
      slug: collection.slug || slugify(collection.title),
      productCount: members.length,
      imageUrl: collection.imageUrl ?? members[0]?.imageUrl,
      imageLqip: collection.imageLqip ?? members[0]?.imageLqip,
      imageAlt: collection.imageAlt ?? members[0]?.imageAlt,
    };
  });
}

function isHomepageCollection(collection: Collection) {
  return Boolean(collection.featured || collection.promoRibbon?.enabled);
}

const fetchSanityCollections = cache(async () => {
  return (
    (await sanityClient.fetch<Collection[]>(
      COLLECTIONS_QUERY,
      {},
      sanityFetchOptions,
    )) ?? []
  );
});

export const getCollections = cache(async (): Promise<Collection[]> => {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const [products, collections] = await Promise.all([
      getProducts(),
      fetchSanityCollections(),
    ]);
    return withCounts(collections, products);
  } catch (error) {
    console.error("Failed to load collections from Sanity", error);
    return [];
  }
});

export async function getFeaturedCollections(limit = 8): Promise<Collection[]> {
  const collections = await getCollections();
  const featured = collections.filter(isHomepageCollection);
  const source = featured.length > 0 ? featured : collections;
  return source.slice(0, limit);
}

export const getCollectionBySlug = cache(
  async (slug: string): Promise<Collection | null> => {
    const collections = await getCollections();
    const fromList = collections.find((collection) => collection.slug === slug);
    if (fromList) return fromList;

    if (!isSanityConfigured) {
      return null;
    }

    try {
      const collection = await sanityClient.fetch<Collection | null>(
        COLLECTION_BY_SLUG_QUERY,
        { slug },
        sanityFetchOptions,
      );
      return collection;
    } catch {
      return null;
    }
  },
);

export async function getCollectionSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    return (
      (await sanityClient.fetch<string[]>(
        COLLECTION_SLUGS_QUERY,
        {},
        sanityFetchOptions,
      )) ?? []
    );
  } catch {
    return [];
  }
}

export async function getHomepagePromo(): Promise<HomepagePromo | null> {
  const [collections, products] = await Promise.all([
    getCollections(),
    getProducts(),
  ]);
  const collection = collections.find((item) => {
    if (item.promoRibbon?.enabled) return true;
    if (item.promoRibbon?.enabled === false) return false;
    return Boolean(item.includeSaleItems);
  });
  if (!collection) return null;

  const members = products.filter((product) =>
    productBelongsToCollection(
      product,
      collection.slug,
      collection.includeSaleItems,
    ),
  );
  const maxPercent = members.reduce((max, product) => {
    const percent = getSalePercent({
      ...product,
      ...getStartingPrice(product),
    });
    return percent != null && percent > max ? percent : max;
  }, 0);

  const kicker =
    collection.promoRibbon?.kicker?.trim() || collection.title;
  const headline =
    collection.promoRibbon?.headline?.trim() ||
    (maxPercent > 0 ? `Up to ${maxPercent}% OFF` : "Sale");

  return {
    href: `/collection/${collection.slug}`,
    kicker,
    headline,
  };
}
