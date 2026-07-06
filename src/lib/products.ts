import { sanityClient, isSanityConfigured } from "./sanity.client";
import { MOCK_PRODUCTS, getMockProductBySlug } from "./mock-products";
import {
  PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCT_SLUGS_QUERY,
} from "./sanity.queries";
import type { Product } from "./types";

const useDevMocks =
  process.env.NODE_ENV === "development" && !isSanityConfigured;

function getDevFallback(): Product[] {
  return useDevMocks ? MOCK_PRODUCTS : [];
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return getDevFallback();
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, {
        next: { tags: ["products"], revalidate: 60 },
      })) ?? [];
    if (products.length > 0) {
      return products;
    }
    return useDevMocks ? MOCK_PRODUCTS : [];
  } catch {
    return useDevMocks ? MOCK_PRODUCTS : [];
  }
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts();
  const featured = products.filter((product) => product.featured);
  const source = featured.length > 0 ? featured : products;
  return source.slice(0, limit);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return useDevMocks ? getMockProductBySlug(slug) : null;
  }

  try {
    const product = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { next: { tags: ["products"], revalidate: 60 } },
    );
    if (product) return product;
    return useDevMocks ? getMockProductBySlug(slug) : null;
  } catch {
    return useDevMocks ? getMockProductBySlug(slug) : null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return useDevMocks ? MOCK_PRODUCTS.map((product) => product.slug) : [];
  }

  try {
    const slugs =
      (await sanityClient.fetch<string[]>(PRODUCT_SLUGS_QUERY, {}, {
        next: { tags: ["products"], revalidate: 60 },
      })) ?? [];
    if (slugs.length > 0) return slugs;
    return useDevMocks ? MOCK_PRODUCTS.map((product) => product.slug) : [];
  } catch {
    return useDevMocks ? MOCK_PRODUCTS.map((product) => product.slug) : [];
  }
}
