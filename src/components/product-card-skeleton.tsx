import { GlassPanel } from "./glass-panel";

export function ProductCardSkeleton() {
  return (
    <GlassPanel
      as="article"
      variant="light"
      className="flex h-full flex-col overflow-hidden p-0 ring-1 ring-[#c9a962]/10"
      aria-hidden
    >
      <div className="skeleton-shimmer aspect-[4/5] bg-white/35 sm:aspect-square" />

      <div className="mt-auto flex h-[7.25rem] flex-col border-t border-[#c9a962]/10 px-4 py-4 sm:h-[7.5rem] sm:px-5 sm:py-5">
        <div className="skeleton-shimmer h-3 w-16 shrink-0 bg-white/35" />
        <div className="skeleton-shimmer mt-2 h-10 w-full shrink-0 bg-white/35" />
        <div className="mt-auto flex flex-col pt-2">
          <div className="skeleton-shimmer h-5 w-14 bg-white/35" />
          <div className="skeleton-shimmer mt-1 h-3 w-12 bg-white/35" />
        </div>
      </div>
    </GlassPanel>
  );
}
