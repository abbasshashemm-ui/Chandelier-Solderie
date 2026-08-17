import { productBelongsToCollection } from "./collection-membership";
import { sanityFetchOptions } from "./cache";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "./sanity.queries";
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
    sizes: resolveSizes(product.sizes),
  };
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, sanityFetchOptions)) ??
      [];
    return products.map(resolveCollection);
  } catch (error) {
    console.error("Failed to load products from Sanity", error);
    return [];
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
    return null;
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
    return null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}
