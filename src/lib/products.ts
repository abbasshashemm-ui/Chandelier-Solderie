import { productBelongsToCollection } from "./collection-membership";
import { sanityFetchOptions } from "./cache";
import { MOCK_PRODUCTS, getMockProductBySlug } from "./mock-products";
import { PRODUCTS_QUERY, PRODUCT_BY_ID_QUERY } from "./sanity.queries";
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

// Two products with the same title get the same Sanity slug. Give every
// product in such a group a short, stable ID suffix so each has its own URL
// (and cart line). Products with a unique slug keep their existing URL.
function disambiguateSlugs(products: Product[]): Product[] {
  const counts = new Map<string, number>();
  for (const product of products) {
    counts.set(product.slug, (counts.get(product.slug) ?? 0) + 1);
  }

  return products.map((product) => {
    if ((counts.get(product.slug) ?? 0) < 2) return product;
    const suffix = product._id
      .replace(/^drafts\./, "")
      .replace(/[^a-z0-9]/gi, "")
      .slice(-6)
      .toLowerCase();
    return { ...product, slug: `${product.slug}-${suffix}` };
  });
}

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return MOCK_PRODUCTS;
  }

  try {
    const products =
      (await sanityClient.fetch<Product[]>(PRODUCTS_QUERY, {}, sanityFetchOptions)) ??
      [];
    return disambiguateSlugs(products.map(resolveCollection));
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
    // Resolve through the (slug-disambiguated) list so duplicate titles open
    // the right product, then load that product's full details by ID.
    const products = await getProducts();
    const match = products.find((item) => item.slug === slug);
    if (!match) return null;

    const product = await sanityClient.fetch<Product | null>(
      PRODUCT_BY_ID_QUERY,
      { id: match._id },
      sanityFetchOptions,
    );
    return product ? { ...resolveCollection(product), slug: match.slug } : match;
  } catch {
    return getMockProductBySlug(slug);
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getProducts();
  return products.map((product) => product.slug);
}
