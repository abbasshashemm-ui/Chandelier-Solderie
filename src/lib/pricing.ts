import { formatPrice } from "./format";
import type { Product, ProductSize } from "./types";

export function getProductSizes(product: Product): ProductSize[] {
  return product.sizes ?? [];
}

export function getStartingPrice(product: Product): {
  price?: number;
  compareAtPrice?: number;
} {
  const sizes = getProductSizes(product);
  if (sizes.length === 0) {
    return { price: product.price, compareAtPrice: product.compareAtPrice };
  }

  const cheapest = sizes.reduce((lowest, size) =>
    size.price < lowest.price ? size : lowest,
  );

  return {
    price: cheapest.price,
    compareAtPrice: cheapest.compareAtPrice,
  };
}

export function hasMultipleSizePrices(product: Product) {
  const prices = new Set(getProductSizes(product).map((size) => size.price));
  return prices.size > 1;
}

export function getProductPrices(product: Product) {
  const sizes = getProductSizes(product);
  if (sizes.length > 0) return sizes.map((size) => size.price);
  return product.price != null ? [product.price] : [];
}

export function getSizeLabels(product: Product) {
  const sizes = getProductSizes(product);
  if (sizes.length > 0) return sizes.map((size) => size.label);
  return product.dimensions ? [product.dimensions] : [];
}

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
