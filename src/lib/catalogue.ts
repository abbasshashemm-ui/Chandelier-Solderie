import {
  PRODUCTS_PER_PAGE,
  filterProducts,
  type ActiveFilters,
} from "./filters";
import type { FilterKey, Product } from "./types";

export const CATALOGUE_FILTER_KEYS = [
  "style",
  "material",
  "room",
  "priceRange",
  "dimensions",
] as const satisfies readonly FilterKey[];

export type CatalogueSearchValues = Record<
  string,
  string | string[] | undefined
>;

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function all(value: string | string[] | undefined) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : [value];
  return [...new Set(list.map((item) => item.trim()).filter(Boolean))];
}

export function parseCatalogueParams(searchParams: CatalogueSearchValues) {
  const filters: ActiveFilters = {};
  for (const key of CATALOGUE_FILTER_KEYS) {
    const values = all(searchParams[key]);
    if (values.length > 0) filters[key] = values;
  }

  const searchQuery = first(searchParams.q)?.trim() ?? "";
  const currentPage = Math.max(1, Number(first(searchParams.page) ?? "1") || 1);

  return { filters, searchQuery, currentPage };
}

export function paginateProducts(
  products: Product[],
  filters: ActiveFilters,
  searchQuery: string,
  currentPage: number,
) {
  const filtered = filterProducts(products, filters, searchQuery);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PRODUCTS_PER_PAGE;

  return {
    filtered,
    totalPages,
    safePage,
    pageItems: filtered.slice(pageStart, pageStart + PRODUCTS_PER_PAGE),
  };
}

export function catalogueQueryString(options: {
  filters: ActiveFilters;
  searchQuery?: string;
  page?: number;
}) {
  const params = new URLSearchParams();

  for (const [key, values] of Object.entries(options.filters)) {
    for (const value of values ?? []) {
      if (value) params.append(key, value);
    }
  }
  if (options.searchQuery) params.set("q", options.searchQuery);
  if (options.page && options.page > 1) params.set("page", String(options.page));

  return params.toString();
}
