"use client";

import { useEffect, useRef, useState } from "react";

type InstagramReelProps = {
  src: string;
  poster: string;
};

export function InstagramReel({ src, poster }: InstagramReelProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !loaded) return;

    video.muted = true;
    video.defaultMuted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = true;
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_32%]"
      aria-hidden
    />
  );
}
