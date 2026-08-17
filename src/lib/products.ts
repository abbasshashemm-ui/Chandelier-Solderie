import { cache } from "react";
import { productBelongsToCollection } from "./collection-membership";
import { sanityFetchOptions } from "./cache";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
} from "./sanity.queries";
import { sanityClient, isSanityConfigured } from "./sanity.client";
import { slugify } from "./slug";
import type { Product, ProductSize } from "./types";

function resolveSizes(sizes: ProductSize[] | undefined): ProductSize[] | undefined {
  if (!sizes?.length) return undefined;

  const resolved = sizes
    .filter(
      (size) =>
        Boolean(size.label?.trim()) &&
        typeof size.price === "number" &&
        !Number.isNaN(size.price),
    )
    .map((size, index) => ({
      ...size,
      label: size.label.trim(),
      _key: size._key || `size-${index}`,
    }));

  return resolved.length > 0 ? resolved : undefined;
}

function resolveProduct(product: Product): Product {
  const collectionTitle = product.collectionTitle;
  const collectionSlug =
    product.collectionSlug ??
    (collectionTitle ? slugify(collectionTitle) : undefined);

  return {
    ...product,
    slug: product.slug || slugify(product.title),
    collectionTitle,
    collectionSlug,
    sizes: resolveSizes(product.sizes),
  };
}

export const getProducts = cache(async (): Promise<Product[]> => {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, sanityFetchOptions)) ??
      [];
    return products.map(resolveProduct);
  } catch (error) {
    console.error("Failed to load products from Sanity", error);
    return [];
  }
});

export async function getProductsByCollection(
  slug: string,
  includeSaleItems?: boolean,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) =>
    productBelongsToCollection(product, slug, includeSaleItems),
  );
}

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    if (!isSanityConfigured) {
      return null;
    }

    try {
      const product = await sanityClient.fetch<Product | null>(
        PRODUCT_BY_SLUG_QUERY,
        { slug },
        sanityFetchOptions,
      );
      return product ? resolveProduct(product) : null;
    } catch (error) {
      console.error("Failed to load product from Sanity", error);
      return null;
    }
  },
);

export async function getProductSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    return (
      (await sanityClient.fetch<string[]>(
        PRODUCT_SLUGS_QUERY,
        {},
        sanityFetchOptions,
      )) ?? []
    );
  } catch (error) {
    console.error("Failed to load product slugs from Sanity", error);
    return [];
  }
}
