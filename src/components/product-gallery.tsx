"use client";

import Image from "next/image";
import { useState } from "react";
import { getProductGalleryUrls, getProductVideoUrl } from "@/lib/product-media";
import type { Product } from "@/lib/types";

type ProductGalleryProps = {
  product: Product;
};

type GalleryItem =
  | { kind: "video"; url: string; poster: string; label: string }
  | { kind: "image"; url: string; alt: string; label: string };

const thumbBase =
  "group/thumb relative size-[4.75rem] shrink-0 snap-center overflow-hidden border bg-ink-deep transition duration-500 sm:size-[5.75rem] md:size-[6.5rem]";

export function ProductGallery({ product }: ProductGalleryProps) {
  const galleryUrls = getProductGalleryUrls(product, 3);
  const videoUrl = getProductVideoUrl(product);
  const poster = galleryUrls[0] ?? product.imageUrl ?? "";

  const items: GalleryItem[] = [
    ...(videoUrl
      ? [{ kind: "video" as const, url: videoUrl, poster, label: "Film" }]
      : []),
    ...galleryUrls.map((url, index) => ({
      kind: "image" as const,
      url,
      alt: `${product.imageAlt ?? product.title} — view ${index + 1}`,
      label: `View ${index + 1}`,
    })),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  return (
    <div className="w-full">
      <div className="relative overflow-hidden border border-line bg-ink-deep">
        <div className="relative flex aspect-[4/5] w-full items-center justify-center sm:aspect-square">
          {active?.kind === "video" ? (
            <video
              key={active.url}
              src={active.url}
              className="aspect-[9/16] h-full w-auto max-w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              poster={active.poster || undefined}
            />
          ) : active?.kind === "image" ? (
            <Image
              src={active.url}
              alt={active.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          ) : null}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="mt-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] sm:mt-6 sm:gap-3">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.kind}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={
                  item.kind === "video" ? "View product film" : `View ${item.label}`
                }
                aria-pressed={isActive}
                className={`${thumbBase} ${
                  isActive
                    ? "border-gold"
                    : "border-line hover:border-line-strong"
                }`}
              >
                {item.kind === "video" ? (
                  <>
                    {item.poster ? (
                      <Image
                        src={item.poster}
                        alt=""
                        fill
                        sizes="104px"
                        className="object-cover opacity-80 transition duration-500 group-hover/thumb:scale-105"
                      />
                    ) : null}
                    <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="flex size-9 items-center justify-center border border-gold/60 bg-black/60 font-sans text-[0.625rem] text-gold-bright">
                        ▶
                      </span>
                    </span>
                  </>
                ) : (
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    sizes="104px"
                    className={`object-cover transition duration-500 group-hover/thumb:scale-105 ${
                      isActive ? "" : "opacity-70 group-hover/thumb:opacity-100"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
