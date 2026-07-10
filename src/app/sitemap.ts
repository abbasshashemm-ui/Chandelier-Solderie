import type { MetadataRoute } from "next";
import { getProductSlugs } from "@/lib/products";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProductSlugs();

  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/product/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/shop`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/inquire`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/legal`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...productEntries,
  ];
}
