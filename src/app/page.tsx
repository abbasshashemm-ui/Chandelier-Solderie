import { HomeView } from "@/components/home-view";
import { getFeaturedCollections } from "@/lib/collections";

export const revalidate = 3600;

export default async function HomePage() {
  const collections = await getFeaturedCollections(8);

  return (
    <div className="page-shell min-h-screen">
      <HomeView collections={collections} />
    </div>
  );
}
