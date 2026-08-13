import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogueView } from "@/components/catalogue-view";
import { CatalogueLoading } from "@/components/catalogue-loading";
import { parseCatalogueParams, paginateProducts } from "@/lib/catalogue";
import { getCollectionBySlug, getCollectionSlugs } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
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

export default async function CollectionPage({
  params,
  searchParams,
}: CollectionPageProps) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const [products, query] = await Promise.all([
    getProductsByCollection(slug, collection.includeSaleItems),
    searchParams,
  ]);
  const { filters, searchQuery, currentPage } = parseCatalogueParams(query);
  const { filtered, totalPages, safePage, pageItems } = paginateProducts(
    products,
    filters,
    searchQuery,
    currentPage,
  );

  return (
    <div className="page-shell min-h-screen">
      <Suspense fallback={<CatalogueLoading title={collection.title} />}>
        <CatalogueView
          title={collection.title}
          pathname={`/collection/${slug}`}
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
