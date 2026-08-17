import type { ActiveFilters } from "@/lib/filters";
import type { FilterOption, Product } from "@/lib/types";
import { CatalogueFilters } from "./catalogue-filters";
import { CataloguePagination, CatalogueSearch } from "./catalogue-controls";
import { ProductGrid } from "./product-grid";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type CatalogueViewProps = {
  title: string;
  pathname: string;
  pageItems: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  filters: ActiveFilters;
  filterGroups: FilterOption[];
  searchQuery: string;
  isEmpty: boolean;
};

export function CatalogueView({
  title,
  pathname,
  pageItems,
  totalCount,
  totalPages,
  currentPage,
  filters,
  filterGroups,
  searchQuery,
  isEmpty,
}: CatalogueViewProps) {
  return (
    <>
      <SiteHeader />

      <div className="catalogue-shell pt-[var(--cs-header-height)]">
        <CatalogueFilters active={filters} groups={filterGroups}>
          <section className="mx-auto max-w-[1340px] px-3 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10">
            <header className="mb-6 md:mb-8">
              <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                Chandelier Solderie
              </p>
              <h1 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-5xl">
                {title}
              </h1>
            </header>

            <CatalogueSearch
              pathname={pathname}
              filters={filters}
              searchQuery={searchQuery}
            />

            {!isEmpty && totalCount > 0 ? (
              <>
                <p className="mb-5 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  {totalCount} piece{totalCount === 1 ? "" : "s"}
                  {searchQuery ? ` matching “${searchQuery}”` : ""}
                </p>

                <ProductGrid products={pageItems} />

                <CataloguePagination
                  pathname={pathname}
                  filters={filters}
                  searchQuery={searchQuery}
                  currentPage={currentPage}
                  totalPages={totalPages}
                />
              </>
            ) : (
              <div className="flex min-h-[360px] flex-col items-center justify-center border border-line px-8 py-20 text-center">
                <p className="max-w-md font-serif text-2xl leading-relaxed text-muted">
                  {isEmpty
                    ? "The collection is being curated."
                    : "No pieces match these filters."}
                </p>
                <p className="mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                  {isEmpty
                    ? "Publish products in the studio to populate the catalogue"
                    : "Try adjusting your selection"}
                </p>
                {!isEmpty ? (
                  <a href={pathname} className="btn btn--ghost mt-8">
                    Clear All Filters
                  </a>
                ) : null}
              </div>
            )}
          </section>

          <SiteFooter />
        </CatalogueFilters>
      </div>
    </>
  );
}
