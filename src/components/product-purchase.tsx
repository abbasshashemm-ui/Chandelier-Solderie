"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { getProductSizes } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import { buildWhatsAppUrlStatic } from "@/lib/whatsapp";
import { AddToCartButton } from "./add-to-cart-button";
import { PriceDisplay } from "./price-display";

type ProductPurchaseProps = {
  product: Product;
  origin: string;
};

export function ProductPurchase({ product, origin }: ProductPurchaseProps) {
  const sizes = getProductSizes(product);
  const [selectedKey, setSelectedKey] = useState(sizes[0]?._key ?? "");
  const selected = sizes.find((size) => size._key === selectedKey) ?? sizes[0];
  const view: Product = selected
    ? {
        ...product,
        price: selected.price,
        compareAtPrice: selected.compareAtPrice,
        sku: selected.sku?.trim() || product.sku,
        dimensions: selected.label,
      }
    : product;

  return (
    <>
      {sizes.length > 0 ? (
        <fieldset className="mt-7">
          <legend className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-gold">
            Size
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {sizes.map((size) => {
              const active = size._key === selected._key;
              return (
                <button
                  key={size._key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedKey(size._key)}
                  className={`min-h-11 border px-3 py-2 text-left transition ${
                    active
                      ? "border-gold bg-gold/10 text-ivory"
                      : "border-line text-muted hover:border-line-strong hover:text-ivory"
                  }`}
                >
                  <span className="block font-sans text-[0.625rem] uppercase tracking-[0.14em]">
                    {size.label}
                  </span>
                  <span className="mt-1 block font-serif text-sm text-gold-bright">
                    {formatPrice(size.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <PriceDisplay product={view} size="detail" />

      <div className="mt-9 space-y-3">
        <AddToCartButton
          product={{
            slug: product.slug,
            title: product.title,
            sku: view.sku,
            price: view.price,
            imageUrl: product.imageUrl,
            size: selected?.label,
          }}
        />
        <a
          href={buildWhatsAppUrlStatic(view, origin, selected?.label)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost w-full"
        >
          Inquire on WhatsApp
        </a>
      </div>
    </>
  );
}
