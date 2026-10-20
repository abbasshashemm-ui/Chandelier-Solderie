import { HomeView } from "@/components/home-view";
import { getFeaturedCollections, getHomepagePromo } from "@/lib/collections";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export default async function HomePage() {
  const [collections, promo, settings] = await Promise.all([
    getFeaturedCollections(8),
    getHomepagePromo(),
    getSiteSettings(),
  ]);

  return (
    <div className="page-shell min-h-screen">
      <HomeView collections={collections} promo={promo} settings={settings} />
    </div>
  );
}
