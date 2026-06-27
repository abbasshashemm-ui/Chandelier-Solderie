import { SiteHeader } from "@/components/site-header";
import { CatalogueView } from "@/components/catalogue-view";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="page-shell min-h-screen">
      <div className="mx-auto max-w-[1600px] px-3 pt-3 md:px-5 md:pt-4">
        <SiteHeader />
      </div>
      <CatalogueView products={products} title="Full Archive" />
    </div>
  );
}
