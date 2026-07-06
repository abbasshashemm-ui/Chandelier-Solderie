import type { FilterKey, Product } from "./types";

export type ActiveFilters = Partial<Record<FilterKey, string>>;

export const PRODUCTS_PER_PAGE = 24;

export function filterProducts(
  products: Product[],
  filters: ActiveFilters,
  searchQuery = "",
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesFilters = (
      Object.entries(filters) as [FilterKey, string][]
    ).every(([key, value]) => !value || product[key] === value);

    if (!matchesFilters) return false;
    if (!query) return true;

    const haystack = [product.title, product.sku, product.category]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getProductMetaLine(product: Product) {
  const parts: string[] = [];
  if (product.publishedAt) {
    parts.push(new Date(product.publishedAt).getFullYear().toString());
  }
  if (product.style) {
    parts.push(product.style.toUpperCase());
  }
  return parts.join(" — ");
}
