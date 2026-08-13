import { productBelongsToCollection } from "./collection-membership";
import { sanityFetchOptions } from "./cache";
import { MOCK_PRODUCTS, getMockProductBySlug } from "./mock-products";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "./sanity.queries";
import { sanityClient, isSanityConfigured } from "./sanity.client";
import { slugify } from "./slug";
import type { Product } from "./types";

function resolveCollection(product: Product): Product {
  const collectionTitle = product.collectionTitle ?? product.category;
  const collectionSlug =
    product.collectionSlug ??
    (collectionTitle ? slugify(collectionTitle) : undefined);

  return {
    ...product,
    slug: product.slug || slugify(product.title),
    collectionTitle,
    collectionSlug,
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, sanityFetchOptions)) ??
      [];
    return products.map(resolveCollection);
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProductsByCollection(
  slug: string,
  includeSaleItems?: boolean,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) =>
    productBelongsToCollection(product, slug, includeSaleItems),
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return getMockProductBySlug(slug);
  }

  try {
    const product = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      sanityFetchOptions,
    );
    if (product) return resolveCollection(product);

    const products = await getProducts();
    return products.find((item) => item.slug === slug) ?? null;
  } catch {
    return getMockProductBySlug(slug);
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}
