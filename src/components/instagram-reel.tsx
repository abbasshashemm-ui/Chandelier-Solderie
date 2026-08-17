"use client";

import { useEffect, useRef } from "react";

type InstagramReelProps = {
  src: string;
  poster: string;
};

export function InstagramReel({ src, poster }: InstagramReelProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="metadata"
      disablePictureInPicture
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_32%]"
      aria-hidden
    />
  );
}
