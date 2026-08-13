import { formatPrice } from "./format";
import type { Product } from "./types";

export function matchesPriceRange(
  price: number | undefined,
  range: string,
): boolean {
  if (price == null || Number.isNaN(price)) return false;

  switch (range) {
    case "Under $50":
      return price < 50;
    case "$50 – $100":
      return price >= 50 && price <= 100;
    case "$100 – $500":
      return price > 100 && price <= 500;
    case "Over $500":
      return price > 500;
    default:
      return false;
  }
}

export function getSalePercent(product: Product): number | null {
  const current = product.price;
  const original = product.compareAtPrice;
  if (
    current == null ||
    original == null ||
    original <= 0 ||
    original <= current
  ) {
    return null;
  }

  return Math.round(((original - current) / original) * 100);
}

export function isOnSale(product: Product): boolean {
  return Boolean(product.onSale);
}

export function getDisplayPrices(product: Product) {
  const current = formatPrice(product.price);
  const original =
    product.compareAtPrice != null &&
    product.price != null &&
    product.compareAtPrice > product.price
      ? formatPrice(product.compareAtPrice)
      : null;

  return { current, original };
}
