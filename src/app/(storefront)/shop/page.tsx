import { Suspense } from "react";
import { CatalogueClient } from "@/components/catalogue-client";
import { CatalogueView } from "@/components/catalogue-view";
import { paginateProducts } from "@/lib/catalogue";
import { getFilterDefinitions } from "@/lib/filters";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description:
    "Browse curated chandeliers and luxury lighting from Chandelier Solderie, Lebanon.",
};

export const revalidate = 3600;

export default async function ShopPage() {
  const products = await getProducts();
  const filterGroups = getFilterDefinitions(products);
  const initial = paginateProducts(products, {}, "", 1);

  return (
    <div className="page-shell min-h-screen">
      {/* Filters live in the URL and are applied in the browser, so the page
          itself stays static. The fallback is the unfiltered first page. */}
      <Suspense
        fallback={
          <CatalogueView
            title="The Collection"
            pathname="/shop"
            pageItems={initial.pageItems}
            totalCount={initial.filtered.length}
            totalPages={initial.totalPages}
            currentPage={initial.safePage}
            filters={{}}
            filterGroups={filterGroups}
            searchQuery=""
            isEmpty={products.length === 0}
          />
        }
      >
        <CatalogueClient
          title="The Collection"
          pathname="/shop"
          products={products}
          filterGroups={filterGroups}
        />
      </Suspense>
    </div>
  );
}
