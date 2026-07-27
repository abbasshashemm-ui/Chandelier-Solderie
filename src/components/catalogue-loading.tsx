"use client";

import { FilterSidebar } from "./filter-sidebar";
import { ProductGridSkeleton } from "./product-grid-skeleton";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type CatalogueLoadingProps = {
  title: string;
};

export function CatalogueLoading({ title }: CatalogueLoadingProps) {
  return (
    <>
      <SiteHeader />

      <div className="catalogue-shell pt-[var(--cs-header-height)]">
        <div className="flex items-stretch">
          <FilterSidebar active={{}} onChange={() => {}} onClear={() => {}} />

          <main className="catalogue-main min-w-0 flex-1">
            <section className="mx-auto max-w-[1340px] px-3 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10">
              <header className="mb-6 md:mb-8">
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                  Chandelier Solderie
                </p>
                <h1 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-5xl">
                  {title}
                </h1>
              </header>

              <ProductGridSkeleton count={8} />
            </section>

            <SiteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
