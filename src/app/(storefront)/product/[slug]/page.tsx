import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  getSalePercent,
  getSizeLabels,
  getStartingPrice,
  isOnSale,
} from "@/lib/pricing";
import { getProductBySlug, getProductSlugs } from "@/lib/products";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const description =
    product.shortDescription ??
    product.description?.slice(0, 160) ??
    `${product.title} — luxury lighting by Chandelier Solderie`;

  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      images: product.imageUrl ? [{ url: product.imageUrl }] : undefined,
      type: "website",
    },
  };
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

function DetailPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center border border-line px-3 py-1.5 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-gold-bright">
      {children}
    </span>
  );
}

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 gap-1 border-b border-line py-3 font-sans text-sm last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="uppercase tracking-[0.12em] text-faint">{label}</dt>
      <dd className="text-ivory">{value}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const starting = { ...product, ...getStartingPrice(product) };
  const salePercent = getSalePercent(starting);
  const showSale = isOnSale(product);
  const sizeLabels = getSizeLabels(product);

  return (
    <div className="page-shell min-h-[var(--cs-viewport-height)]">
      <SiteHeader />

      <main className="relative mx-auto max-w-[1240px] px-3 pb-12 pt-[calc(var(--cs-header-height)+0.25rem)] sm:px-6 sm:pb-16">
        <header className="mb-3 sm:mb-4">
          <Link
            href="/shop"
            className="inline-flex min-h-9 items-center gap-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-muted transition hover:text-gold-bright"
          >
            <span aria-hidden className="text-gold">
              ←
            </span>
            The Collection
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <section className="lg:col-span-7">
            <div className="mx-auto w-[75%] lg:mx-0">
              <ProductGallery product={product} />
            </div>
          </section>

          <aside className="lg:col-span-5">
            <div className="h-full lg:border-l lg:border-line lg:pl-10 xl:pl-12">
              <p className="font-castellar text-[0.6875rem] uppercase tracking-[0.3em] text-gold">
                Chandelier Solderie
              </p>

              <h1 className="mt-4 font-serif text-[1.875rem] font-normal leading-[1.12] text-ivory sm:text-4xl md:text-[2.75rem]">
                {product.title}
              </h1>

              {(product.sku || product.collectionTitle) ? (
                <p className="mt-3 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-faint">
                  {product.sku ? `Ref. ${product.sku}` : null}
                  {product.sku && product.collectionSlug ? " · " : null}
                  {product.collectionSlug && product.collectionTitle ? (
                    <Link
                      href={`/collection/${product.collectionSlug}`}
                      className="transition hover:text-gold-bright"
                    >
                      {product.collectionTitle}
                    </Link>
                  ) : null}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                {showSale ? (
                  <DetailPill>
                    {salePercent ? `Sale −${salePercent}%` : "Sale"}
                  </DetailPill>
                ) : null}
                {product.style ? <DetailPill>{product.style}</DetailPill> : null}
                {product.material ? (
                  <DetailPill>{product.material}</DetailPill>
                ) : null}
                {product.room ? <DetailPill>{product.room}</DetailPill> : null}
              </div>

              {product.shortDescription ? (
                <p className="mt-7 border-l border-gold pl-4 font-serif text-lg italic leading-relaxed text-ivory sm:text-xl">
                  {product.shortDescription}
                </p>
              ) : null}

              {product.description ? (
                <p className="mt-5 font-serif text-base leading-[1.8] text-muted">
                  {product.description}
                </p>
              ) : null}

              <ProductPurchase product={product} origin={origin} />

              <div className="mt-3">
                <Link href="/shop" className="btn btn--ghost w-full">
                  Continue Through the Collection
                </Link>
              </div>

              <div className="mt-11">
                <p className="mb-3 font-sans text-[0.625rem] uppercase tracking-[0.22em] text-gold">
                  Specifications
                </p>
                <dl className="border-t border-line">
                  <SpecRow label="Collection" value={product.collectionTitle} />
                  <SpecRow label="SKU" value={product.sku} />
                  <SpecRow label="Style" value={product.style} />
                  <SpecRow label="Material" value={product.material} />
                  <SpecRow label="Room" value={product.room} />
                  <SpecRow
                    label="Size"
                    value={sizeLabels.join(" · ") || product.dimensions}
                  />
                </dl>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
