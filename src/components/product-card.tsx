"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/products";
import { getProductMetaLine } from "@/lib/filters";
import type { Product } from "@/lib/types";
import { GlassPanel } from "./glass-panel";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  onQuickView: (product: Product) => void;
};

export function ProductCard({
  product,
  priority = false,
  onQuickView,
}: ProductCardProps) {
  const meta = getProductMetaLine(product);
  const price = formatPrice(product.price);

  return (
    <GlassPanel
      as="article"
      variant="light"
      className="group overflow-hidden p-3 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(26,26,26,0.08)]"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-[#fafafa]/80">
        <Link href={`/product/${product.slug}`} className="block aspect-square">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-serif text-[#777]">
              No image
            </div>
          )}
        </Link>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/70 bg-white/70 px-4 py-2 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#1a1a1a] opacity-0 backdrop-blur-md transition duration-300 group-hover:opacity-100 hover:bg-[#c9a962] hover:text-white"
        >
          Quick View
        </button>
      </div>

      <div className="space-y-2 px-1 pb-1">
        {meta ? (
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#777]">
            {meta}
          </p>
        ) : null}

        <h3 className="font-serif text-lg leading-tight text-[#1a1a1a]">
          <Link
            href={`/product/${product.slug}`}
            className="transition hover:text-[#c9a962]"
          >
            {product.title}
          </Link>
        </h3>

        {product.sku ? (
          <p className="font-sans text-[0.625rem] uppercase tracking-[0.1em] text-[#999]">
            {product.sku}
          </p>
        ) : null}

        {product.shortDescription ? (
          <p className="line-clamp-2 font-serif text-sm text-[#555]">
            {product.shortDescription}
          </p>
        ) : null}

        {price ? (
          <p className="font-sans text-sm tracking-wide text-[#1a1a1a]">{price}</p>
        ) : null}
      </div>
    </GlassPanel>
  );
}
