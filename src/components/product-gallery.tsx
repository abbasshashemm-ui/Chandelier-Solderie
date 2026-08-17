"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
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

  const [canHoverZoom, setCanHoverZoom] = useState(false);
  const [zooming, setZooming] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setCanHoverZoom(hoverQuery.matches && !motionQuery.matches);
      if (!hoverQuery.matches || motionQuery.matches) setZooming(false);
    };

    sync();
    hoverQuery.addEventListener("change", sync);
    motionQuery.addEventListener("change", sync);
    return () => {
      hoverQuery.removeEventListener("change", sync);
      motionQuery.removeEventListener("change", sync);
    };
  }, []);

  const updateOrigin = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const showZoom = canHoverZoom && zooming && active?.kind === "image";

  return (
    <div className="w-full">
      <div className="relative overflow-hidden border border-line bg-ink-deep">
        <span aria-hidden className="cs-bloom cs-bloom--frame" />
        <div
          className={`relative z-10 flex aspect-[4/5] w-full items-center justify-center overflow-hidden sm:aspect-square ${
            canHoverZoom && active?.kind === "image" ? "cursor-zoom-in" : ""
          }`}
          onMouseEnter={() => {
            if (canHoverZoom && active?.kind === "image") setZooming(true);
          }}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={
            canHoverZoom && active?.kind === "image" ? updateOrigin : undefined
          }
        >
          {active?.kind === "video" ? (
            <video
              key={active.url}
              src={active.url}
              className="h-full w-full max-h-full max-w-full object-contain"
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
              sizes="(max-width: 1024px) 75vw, 40vw"
              className="object-contain transition-transform duration-300 ease-out"
              placeholder={product.imageLqip ? "blur" : "empty"}
              blurDataURL={product.imageLqip}
              style={{
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transform: showZoom ? "scale(1.85)" : "scale(1)",
              }}
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
                onClick={() => {
                  setActiveIndex(index);
                  setZooming(false);
                }}
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
