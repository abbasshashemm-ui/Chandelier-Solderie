"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { paginateProducts, parseCatalogueParams } from "@/lib/catalogue";
import type { FilterOption, Product } from "@/lib/types";
import { CatalogueView } from "./catalogue-view";

type CatalogueClientProps = {
  title: string;
  pathname: string;
  products: Product[];
  filterGroups: FilterOption[];
};

/**
 * Filters and paginates in the browser so the shop and collection pages can be
 * statically generated instead of rendered per request.
 */
export function CatalogueClient({
  title,
  pathname,
  products,
  filterGroups,
}: CatalogueClientProps) {
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const view = useMemo(() => {
    const parsed = parseCatalogueParams(
      Object.fromEntries(new URLSearchParams(query)),
    );
    return {
      ...parsed,
      ...paginateProducts(
        products,
        parsed.filters,
        parsed.searchQuery,
        parsed.currentPage,
      ),
    };
  }, [products, query]);

  return (
    <CatalogueView
      title={title}
      pathname={pathname}
      pageItems={view.pageItems}
      totalCount={view.filtered.length}
      totalPages={view.totalPages}
      currentPage={view.safePage}
      filters={view.filters}
      filterGroups={filterGroups}
      searchQuery={view.searchQuery}
      isEmpty={products.length === 0}
    />
  );
}
