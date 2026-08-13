import { HomeView } from "@/components/home-view";
import { getFeaturedCollections, getHomepagePromo } from "@/lib/collections";
import { getProducts } from "@/lib/products";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 3600;

export default async function HomePage() {
  const [collections, promo, settings, products] = await Promise.all([
    getFeaturedCollections(8),
    getHomepagePromo(),
    getSiteSettings(),
    getProducts(),
  ]);

  return (
    <div className="page-shell min-h-screen">
      <HomeView
        collections={collections}
        promo={promo}
        settings={settings}
        showcaseProducts={products}
      />
    </div>
  );
}
