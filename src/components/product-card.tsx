"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { getProductMetaLine } from "@/lib/filters";
import type { Product } from "@/lib/types";
import { GlassPanel } from "./glass-panel";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const meta = getProductMetaLine(product);
  const price = formatPrice(product.price);

  return (
    <GlassPanel
      as="article"
      variant="light"
      className="group flex h-full flex-col overflow-hidden p-0 ring-1 ring-[#c9a962]/10 shadow-[0_8px_32px_rgba(26,26,26,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_56px_rgba(201,169,98,0.16),inset_0_1px_0_rgba(255,255,255,1)] hover:ring-[#c9a962]/30"
    >
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(26,26,26,0.06)_100%)] opacity-0 transition duration-500 group-hover:opacity-100"
        />

        <Link
          href={`/product/${product.slug}`}
          className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#f5efe3] via-[#faf7f2] to-[#ebe3d4] sm:aspect-square"
        >
          {product.imageUrl ? (
            <div className="absolute inset-0 transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover:scale-[1.06]">
              <Image
                src={product.imageUrl}
                alt={product.imageAlt ?? product.title}
                fill
                priority={priority}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center font-serif text-[#999]">
              No image
            </div>
          )}
        </Link>

        {product.featured ? (
          <span className="absolute left-3 top-3 z-10 border border-[#c9a962]/40 bg-[#1a1a1a]/55 px-2.5 py-1 font-sans text-[0.5rem] uppercase tracking-[0.16em] text-[#f5e6b8] backdrop-blur-md">
            Signature
          </span>
        ) : null}

        <Link
          href={`/product/${product.slug}`}
          className="absolute bottom-3 left-1/2 z-10 flex min-h-11 w-[calc(100%-1.5rem)] max-w-[12rem] -translate-x-1/2 items-center justify-center border border-[#c9a962]/35 bg-gradient-to-r from-[#c9a962]/95 to-[#a8893f]/95 px-4 py-3 text-center font-sans text-[0.625rem] font-medium uppercase tracking-[0.14em] text-white opacity-100 shadow-[0_8px_24px_rgba(201,169,98,0.35)] backdrop-blur-sm transition duration-500 sm:bottom-4 sm:max-w-none sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 translate-y-1 hover:from-[#d4bc7a] hover:to-[#c9a962]"
        >
          View Piece
        </Link>
      </div>

      <div className="mt-auto flex h-[7.25rem] shrink-0 flex-col border-t border-[#c9a962]/12 bg-gradient-to-b from-white/30 to-white/10 px-4 py-4 sm:h-[7.5rem] sm:px-5 sm:py-5">
        <p className="h-3 shrink-0 font-sans text-[0.5625rem] uppercase leading-none tracking-[0.18em] text-[#a8893f]">
          {meta ?? "\u00A0"}
        </p>

        <h3 className="mt-2 min-h-[2.5rem] shrink-0 font-serif text-[0.95rem] font-medium leading-snug text-[#1a1a1a] line-clamp-2 sm:text-base">
          <Link
            href={`/product/${product.slug}`}
            className="transition duration-300 hover:text-[#a8893f]"
          >
            {product.title}
          </Link>
        </h3>

        <div className="mt-auto flex shrink-0 flex-col pt-2">
          {price ? (
            <p className="font-serif text-base tracking-wide text-[#a8893f] sm:text-lg">
              {price}
            </p>
          ) : (
            <span className="block h-5" aria-hidden />
          )}

          <p className="mt-1 h-3 font-sans text-[0.5rem] uppercase leading-none tracking-[0.12em] text-[#aaa]">
            {product.sku ?? "\u00A0"}
          </p>
        </div>
      </div>
    </GlassPanel>
  );
}
