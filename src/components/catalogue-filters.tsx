"use client";

import { useCallback, useTransition, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ActiveFilters } from "@/lib/filters";
import type { FilterKey } from "@/lib/types";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilterBar } from "./mobile-filter-bar";

type CatalogueFiltersProps = {
  active: ActiveFilters;
  children: ReactNode;
};

export function CatalogueFilters({ active, children }: CatalogueFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const replaceParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      params.delete("page");
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router, searchParams, startTransition],
  );

  const handleFilterChange = (key: FilterKey, value: string) => {
    replaceParams((params) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
  };

  const handleClear = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="flex items-stretch">
      <FilterSidebar
        active={active}
        onChange={handleFilterChange}
        onClear={handleClear}
      />
      <main className="catalogue-main min-w-0 flex-1">
        <MobileFilterBar
          active={active}
          onChange={handleFilterChange}
          onClear={handleClear}
        />
        {children}
      </main>
    </div>
  );
}
