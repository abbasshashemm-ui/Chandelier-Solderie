import type { Product } from "./types";

export function getProductVideoUrl(product: Product): string | undefined {
  return product.videoUrl || undefined;
}

export function getProductGalleryUrls(product: Product, count = 3): string[] {
  if (product.galleryUrls?.length) {
    return product.galleryUrls.filter(Boolean).slice(0, count);
  }

  if (product.imageUrl) {
    return [product.imageUrl];
  }

  return [];
}
