import { ProductGridSkeleton } from "./product-grid-skeleton";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function HomeLoading() {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        <section className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-3 pb-6 pt-0 sm:px-4 md:px-8 md:pb-8">
          <div className="catalogue-welcome-skeleton">
            <div className="catalogue-welcome-skeleton-cord" aria-hidden="true" />
            <div className="skeleton-shimmer h-[4.5rem] w-[16rem] bg-white/35 sm:w-[18rem] md:h-[5rem] md:w-[22rem]" />
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
