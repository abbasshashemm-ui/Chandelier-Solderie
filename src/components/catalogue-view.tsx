"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import type { ActiveFilters } from "@/lib/filters";
import { PRODUCTS_PER_PAGE, filterProducts } from "@/lib/filters";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilterBar } from "./mobile-filter-bar";
import { ProductCard } from "./product-card";

type CatalogueViewProps = {
  products: Product[];
  title: string;
};

const FILTER_KEYS = [
  "style",
  "material",
  "room",
  "priceRange",
  "dimensions",
] as const;

function readFilters(params: URLSearchParams): ActiveFilters {
  const filters: ActiveFilters = {};
  for (const key of FILTER_KEYS) {
    const value = params.get(key);
    if (value) filters[key] = value;
  }
  return filters;
}

export function CatalogueView({ products, title }: CatalogueViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("q") ?? "",
  );

  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const searchQuery = searchParams.get("q") ?? "";
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const filtered = useMemo(
    () => filterProducts(products, filters, searchQuery),
    [products, filters, searchQuery],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(pageStart, pageStart + PRODUCTS_PER_PAGE);

  const updateParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }

      if (!("page" in updates)) {
        params.delete("page");
      }

      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams, startTransition],
  );

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    updateParams({ [key]: value || undefined });
  };

  const handleClear = () => {
    setSearchInput("");
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateParams({ q: searchInput.trim() || undefined });
  };

  const goToPage = (page: number) => {
    updateParams({ page: page > 1 ? String(page) : undefined });
  };

  const isCatalogueEmpty = products.length === 0;

  return (
    <>
      <SiteHeader />

      <div className="catalogue-shell pt-[var(--cs-header-height)]">
        <div className="flex items-stretch">
          <FilterSidebar
            active={filters}
            onChange={handleFilterChange}
            onClear={handleClear}
          />

          <main className="catalogue-main min-w-0 flex-1">
            <MobileFilterBar
              active={filters}
              onChange={handleFilterChange}
              onClear={handleClear}
            />

            <section className="mx-auto max-w-[1340px] px-3 pb-12 pt-6 md:px-8 md:pb-16 md:pt-10">
              <header className="mb-6 md:mb-8">
                <p className="font-sans text-[0.625rem] uppercase tracking-[0.28em] text-gold">
                  Chandelier Solderie
                </p>
                <h1 className="mt-2 font-serif text-3xl font-normal text-ivory md:text-5xl">
                  {title}
                </h1>
              </header>

              <form
                onSubmit={handleSearchSubmit}
                className="mb-8 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <label htmlFor="catalogue-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="catalogue-search"
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by name or SKU…"
                  className="min-h-11 flex-1 border border-line bg-surface px-4 font-sans text-sm text-ivory placeholder:text-faint outline-none transition focus:border-gold"
                />
                <button
                  type="submit"
                  className="btn btn--ghost min-h-11 px-5 py-0"
                >
                  Search
                </button>
              </form>

              {!isCatalogueEmpty && filtered.length > 0 ? (
                <>
                  <p className="mb-5 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    {filtered.length} piece{filtered.length === 1 ? "" : "s"}
                    {searchQuery ? ` matching “${searchQuery}”` : ""}
                  </p>

                  <div className="grid grid-cols-2 items-stretch gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                    {pageItems.map((product, index) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        priority={index < 4}
                      />
                    ))}
                  </div>

                  {totalPages > 1 ? (
                    <nav
                      aria-label="Catalogue pagination"
                      className="mt-12 flex items-center justify-center gap-2"
                    >
                      <button
                        type="button"
                        disabled={safePage <= 1}
                        onClick={() => goToPage(safePage - 1)}
                        className="min-h-11 border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory transition enabled:hover:border-gold enabled:hover:text-gold-bright disabled:opacity-30"
                      >
                        Previous
                      </button>
                      <span className="px-3 font-sans text-xs text-muted">
                        Page {safePage} of {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={safePage >= totalPages}
                        onClick={() => goToPage(safePage + 1)}
                        className="min-h-11 border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory transition enabled:hover:border-gold enabled:hover:text-gold-bright disabled:opacity-30"
                      >
                        Next
                      </button>
                    </nav>
                  ) : null}
                </>
              ) : (
                <div className="flex min-h-[360px] flex-col items-center justify-center border border-line px-8 py-20 text-center">
                  <p className="max-w-md font-serif text-2xl leading-relaxed text-muted">
                    {isCatalogueEmpty
                      ? "The collection is being curated."
                      : "No pieces match these filters."}
                  </p>
                  <p className="mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-faint">
                    {isCatalogueEmpty
                      ? "Publish products in the studio to populate the catalogue"
                      : "Try adjusting your selection"}
                  </p>
                  {!isCatalogueEmpty ? (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="btn btn--ghost mt-8"
                    >
                      Clear All Filters
                    </button>
                  ) : null}
                </div>
              )}
            </section>

            <SiteFooter />
          </main>
        </div>
      </div>
    </>
  );
}
