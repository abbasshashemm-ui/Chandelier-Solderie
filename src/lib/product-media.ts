import type { Product } from "./types";

export function getProductVideoUrl(product: Product): string | undefined {
  return product.videoUrl || undefined;
}

function assetKey(url: string) {
  return url.split("?")[0];
}

export function getProductGalleryUrls(product: Product): string[] {
  const gallery = Array.isArray(product.galleryUrls)
    ? product.galleryUrls
    : [];

  const urls = [product.imageUrl, ...gallery].filter(
    (url): url is string => Boolean(url),
  );

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const url of urls) {
    const key = assetKey(url);
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(url);
  }

  return unique;
}
