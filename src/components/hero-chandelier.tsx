"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

// Module-scoped so the cinematic entry only plays on the first load of the
// session; returning to the home page via client navigation skips it.
let hasPlayedEntry = false;

type Phase = "waiting" | "entry" | "live";

export function HeroChandelier() {
  const [phase, setPhase] = useState<Phase>(() =>
    hasPlayedEntry ? "live" : "waiting",
  );
  const tiltRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Only begin the entry once the image is fully loaded, so the animation
  // never plays against a half-loaded picture.
  const startEntry = useCallback(() => {
    hasPlayedEntry = true;
    setPhase((current) => (current === "waiting" ? "entry" : current));
  }, []);

  useEffect(() => {
    if (phase !== "waiting") return;
    const img = imageRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      startEntry();
    }
  }, [phase, startEntry]);

  // Subtle 3D parallax: the chandelier tilts in perspective following the
  // pointer. Desktop-only, disabled for reduced motion.
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const loop = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      el.style.transform = `rotateY(${(current.x * 7).toFixed(3)}deg) rotateX(${(current.y * -4).toFixed(3)}deg)`;

      if (
        Math.abs(current.x - target.x) > 0.001 ||
        Math.abs(current.y - target.y) > 0.001
      ) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.y = (event.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const phaseClass =
    phase === "waiting" ? "hero-waiting" : phase === "entry" ? "hero-entry" : "";

  return (
    <div
      aria-hidden
      className={`hero-backdrop pointer-events-none absolute inset-x-0 top-0 flex justify-center ${phaseClass}`}
    >
      <div className="hero-3d flex justify-center">
        <div ref={tiltRef} className="hero-tilt">
          <div className="hero-drop">
            <div className="hero-sway relative">
              <span className="hero-flare" />
              <Image
                ref={imageRef}
                src="/hero-chandelier.png"
                alt=""
                width={1536}
                height={2304}
                priority
                quality={95}
                onLoad={startEntry}
                sizes="(max-width: 640px) 480px, (max-width: 768px) 576px, 672px"
                className="hero-ignite h-[45rem] w-auto sm:h-[54rem] md:h-[63rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
