import { ProductGridSkeleton } from "./product-grid-skeleton";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomeLoading() {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        <section className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-3 pb-6 pt-4 sm:px-4 sm:pt-5 md:px-8 md:pb-8 md:pt-6">
          <div className="catalogue-welcome-skeleton-hanger">
            <div className="catalogue-welcome-skeleton-chains" aria-hidden="true">
              <span className="catalogue-welcome-skeleton-chain" />
              <span className="catalogue-welcome-skeleton-chain" />
              <span className="catalogue-welcome-skeleton-chain" />
            </div>
            <div className="skeleton-shimmer mx-auto h-7 w-56 bg-white/35 sm:h-8 sm:w-64 md:h-10 md:w-80" />
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
