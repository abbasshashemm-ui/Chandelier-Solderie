import Link from "next/link";
import type { ActiveFilters } from "@/lib/filters";
import { catalogueQueryString } from "@/lib/catalogue";

type CatalogueSearchProps = {
  pathname: string;
  filters: ActiveFilters;
  searchQuery: string;
};

export function CatalogueSearch({
  pathname,
  filters,
  searchQuery,
}: CatalogueSearchProps) {
  return (
    <form
      action={pathname}
      className="mb-8 flex max-w-md flex-col gap-2 sm:flex-row"
    >
      {Object.entries(filters).map(([key, value]) =>
        value ? (
          <input key={key} type="hidden" name={key} value={value} />
        ) : null,
      )}
      <label htmlFor="catalogue-search" className="sr-only">
        Search products
      </label>
      <input
        id="catalogue-search"
        type="search"
        name="q"
        defaultValue={searchQuery}
        placeholder="Search by name or SKU…"
        className="min-h-11 flex-1 border border-line bg-surface px-4 font-sans text-sm text-ivory placeholder:text-faint outline-none transition focus:border-gold"
      />
      <button type="submit" className="btn btn--ghost min-h-11 px-5 py-0">
        Search
      </button>
    </form>
  );
}

type CataloguePaginationProps = {
  pathname: string;
  filters: ActiveFilters;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
};

export function CataloguePagination({
  pathname,
  filters,
  searchQuery,
  currentPage,
  totalPages,
}: CataloguePaginationProps) {
  if (totalPages <= 1) return null;

  const hrefFor = (page: number) => {
    const query = catalogueQueryString({
      filters,
      searchQuery,
      page,
    });
    return query ? `${pathname}?${query}` : pathname;
  };

  return (
    <nav
      aria-label="Catalogue pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          href={hrefFor(currentPage - 1)}
          className="flex min-h-11 items-center border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory transition hover:border-gold hover:text-gold-bright"
        >
          Previous
        </Link>
      ) : (
        <span className="flex min-h-11 items-center border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory opacity-30">
          Previous
        </span>
      )}
      <span className="px-3 font-sans text-xs text-muted">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages ? (
        <Link
          href={hrefFor(currentPage + 1)}
          className="flex min-h-11 items-center border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory transition hover:border-gold hover:text-gold-bright"
        >
          Next
        </Link>
      ) : (
        <span className="flex min-h-11 items-center border border-line px-4 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ivory opacity-30">
          Next
        </span>
      )}
    </nav>
  );
}
