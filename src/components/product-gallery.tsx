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
  "group/thumb relative size-[4.75rem] shrink-0 overflow-hidden border bg-white/40 backdrop-blur-xl backdrop-saturate-150 transition duration-500 sm:size-[5.75rem] md:size-[6.5rem]";

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
    <div className="relative z-10 w-full">
      <div className="relative overflow-hidden ring-1 ring-[#c9a962]/20 shadow-[0_20px_60px_rgba(26,26,26,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(26,26,26,0.07)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-1/4 top-0 z-0 h-full w-1/2 bg-[radial-gradient(circle,rgba(201,169,98,0.22),transparent_70%)] blur-2xl"
        />
        <div className="relative flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-[#f8f4ec]/90 via-white/50 to-[#efe6d4]/80 backdrop-blur-sm sm:aspect-square">
          {active?.kind === "video" ? (
            <video
              key={active.url}
              src={active.url}
              className="relative z-[2] aspect-[9/16] h-full w-auto max-w-full object-cover shadow-[0_12px_40px_rgba(26,26,26,0.18)]"
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
              className="relative z-[2] object-contain p-4 sm:p-8"
            />
          ) : null}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-[3] h-16 bg-gradient-to-t from-[#1a1a1a]/10 to-transparent"
        />
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:mt-6">
        <p className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-[#a8893f]">
          Gallery
        </p>
        <div className="flex gap-2.5 overflow-x-auto pb-1 sm:gap-3">
          {items.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={`${item.kind}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={item.kind === "video" ? "View product film" : `View ${item.label}`}
                aria-pressed={isActive}
                className={`${thumbBase} ${
                  isActive
                    ? "border-[#c9a962] shadow-[0_0_24px_rgba(201,169,98,0.28),inset_0_1px_0_rgba(255,255,255,0.9)]"
                    : "border-white/60 hover:border-[#c9a962]/45 hover:shadow-[0_4px_20px_rgba(201,169,98,0.12)]"
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
                        className="object-cover transition duration-500 group-hover/thumb:scale-105"
                      />
                    ) : null}
                    <span className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/25 backdrop-blur-[2px]">
                      <span className="flex size-9 items-center justify-center border border-[#c9a962]/50 bg-white/90 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-[#1a1a1a] shadow-sm">
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
                    className="object-cover transition duration-500 group-hover/thumb:scale-105"
                  />
                )}
                <span
                  className={`absolute bottom-0 left-0 right-0 z-10 py-1 text-center font-sans text-[0.5rem] uppercase tracking-[0.14em] ${
                    isActive ? "bg-[#c9a962]/90 text-white" : "bg-[#1a1a1a]/45 text-white/90"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
