"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Module-scoped so the cinematic entry only plays on the first load of the
// session; returning to the home page via client navigation skips it.
let hasPlayedEntry = false;

export function HeroChandelier() {
  const [entry] = useState(() => !hasPlayedEntry);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hasPlayedEntry = true;
  }, []);

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

  return (
    <div
      aria-hidden
      className={`hero-backdrop pointer-events-none absolute inset-x-0 top-0 flex justify-center ${
        entry ? "hero-entry" : ""
      }`}
    >
      <div className="hero-3d flex justify-center">
        <div ref={tiltRef} className="hero-tilt">
          <div className="hero-drop">
            <div className="hero-sway relative">
              <span className="hero-flare" />
              <Image
                src="/hero-chandelier.png"
                alt=""
                width={768}
                height={1152}
                priority
                sizes="(max-width: 640px) 320px, (max-width: 768px) 380px, 460px"
                className="hero-ignite h-[30rem] w-auto sm:h-[36rem] md:h-[42rem]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
