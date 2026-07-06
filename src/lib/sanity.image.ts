import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "./sanity.client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function buildProductImageUrl(
  source: SanityImageSource | undefined,
  width = 800,
) {
  if (!source) return undefined;

  return urlFor(source).width(width).auto("format").quality(85).url();
}
