import Link from "next/link";
import { SUPER_SALE_SLUG } from "@/lib/collection-membership";

function RibbonOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 88 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M1 8h22"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.75"
      />
      <path d="M31 8h26" stroke="currentColor" strokeWidth="1" opacity="0.75" />
      <path d="M65 8h22" stroke="currentColor" strokeWidth="1" opacity="0.75" />
      <path
        d="M27.5 8 31 4.5 34.5 8 31 11.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M44 0.8 48.2 8 44 15.2 39.8 8Z"
        fill="currentColor"
      />
      <path
        d="M53.5 8 57 4.5 60.5 8 57 11.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function PromoRibbon() {
  return (
    <section
      aria-label="Super Sale — up to 50% off"
      className="sale-ribbon relative overflow-hidden"
    >
      <div className="sale-ribbon__pattern" aria-hidden />
      <div className="sale-ribbon__sheen" aria-hidden />

      <Link
        href={`/collection/${SUPER_SALE_SLUG}`}
        className="relative mx-auto flex w-full max-w-[1340px] flex-col items-center justify-center gap-2 px-4 py-6 text-center sm:gap-3 sm:py-7 md:flex-row md:gap-6 md:py-8"
      >
        <RibbonOrnament className="hidden h-5 w-24 shrink-0 text-[#3a2a12] md:block md:h-6 md:w-28" />

        <span className="flex flex-col items-center gap-1.5 md:gap-2">
          <span className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.38em] text-[#3a2a12] sm:text-[0.75rem]">
            Super Sale
          </span>
          <span className="font-serif text-[1.75rem] leading-none tracking-wide text-[#171106] sm:text-4xl md:text-[2.75rem]">
            Up to <em className="italic">50%</em> OFF
          </span>
        </span>

        <RibbonOrnament className="hidden h-5 w-24 shrink-0 scale-x-[-1] text-[#3a2a12] md:block md:h-6 md:w-28" />
      </Link>
    </section>
  );
}
