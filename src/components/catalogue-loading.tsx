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
        <div className="catalogue-body flex">
          <FilterSidebar active={{}} onChange={() => {}} onClear={() => {}} />

          <main className="catalogue-main min-w-0 flex-1">
            <section className="mx-auto max-w-[1340px] px-3 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
              <div className="mb-5 md:mb-6">
                <h1 className="font-serif text-2xl font-medium tracking-wide text-[#1a1a1a] md:text-4xl">
                  {title}
                </h1>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#c9a962] to-transparent" />
              </div>

              <ProductGridSkeleton count={8} />
            </section>

            <SiteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
