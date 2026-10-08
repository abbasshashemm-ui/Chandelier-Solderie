"use client";

import Image, { type ImageProps } from "next/image";
import sanityImageLoader from "@/lib/image-loader";

const SANITY_CDN = "https://cdn.sanity.io/";

/**
 * next/image that fetches Sanity CDN images at the requested width directly
 * from Sanity (already resized + auto-format) rather than routing them through
 * the Next.js optimizer a second time. Other sources use the default loader.
 */
export function SanityImage({ alt, ...props }: ImageProps) {
  const isSanity =
    typeof props.src === "string" && props.src.startsWith(SANITY_CDN);
  return (
    <Image
      {...props}
      alt={alt}
      loader={isSanity ? sanityImageLoader : undefined}
    />
  );
}
