import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogueClient } from "@/components/catalogue-client";
import { CatalogueView } from "@/components/catalogue-view";
import { paginateProducts } from "@/lib/catalogue";
import { getCollectionBySlug, getCollectionSlugs } from "@/lib/collections";
import { getFilterDefinitions } from "@/lib/filters";
import { getProductsByCollection } from "@/lib/products";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return { title: "Collection Not Found" };
  }

  return {
    title: collection.title,
    description:
      collection.description ??
      `${collection.title} — luxury lighting by Chandelier Solderie`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = await getProductsByCollection(
    slug,
    collection.includeSaleItems,
  );
  const filterGroups = getFilterDefinitions(products);
  const pathname = `/collection/${slug}`;
  const initial = paginateProducts(products, {}, "", 1);

  return (
    <div className="page-shell min-h-screen">
      <Suspense
        fallback={
          <CatalogueView
            title={collection.title}
            pathname={pathname}
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
          title={collection.title}
          pathname={pathname}
          products={products}
          filterGroups={filterGroups}
        />
      </Suspense>
    </div>
  );
}
