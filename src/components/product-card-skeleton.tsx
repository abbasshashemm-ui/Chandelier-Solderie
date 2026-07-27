export function ProductCardSkeleton() {
  return (
    <article
      className="flex h-full flex-col overflow-hidden border border-line bg-surface"
      aria-hidden
    >
      <div className="skeleton-shimmer aspect-[4/5] sm:aspect-square" />

      <div className="mt-auto flex h-[7.25rem] flex-col border-t border-line px-4 py-4 sm:h-[7.5rem] sm:px-5 sm:py-5">
        <div className="skeleton-shimmer h-3 w-16 shrink-0" />
        <div className="skeleton-shimmer mt-2 h-10 w-full shrink-0" />
        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="skeleton-shimmer h-5 w-14" />
          <div className="skeleton-shimmer h-3 w-12" />
        </div>
      </div>
    </article>
  );
}
