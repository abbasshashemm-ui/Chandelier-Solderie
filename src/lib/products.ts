import { sanityClient, isSanityConfigured } from "./sanity.client";
import { MOCK_PRODUCTS } from "./mock-products";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "./sanity.queries";
import type { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }

  try {
    const products = await sanityClient.fetch<Product[]>(PRODUCTS_QUERY);
    return products?.length ? products : MOCK_PRODUCTS;
  } catch {
    return MOCK_PRODUCTS;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }

  try {
    const product = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
    );
    return product ?? MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export function formatPrice(price?: number) {
  if (price == null) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}
