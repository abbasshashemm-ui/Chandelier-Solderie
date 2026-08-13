import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function HomeLoading() {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        <section className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-5 pb-16 sm:px-6 md:px-8 md:pb-20">
          <div className="hero-cord" aria-hidden />
          <div className="hero-jewel" aria-hidden />
          <div className="skeleton-shimmer mt-8 h-3 w-52" />
          <div className="skeleton-shimmer mt-6 h-[7rem] w-full max-w-2xl md:h-[9rem]" />
          <div className="skeleton-shimmer mt-6 h-5 w-full max-w-xl" />
          <div className="mt-10 flex gap-3">
            <div className="skeleton-shimmer h-12 w-52" />
            <div className="skeleton-shimmer h-12 w-36" />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1340px] px-3 pb-16 sm:px-4 md:px-8 md:pb-20">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5"
            aria-busy="true"
            aria-label="Loading collections"
          >
            <div className="skeleton-shimmer aspect-[16/10] border border-line" />
            <div className="skeleton-shimmer aspect-[16/10] border border-line" />
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
