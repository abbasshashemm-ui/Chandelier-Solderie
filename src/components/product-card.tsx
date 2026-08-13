import Image from "next/image";
import Link from "next/link";
import { getProductMetaLine } from "@/lib/filters";
import { getSalePercent, isOnSale } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import { PriceDisplay } from "./price-display";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const meta = getProductMetaLine(product);
  const salePercent = getSalePercent(product);
  const showSale = isOnSale(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors duration-500 hover:border-line-strong">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-ink-deep sm:aspect-square"
      >
        {product.imageUrl ? (
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover"
              placeholder={product.imageLqip ? "blur" : "empty"}
              blurDataURL={product.imageLqip}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-faint">
            No image
          </div>
        )}

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {showSale ? (
          <span className="absolute left-3 top-3 border border-gold/50 bg-gold px-2.5 py-1 font-sans text-[0.5rem] uppercase tracking-[0.2em] text-ink">
            {salePercent ? `−${salePercent}%` : "Sale"}
          </span>
        ) : product.featured ? (
          <span className="absolute left-3 top-3 border border-gold/40 bg-black/55 px-2.5 py-1 font-sans text-[0.5rem] uppercase tracking-[0.2em] text-gold-bright backdrop-blur-sm">
            Signature
          </span>
        ) : null}
      </Link>

      <div className="mt-auto flex h-[7.25rem] shrink-0 flex-col border-t border-line px-4 py-4 sm:h-[7.5rem] sm:px-5 sm:py-5">
        <p className="h-3 shrink-0 font-sans text-[0.5625rem] uppercase leading-none tracking-[0.2em] text-gold">
          {meta ?? "\u00A0"}
        </p>

        <h3 className="mt-2 min-h-[2.5rem] shrink-0 font-serif text-[0.95rem] font-medium leading-snug text-ivory line-clamp-2 sm:text-base">
          <Link
            href={`/product/${product.slug}`}
            className="transition-colors duration-300 hover:text-gold-bright"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex shrink-0 items-end justify-between gap-2 pt-2">
          {product.price != null ? (
            <PriceDisplay product={product} />
          ) : (
            <span className="block h-5" aria-hidden />
          )}

          <p className="pb-0.5 font-sans text-[0.5rem] uppercase leading-none tracking-[0.14em] text-faint">
            {product.sku ?? "\u00A0"}
          </p>
        </div>
      </div>
    </article>
  );
}
