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
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const play = () => {
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const onReady = () => play();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    play();

    return () => {
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      observer.disconnect();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="auto"
      disablePictureInPicture
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
