import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, formatPrice } from "@/lib/products";
import { getProductMetaLine } from "@/lib/filters";
import { buildWhatsAppUrlStatic } from "@/lib/whatsapp";
import { GlassPanel } from "@/components/glass-panel";
import { SiteHeader } from "@/components/site-header";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

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
    <div className="page-shell min-h-screen">
      <div className="mx-auto max-w-[1600px] px-3 pt-3 md:px-5 md:pt-4">
        <SiteHeader />
      </div>

      <main className="mx-auto grid max-w-[1200px] gap-6 px-3 py-6 md:grid-cols-2 md:px-5 md:py-10">
        <GlassPanel variant="light" className="overflow-hidden p-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#fafafa]/70">
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.imageAlt ?? product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : null}
          </div>
        </GlassPanel>

        <GlassPanel variant="light" className="p-6 md:p-8">
          {meta ? (
            <p className="font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#777]">
              {meta}
            </p>
          ) : null}

          <h1 className="mt-2 font-serif text-4xl text-[#1a1a1a]">{product.title}</h1>

          {product.sku ? (
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.1em] text-[#999]">
              {product.sku}
            </p>
          ) : null}

          {price ? (
            <p className="mt-5 font-sans text-xl text-[#1a1a1a]">{price}</p>
          ) : null}

          {product.shortDescription ? (
            <p className="mt-5 font-serif text-lg text-[#555]">
              {product.shortDescription}
            </p>
          ) : null}

          {product.description ? (
            <p className="mt-4 font-serif leading-relaxed text-[#555]">
              {product.description}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrlStatic(product, origin)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a962] px-6 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white transition hover:bg-[#a8893f]"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href="/shop"
              className="rounded-full border border-[#c9a962]/40 bg-white/50 px-6 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962] hover:text-[#c9a962]"
            >
              Back to Shop
            </Link>
          </div>
        </GlassPanel>
      </main>
    </div>
  );
}
