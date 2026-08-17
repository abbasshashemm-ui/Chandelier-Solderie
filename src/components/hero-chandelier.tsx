"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

let hasPlayedEntry = false;

type Phase = "waiting" | "entry" | "live";

export function HeroChandelier() {
  const [phase, setPhase] = useState<Phase>(() =>
    hasPlayedEntry ? "live" : "waiting",
  );
  const tiltRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

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
      el.style.transform = `rotateY(${(current.x * 12).toFixed(3)}deg) rotateX(${(current.y * -7).toFixed(3)}deg) translateZ(${(Math.abs(current.x) * 18 + Math.abs(current.y) * 10).toFixed(2)}px)`;

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
                src="/hero-chandelier.webp"
                alt=""
                width={1200}
                height={1800}
                priority
                quality={80}
                onLoad={startEntry}
                sizes="(max-width: 640px) 460px, (max-width: 768px) 550px, 640px"
                className="hero-ignite h-[45rem] w-auto sm:h-[54rem] md:h-[63rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
