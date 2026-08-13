import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CatalogueView } from "@/components/catalogue-view";
import { CatalogueLoading } from "@/components/catalogue-loading";
import { getCollectionBySlug, getCollectionSlugs } from "@/lib/collections";
import { getProductsByCollection } from "@/lib/products";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

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

  return (
    <div className="page-shell min-h-screen">
      <Suspense fallback={<CatalogueLoading title={collection.title} />}>
        <CatalogueView products={products} title={collection.title} />
      </Suspense>
    </div>
  );
}
