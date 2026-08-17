import { matchesPriceRange } from "./pricing";
import {
  PRICE_RANGE_VALUES,
  type FilterKey,
  type FilterOption,
  type Product,
} from "./types";

export type ActiveFilters = Partial<Record<FilterKey, string>>;

export const PRODUCTS_PER_PAGE = 24;

const ATTRIBUTE_FILTERS: { key: Exclude<FilterKey, "priceRange">; label: string }[] =
  [
    { key: "style", label: "Style" },
    { key: "material", label: "Material" },
    { key: "room", label: "Room" },
    { key: "dimensions", label: "Dimensions / Size" },
  ];

function uniqueSorted(values: (string | undefined)[]) {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getFilterDefinitions(products: Product[]): FilterOption[] {
  const groups: FilterOption[] = ATTRIBUTE_FILTERS.map(({ key, label }) => ({
    key,
    label,
    values: uniqueSorted(products.map((product) => product[key])),
  }));

  if (products.some((product) => product.price != null)) {
    groups.splice(3, 0, {
      key: "priceRange",
      label: "Price Range",
      values: [...PRICE_RANGE_VALUES],
    });
  }

  return groups.filter((group) => group.values.length > 0);
}

export function filterProducts(
  products: Product[],
  filters: ActiveFilters,
  searchQuery = "",
): Product[] {
  const query = searchQuery.trim().toLowerCase();

  return products.filter((product) => {
    const matchesFilters = (
      Object.entries(filters) as [FilterKey, string][]
    ).every(([key, value]) => {
      if (!value) return true;
      if (key === "priceRange") {
        return matchesPriceRange(product.price, value);
      }
      return product[key] === value;
    });

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
