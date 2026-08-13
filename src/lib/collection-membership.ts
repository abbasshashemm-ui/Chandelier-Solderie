import type { Product } from "./types";

export function productBelongsToCollection(
  product: Product,
  slug: string,
  includeSaleItems = false,
) {
  if (product.collectionSlug === slug) return true;
  return includeSaleItems && Boolean(product.onSale);
}
