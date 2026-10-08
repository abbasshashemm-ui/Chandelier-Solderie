"use client";

import { useState } from "react";
import { MapPinIcon } from "./social-icons";

type MapEmbedProps = {
  title: string;
  embedSrc: string;
  address: string;
  directionsHref: string;
};

/**
 * The Google Maps embed pulls in a lot of third-party code, so it only loads
 * once the visitor asks for it.
 */
export function MapEmbed({
  title,
  embedSrc,
  address,
  directionsHref,
}: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={embedSrc}
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <MapPinIcon className="size-7 text-gold" />
      <p className="max-w-xs font-serif text-lg leading-snug text-ivory">
        {address}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="btn btn--gold"
        >
          View Map
        </button>
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
        >
          Get Directions
        </a>
      </div>
    </div>
  );
}
