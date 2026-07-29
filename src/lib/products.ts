import { sanityClient, isSanityConfigured } from "./sanity.client";
import { MOCK_PRODUCTS, getMockProductBySlug } from "./mock-products";
import { PRODUCTS_QUERY, PRODUCT_BY_SLUG_QUERY } from "./sanity.queries";
import type { Product } from "./types";

/** Seed catalogue with optional Sanity overlay. Only seeded slugs are listed. */
function mergeCatalogue(sanityProducts: Product[]): Product[] {
  const bySlug = new Map(sanityProducts.map((product) => [product.slug, product]));
  return MOCK_PRODUCTS.map((product) => bySlug.get(product.slug) ?? product);
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, {
        next: { tags: ["products"], revalidate: 60 },
      })) ?? [];
    return mergeCatalogue(products);
  } catch {
    return MOCK_PRODUCTS;
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
    return getMockProductBySlug(slug);
  }

  try {
    const product = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_SLUG_QUERY,
      { slug },
      { next: { tags: ["products"], revalidate: 60 } },
    );
    if (product) return product;
    return getMockProductBySlug(slug);
  } catch {
    return getMockProductBySlug(slug);
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}
