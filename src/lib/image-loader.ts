// Sanity's CDN already resizes and picks the best format (auto=format), so
// request exactly the width next/image asks for instead of letting the Next.js
// optimizer download and re-encode an already-optimized image.
const MAX_SANITY_WIDTH = 2000;

type LoaderProps = { src: string; width: number; quality?: number };

export default function sanityImageLoader({ src, width, quality }: LoaderProps) {
  const url = new URL(src);
  const w = Math.min(width, MAX_SANITY_WIDTH);
  const baseW = Number(url.searchParams.get("w"));
  const baseH = Number(url.searchParams.get("h"));

  // Keep the aspect ratio of cropped renditions (e.g. w=800&h=800&fit=crop).
  if (baseW && baseH) {
    url.searchParams.set("h", String(Math.round((w * baseH) / baseW)));
  }
  url.searchParams.set("w", String(w));
  if (!url.searchParams.has("fit")) url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  url.searchParams.set("q", String(quality || 75));
  return url.toString();
}
