"use client";

import { FILTER_DEFINITIONS, type FilterKey } from "@/lib/types";
import type { ActiveFilters } from "@/lib/filters";

type FilterPanelProps = {
  active: ActiveFilters;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
  className?: string;
};

export function FilterPanel({
  active,
  onChange,
  onClear,
  className = "",
}: FilterPanelProps) {
  return (
    <div className={className}>
      <div className="relative z-10 shrink-0 px-4 pb-3 pt-4 md:px-5 md:pt-5">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-serif text-lg font-medium text-[#1a1a1a] md:text-xl">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClear}
            className="min-h-11 px-2 font-sans text-[0.625rem] uppercase tracking-[0.1em] text-[#999] transition hover:text-[#c9a962]"
          >
            Clear all
          </button>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-[#c9a962]/35 via-[#c9a962]/10 to-transparent" />
      </div>

      <div className="filter-sidebar__scroll relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-6 pt-2 md:px-5">
        <div className="space-y-5 md:space-y-6">
          {FILTER_DEFINITIONS.map((group) => (
            <section key={group.key}>
              <h3 className="mb-2 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[#888]">
                {group.label}
              </h3>
              <ul className="space-y-1">
                {group.values.map((value) => {
                  const checked = active[group.key] === value;
                  return (
                    <li key={value}>
                      <label
                        className={`flex min-h-11 cursor-pointer items-center gap-3 px-2 py-2 transition ${
                          checked
                            ? "bg-[#c9a962]/12 text-[#1a1a1a]"
                            : "text-[#555] hover:bg-white/35 hover:text-[#1a1a1a]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            onChange(group.key, checked ? "" : value)
                          }
                          className="size-4 accent-[#c9a962]"
                        />
                        <span className="font-sans text-sm md:text-xs">{value}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
