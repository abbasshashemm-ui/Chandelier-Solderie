import { HomeView } from "@/components/home-view";
import { getFeaturedProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getFeaturedProducts(8);

  return (
    <div className="page-shell min-h-screen">
      <HomeView products={products} />
    </div>
  );
}
