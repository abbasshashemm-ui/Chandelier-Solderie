"use client";

import { useCallback, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/types";
import type { ActiveFilters } from "@/lib/filters";
import {
  PRODUCTS_PER_PAGE,
  filterProducts,
} from "@/lib/filters";
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

  const filters = useMemo(
    () => readFilters(searchParams),
    [searchParams],
  );
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
  const noFilterMatches = !isCatalogueEmpty && filtered.length === 0;

  return (
    <>
      <SiteHeader />

      <div className="catalogue-shell pt-[var(--cs-header-height)]">
        <div className="catalogue-body flex">
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

            <section className="mx-auto max-w-[1340px] px-3 pb-8 pt-4 md:px-8 md:pb-10 md:pt-6">
              <div className="mb-5 md:mb-6">
                <h1 className="font-serif text-2xl font-medium tracking-wide text-[#1a1a1a] md:text-4xl">
                  {title}
                </h1>
                <div className="mt-3 h-px w-16 bg-gradient-to-r from-[#c9a962] to-transparent" />
              </div>

              <form
                onSubmit={handleSearchSubmit}
                className="mb-6 flex max-w-md flex-col gap-2 sm:flex-row"
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
                  className="min-h-11 flex-1 border border-[#c9a962]/25 bg-white/50 px-4 font-sans text-sm text-[#1a1a1a] backdrop-blur-md outline-none transition focus:border-[#c9a962]"
                />
                <button
                  type="submit"
                  className="min-h-11 border border-[#c9a962]/35 bg-[#c9a962] px-4 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-white transition hover:bg-[#a8893f]"
                >
                  Search
                </button>
              </form>

              {!isCatalogueEmpty && filtered.length > 0 ? (
                <>
                  <p className="mb-4 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-[#999]">
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
                      className="mt-10 flex items-center justify-center gap-2"
                    >
                      <button
                        type="button"
                        disabled={safePage <= 1}
                        onClick={() => goToPage(safePage - 1)}
                        className="min-h-11 border border-[#c9a962]/30 px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#1a1a1a] transition enabled:hover:border-[#c9a962] disabled:opacity-40"
                      >
                        Previous
                      </button>
                      <span className="px-3 font-sans text-xs text-[#777]">
                        Page {safePage} of {totalPages}
                      </span>
                      <button
                        type="button"
                        disabled={safePage >= totalPages}
                        onClick={() => goToPage(safePage + 1)}
                        className="min-h-11 border border-[#c9a962]/30 px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#1a1a1a] transition enabled:hover:border-[#c9a962] disabled:opacity-40"
                      >
                        Next
                      </button>
                    </nav>
                  ) : null}
                </>
              ) : (
                <div className="liquid-glass flex min-h-[360px] flex-col items-center justify-center px-8 py-20 text-center">
                  <p className="relative z-10 max-w-md font-serif text-2xl leading-relaxed text-[#555]">
                    {isCatalogueEmpty
                      ? "The collection is being curated."
                      : "No pieces match these filters."}
                  </p>
                  <p className="relative z-10 mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#999]">
                    {isCatalogueEmpty
                      ? "Publish products in the studio to populate the catalogue"
                      : "Try adjusting your selection"}
                  </p>
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
