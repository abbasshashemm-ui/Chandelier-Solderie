"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
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
  const galleryUrls = getProductGalleryUrls(product);
  const videoUrl = getProductVideoUrl(product);
  const poster = galleryUrls[0] ?? product.imageUrl ?? "";
  const videoRef = useRef<HTMLVideoElement>(null);

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
  const [paused, setPaused] = useState(false);

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video || active?.kind !== "video") {
      setPaused(false);
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.disablePictureInPicture = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");
    video.removeAttribute("controls");

    const syncPaused = () => setPaused(video.paused);
    video.addEventListener("play", syncPaused);
    video.addEventListener("pause", syncPaused);

    void video.play().catch(() => setPaused(true));

    return () => {
      video.removeEventListener("play", syncPaused);
      video.removeEventListener("pause", syncPaused);
    };
  }, [active]);

  const updateOrigin = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    setOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const showZoom = canHoverZoom && zooming && active?.kind === "image";

  return (
    <div className="w-full">
      <div className="media-stage border border-line">
        <span aria-hidden className="cs-bloom cs-bloom--frame" />
        <div
          className={`media-stage__slot z-10 ${
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
              ref={videoRef}
              src={active.url}
              width={4}
              height={5}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={active.poster || undefined}
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center center",
              }}
              {...{ "webkit-playsinline": "true" }}
            />
          ) : active?.kind === "image" ? (
            <Image
              src={active.url}
              alt={active.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center transition-transform duration-300 ease-out"
              placeholder={product.imageLqip ? "blur" : "empty"}
              blurDataURL={product.imageLqip}
              style={{
                transformOrigin: `${origin.x}% ${origin.y}%`,
                transform: showZoom ? "scale(1.85)" : "scale(1)",
              }}
            />
          ) : null}

          {active?.kind === "video" ? (
            <button
              type="button"
              className="absolute inset-0 z-20 flex items-center justify-center"
              aria-label={paused ? "Play film" : "Pause film"}
              onClick={togglePlayback}
            >
              {paused ? (
                <span
                  aria-hidden
                  className="flex size-14 items-center justify-center border border-gold/60 bg-black/55 font-sans text-lg text-gold-bright"
                >
                  ▶
                </span>
              ) : null}
            </button>
          ) : null}
        </div>
      </div>

      {items.length > 1 ? (
        <div className="gallery-thumbs mt-5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-2 pr-16 sm:mt-6 sm:gap-3 sm:pr-2">
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
