import type { MetadataRoute } from "next";
import { getCollectionSlugs } from "@/lib/collections";
import { getProductSlugs } from "@/lib/products";
import { siteUrl } from "@/lib/site-metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, collectionSlugs] = await Promise.all([
    getProductSlugs(),
    getCollectionSlugs(),
  ]);

  const productEntries: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${siteUrl}/product/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const collectionEntries: MetadataRoute.Sitemap = collectionSlugs.map(
    (slug) => ({
      url: `${siteUrl}/collection/${slug}`,
      changeFrequency: "weekly",
      priority: 0.85,
    }),
  );

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
    ...collectionEntries,
    ...productEntries,
  ];
}
