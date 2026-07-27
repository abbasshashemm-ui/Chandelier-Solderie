"use client";

import type { ActiveFilters } from "@/lib/filters";
import type { FilterKey } from "@/lib/types";
import { FilterPanel } from "./filter-panel";

type FilterSidebarProps = {
  active: ActiveFilters;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function FilterSidebar({ active, onChange, onClear }: FilterSidebarProps) {
  return (
    <aside className="filter-sidebar sticky top-[var(--cs-header-height)] z-30 hidden h-[calc(100vh-var(--cs-header-height))] w-[260px] shrink-0 flex-col self-start border-r border-line md:flex">
      <FilterPanel
        active={active}
        onChange={onChange}
        onClear={onClear}
        className="flex min-h-0 flex-1 flex-col"
      />
    </aside>
  );
}
