import { Suspense } from "react";
import { CatalogueView } from "@/components/catalogue-view";
import { CatalogueLoading } from "@/components/catalogue-loading";
import { parseCatalogueParams, paginateProducts } from "@/lib/catalogue";
import { getProducts } from "@/lib/products";

export const metadata = {
  title: "Shop",
  description:
    "Browse curated chandeliers and luxury lighting from Chandelier Solderie, Lebanon.",
};

export const revalidate = 3600;

type ShopPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const [products, params] = await Promise.all([
    getProducts(),
    searchParams,
  ]);
  const { filters, searchQuery, currentPage } = parseCatalogueParams(params);
  const { filtered, totalPages, safePage, pageItems } = paginateProducts(
    products,
    filters,
    searchQuery,
    currentPage,
  );

  return (
    <div className="page-shell min-h-screen">
      <Suspense fallback={<CatalogueLoading title="The Collection" />}>
        <CatalogueView
          title="The Collection"
          pathname="/shop"
          pageItems={pageItems}
          totalCount={filtered.length}
          totalPages={totalPages}
          currentPage={safePage}
          filters={filters}
          searchQuery={searchQuery}
          isEmpty={products.length === 0}
        />
      </Suspense>
    </div>
  );
}
