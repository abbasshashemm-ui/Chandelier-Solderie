export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteName = "Chandelier Solderie";

export const siteDescription =
  "Luxury lighting catalogue — curated chandeliers and pendants in Lebanon.";

export const siteOgAlt =
  "Chandelier Solderie — luxury lighting catalogue in Lebanon";

export const siteIcons = {
  icon: [{ url: "/logo-mark.png", type: "image/png" }],
  apple: [{ url: "/logo-mark.png", type: "image/png" }],
};

export const siteOpenGraph = {
  title: siteName,
  description: siteDescription,
  siteName,
  locale: "en_US",
  type: "website" as const,
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: siteOgAlt,
    },
  ],
};

export const siteTwitter = {
  card: "summary_large_image" as const,
  title: siteName,
  description: siteDescription,
  images: ["/opengraph-image"],
};
