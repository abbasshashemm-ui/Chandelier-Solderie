import { sanityFetchOptions } from "./cache";
import { productBelongsToCollection, SUPER_SALE_SLUG } from "./collection-membership";
import { MOCK_COLLECTIONS } from "./mock-collections";
import { getProducts } from "./products";
import {
  COLLECTIONS_QUERY,
  COLLECTION_BY_SLUG_QUERY,
} from "./sanity.queries";
import { sanityClient, isSanityConfigured } from "./sanity.client";
import { slugify } from "./slug";
import type { Collection, Product } from "./types";

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
      productCount: members.length,
      imageUrl: collection.imageUrl ?? members[0]?.imageUrl,
      imageLqip: collection.imageLqip ?? members[0]?.imageLqip,
      imageAlt: collection.imageAlt ?? members[0]?.imageAlt,
    };
  });
}

function collectionsFromProducts(products: Product[]): Collection[] {
  const map = new Map<string, Collection>();

  for (const product of products) {
    const title = product.collectionTitle ?? product.category;
    const slug = product.collectionSlug ?? (title ? slugify(title) : undefined);
    if (!slug || !title) continue;

    const existing = map.get(slug);
    if (existing) {
      existing.productCount = (existing.productCount ?? 0) + 1;
      if (!existing.imageUrl && product.imageUrl) {
        existing.imageUrl = product.imageUrl;
        existing.imageLqip = product.imageLqip;
        existing.imageAlt = product.imageAlt;
      }
      continue;
    }

    map.set(slug, {
      _id: `collection-${slug}`,
      title,
      slug,
      imageUrl: product.imageUrl,
      imageLqip: product.imageLqip,
      imageAlt: product.imageAlt,
      featured: true,
      productCount: 1,
    });
  }

  return [...map.values()];
}

async function fetchSanityCollections() {
  return (
    (await sanityClient.fetch<Collection[]>(
      COLLECTIONS_QUERY,
      {},
      sanityFetchOptions,
    )) ?? []
  );
}

export async function getCollections(): Promise<Collection[]> {
  if (!isSanityConfigured) {
    const products = await getProducts();
    return withCounts(MOCK_COLLECTIONS, products);
  }

  try {
    const [products, collections] = await Promise.all([
      getProducts(),
      fetchSanityCollections(),
    ]);

    if (collections.length === 0) {
      const derived = collectionsFromProducts(products);
      const superSale = MOCK_COLLECTIONS.find(
        (collection) => collection.slug === SUPER_SALE_SLUG,
      );
      return withCounts(
        superSale ? [superSale, ...derived] : derived,
        products,
      );
    }

    return withCounts(collections, products);
  } catch {
    const products = await getProducts();
    return withCounts(MOCK_COLLECTIONS, products);
  }
}

export async function getFeaturedCollections(limit = 8): Promise<Collection[]> {
  const collections = await getCollections();
  const featured = collections.filter((collection) => collection.featured);
  const source = featured.length > 0 ? featured : collections;
  return source.slice(0, limit);
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | null> {
  const collections = await getCollections();
  const fromList = collections.find((collection) => collection.slug === slug);
  if (fromList) return fromList;

  if (!isSanityConfigured) {
    return MOCK_COLLECTIONS.find((collection) => collection.slug === slug) ?? null;
  }

  try {
    const collection = await sanityClient.fetch<Collection | null>(
      COLLECTION_BY_SLUG_QUERY,
      { slug },
      sanityFetchOptions,
    );
    return collection;
  } catch {
    return MOCK_COLLECTIONS.find((collection) => collection.slug === slug) ?? null;
  }
}

export async function getCollectionSlugs(): Promise<string[]> {
  const collections = await getCollections();
  return collections.map((collection) => collection.slug);
}
