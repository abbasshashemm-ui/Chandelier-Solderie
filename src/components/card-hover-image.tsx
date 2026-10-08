"use client";

import { useEffect, useRef, useState } from "react";
import { SanityImage } from "./sanity-image";

type CardHoverImageProps = {
  src: string;
  alt: string;
  sizes: string;
};

/**
 * Second photo that fades in when a mouse hovers the card. It is only fetched
 * on the first mouse hover, so it adds no weight to the page load and nothing
 * on touch devices.
 */
export function CardHoverImage({ src, alt, sizes }: CardHoverImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const link = ref.current?.closest("a");
    if (!link) return;

    const arm = (event: PointerEvent) => {
      if (event.pointerType === "mouse") setArmed(true);
    };
    link.addEventListener("pointerenter", arm);
    return () => link.removeEventListener("pointerenter", arm);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100"
    >
      {armed ? (
        <SanityImage
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
