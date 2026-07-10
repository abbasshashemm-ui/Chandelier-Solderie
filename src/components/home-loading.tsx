import { ProductGridSkeleton } from "./product-grid-skeleton";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomeLoading() {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        <section className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-3 pb-6 pt-8 sm:px-4 sm:pt-10 md:px-8 md:pb-8 md:pt-12">
          <div className="mb-6 text-center md:mb-8">
            <div className="skeleton-shimmer mx-auto h-8 w-64 bg-white/35 md:h-10 md:w-80" />
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#c9a962]/40 to-transparent" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1340px] px-3 pb-8 sm:px-4 md:px-8 md:pb-10">
          <ProductGridSkeleton count={8} />
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
