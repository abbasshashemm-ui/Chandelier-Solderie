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
        strokeWidth="0.8"
        opacity="0.7"
      />
      <path d="M31 8h26" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path d="M65 8h22" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path
        d="M27.5 8 31 4.5 34.5 8 31 11.5Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
      <path
        d="M44 1.5 47.5 8 44 14.5 40.5 8Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M53.5 8 57 4.5 60.5 8 57 11.5Z"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function PromoRibbon() {
  return (
    <section
      aria-label="Seasonal offer"
      className="sale-ribbon relative overflow-hidden border-y border-gold/35"
    >
      <div className="sale-ribbon__pattern" aria-hidden />
      <div className="sale-ribbon__sheen" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-[1340px] items-center justify-center gap-3 px-4 py-3.5 sm:gap-5 sm:py-4 md:py-5">
        <RibbonOrnament className="hidden h-4 w-20 shrink-0 text-gold sm:block md:h-5 md:w-24" />

        <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-1 text-center font-serif text-ivory">
          <span className="font-sans text-[0.5625rem] uppercase tracking-[0.32em] text-gold sm:text-[0.625rem]">
            Seasonal offering
          </span>
          <span className="font-serif text-xl tracking-wide text-gold-bright sm:text-2xl md:text-[1.75rem]">
            Up to <em className="italic text-ivory">50%</em> OFF
          </span>
        </p>

        <RibbonOrnament className="hidden h-4 w-20 shrink-0 scale-x-[-1] text-gold sm:block md:h-5 md:w-24" />
      </div>
    </section>
  );
}
