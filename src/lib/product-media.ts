import type { Product } from "./types";

export function getProductVideoUrl(product: Product): string | undefined {
  return product.videoUrl || undefined;
}

/**
 * Main image first (so the product page always opens on the same picture as
 * the listing card), then the gallery, skipping duplicates of the main image.
 */
export function getProductGalleryUrls(product: Product, count = 4): string[] {
  const urls = [product.imageUrl, ...(product.galleryUrls ?? [])].filter(
    (url): url is string => Boolean(url),
  );

  return [...new Set(urls)].slice(0, count);
}
