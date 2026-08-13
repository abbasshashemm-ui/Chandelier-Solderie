import type { Product } from "./types";

export const SUPER_SALE_SLUG = "super-sale";

export function productBelongsToCollection(
  product: Product,
  slug: string,
  includeSaleItems = slug === SUPER_SALE_SLUG,
) {
  if (product.collectionSlug === slug) return true;
  return includeSaleItems && Boolean(product.onSale);
}
