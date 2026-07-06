import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { GlassPanel } from "@/components/glass-panel";
import { ProductGallery } from "@/components/product-gallery";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProductBySlug, getProductSlugs } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { getProductMetaLine } from "@/lib/filters";
import { buildWhatsAppUrlStatic } from "@/lib/whatsapp";

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
    <span className="inline-flex items-center border border-[#c9a962]/30 bg-white/45 px-3 py-1 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#5c4d2e] backdrop-blur-md">
      {children}
    </span>
  );
}

function SpecRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;

  return (
    <div className="grid grid-cols-1 gap-1 border-b border-[#c9a962]/12 py-3 font-sans text-sm last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="uppercase tracking-[0.1em] text-[#999]">{label}</dt>
      <dd className="text-[#1a1a1a]">{value}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const meta = getProductMetaLine(product);
  const price = formatPrice(product.price);
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return (
    <div className="page-shell min-h-[var(--cs-viewport-height)]">
      <SiteHeader />

      <main className="relative isolate mx-auto max-w-[1240px] px-3 pb-8 pt-[calc(var(--cs-header-height)+0.375rem)] sm:px-6 sm:pb-10 md:pb-12">
        <div className="relative z-10">
          <header className="mb-6 sm:mb-10">
            <Link
              href="/shop"
              className="inline-flex min-h-11 items-center gap-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#777] transition hover:text-[#c9a962]"
            >
              <span aria-hidden className="text-[#c9a962]">
                ←
              </span>
              The Collection
            </Link>
            <div className="mt-5 h-px w-full max-w-md bg-gradient-to-r from-[#c9a962] via-[#c9a962]/50 to-transparent" />
            <p className="mt-4 font-castellar text-[0.7rem] uppercase tracking-[0.28em] text-[#a8893f] sm:text-xs">
              Chandelier Solderie
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
            <section className="lg:col-span-7">
              <GlassPanel
                variant="light"
                className="p-2 shadow-[0_24px_64px_rgba(26,26,26,0.09),inset_0_1px_0_rgba(255,255,255,0.95)] ring-1 ring-[#c9a962]/15 sm:p-4"
              >
                <ProductGallery product={product} />
              </GlassPanel>
            </section>

            <aside className="lg:col-span-5">
              <GlassPanel
                variant="gold"
                className="h-full p-4 shadow-[0_20px_56px_rgba(201,169,98,0.14),inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-[#c9a962]/25 sm:p-8 md:p-10"
              >
                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2">
                    {product.style ? <DetailPill>{product.style}</DetailPill> : null}
                    {product.material ? <DetailPill>{product.material}</DetailPill> : null}
                    {product.room ? <DetailPill>{product.room}</DetailPill> : null}
                  </div>

                  {meta && !product.style ? (
                    <p className="mt-3 font-sans text-[0.625rem] uppercase tracking-[0.16em] text-[#888]">
                      {meta}
                    </p>
                  ) : null}

                  <h1 className="mt-5 font-serif text-[1.75rem] font-medium leading-[1.15] text-[#1a1a1a] sm:text-4xl">
                    {product.title}
                  </h1>

                  <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-[#c9a962] to-transparent sm:my-6" />

                  {product.sku ? (
                    <p className="font-sans text-[0.625rem] uppercase tracking-[0.14em] text-[#999]">
                      Ref. {product.sku}
                    </p>
                  ) : null}

                  {price ? (
                    <div className="mt-6 border-y border-[#c9a962]/20 py-5">
                      <p className="font-sans text-[0.625rem] uppercase tracking-[0.18em] text-[#888]">
                        Price
                      </p>
                      <p className="mt-1 font-serif text-3xl tracking-wide text-[#a8893f] sm:text-4xl">
                        {price}
                      </p>
                    </div>
                  ) : null}

                  {product.shortDescription ? (
                    <p className="mt-6 border-l-2 border-[#c9a962]/60 pl-4 font-serif text-lg italic leading-relaxed text-[#444] sm:text-xl">
                      {product.shortDescription}
                    </p>
                  ) : null}

                  {product.description ? (
                    <p className="mt-5 font-serif text-base leading-[1.75] text-[#555]">
                      {product.description}
                    </p>
                  ) : null}

                  <div className="mt-8 space-y-3 sm:mt-10">
                    <a
                      href={buildWhatsAppUrlStatic(product, origin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 w-full items-center justify-center bg-gradient-to-r from-[#c9a962] to-[#a8893f] px-6 py-3.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white shadow-[0_10px_32px_rgba(201,169,98,0.35)] transition hover:from-[#d4bc7a] hover:to-[#c9a962] hover:shadow-[0_14px_40px_rgba(201,169,98,0.42)]"
                    >
                      Inquire on WhatsApp
                    </a>

                    <Link
                      href="/shop"
                      className="flex min-h-11 w-full items-center justify-center border border-[#c9a962]/35 bg-white/50 px-6 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962] hover:bg-white/70 hover:text-[#a8893f]"
                    >
                      Continue Through the Collection
                    </Link>
                  </div>

                  <div className="mt-10">
                    <p className="mb-3 font-sans text-[0.625rem] uppercase tracking-[0.18em] text-[#a8893f]">
                      Specifications
                    </p>
                    <dl className="border-t border-[#c9a962]/15">
                      <SpecRow label="Category" value={product.category} />
                      <SpecRow label="SKU" value={product.sku} />
                      <SpecRow label="Style" value={product.style} />
                      <SpecRow label="Material" value={product.material} />
                      <SpecRow label="Room" value={product.room} />
                      <SpecRow label="Size" value={product.dimensions} />
                    </dl>
                  </div>
                </div>
              </GlassPanel>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
