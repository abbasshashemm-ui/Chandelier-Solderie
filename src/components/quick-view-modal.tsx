"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { formatPrice } from "@/lib/products";
import { getProductMetaLine } from "@/lib/filters";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";
import { GlassPanel } from "./glass-panel";

type QuickViewModalProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  useEffect(() => {
    if (!product) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const meta = getProductMetaLine(product);
  const price = formatPrice(product.price);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      <button
        type="button"
        aria-label="Close quick view"
        className="absolute inset-0 bg-[#1a1a1a]/45 backdrop-blur-sm"
        onClick={onClose}
      />

      <GlassPanel
        variant="light"
        className="relative z-10 grid max-h-[90vh] w-full max-w-5xl overflow-hidden md:grid-cols-[1.1fr_0.9fr]"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/70 font-sans text-xl backdrop-blur-md transition hover:bg-[#1a1a1a] hover:text-white"
        >
          ×
        </button>

        <div className="relative min-h-[280px] bg-[#fafafa]/60 md:min-h-[520px]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 55vw"
            />
          ) : null}
        </div>

        <div className="overflow-y-auto p-6 md:p-8">
          {meta ? (
            <p className="mb-2 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#777]">
              {meta}
            </p>
          ) : null}

          <h2 className="font-serif text-3xl text-[#1a1a1a]">{product.title}</h2>

          {product.sku ? (
            <p className="mt-2 font-sans text-xs uppercase tracking-[0.1em] text-[#999]">
              {product.sku}
            </p>
          ) : null}

          {price ? (
            <p className="mt-4 font-sans text-lg text-[#1a1a1a]">{price}</p>
          ) : null}

          {product.shortDescription ? (
            <p className="mt-4 font-serif text-[#555]">{product.shortDescription}</p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9a962] px-5 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white transition hover:bg-[#a8893f]"
            >
              Inquire on WhatsApp
            </a>
            <Link
              href={`/product/${product.slug}`}
              className="rounded-full border border-[#c9a962]/40 bg-white/50 px-5 py-3 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962] hover:text-[#c9a962]"
            >
              View Details
            </Link>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
