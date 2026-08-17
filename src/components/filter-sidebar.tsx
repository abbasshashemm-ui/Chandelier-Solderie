"use client";

import type { ActiveFilters } from "@/lib/filters";
import type { FilterKey, FilterOption } from "@/lib/types";
import { FilterPanel } from "./filter-panel";

type FilterSidebarProps = {
  active: ActiveFilters;
  groups: FilterOption[];
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function FilterSidebar({
  active,
  groups,
  onChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside className="filter-sidebar sticky top-[var(--cs-header-height)] z-30 hidden h-[calc(100vh-var(--cs-header-height))] w-[260px] shrink-0 flex-col self-start border-r border-line md:flex">
      <FilterPanel
        active={active}
        groups={groups}
        onChange={onChange}
        onClear={onClear}
        className="flex min-h-0 flex-1 flex-col"
      />
    </aside>
  );
}
