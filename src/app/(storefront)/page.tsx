import { HomeView } from "@/components/home-view";
import { getFeaturedCollections, getHomepagePromo } from "@/lib/collections";

export const revalidate = 3600;

export default async function HomePage() {
  const [collections, promo] = await Promise.all([
    getFeaturedCollections(8),
    getHomepagePromo(),
  ]);

  return (
    <div className="page-shell min-h-screen">
      <HomeView collections={collections} promo={promo} />
    </div>
  );
}
