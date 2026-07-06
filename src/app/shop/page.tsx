import { Suspense } from "react";
import { CatalogueView } from "@/components/catalogue-view";
import { CatalogueLoading } from "@/components/catalogue-loading";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description:
    "Browse curated chandeliers and luxury lighting from Chandelier Solderie, Lebanon.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="page-shell min-h-screen">
      <Suspense fallback={<CatalogueLoading title="Shop" />}>
        <CatalogueView products={products} title="Shop" />
      </Suspense>
    </div>
  );
}
