import type { FilterKey, Product } from "./types";

export type ActiveFilters = Partial<Record<FilterKey, string>>;

export function filterProducts(
  products: Product[],
  filters: ActiveFilters,
): Product[] {
  return products.filter((product) =>
    (Object.entries(filters) as [FilterKey, string][]).every(
      ([key, value]) => !value || product[key] === value,
    ),
  );
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
