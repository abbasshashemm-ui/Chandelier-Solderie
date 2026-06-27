"use client";

import { FILTER_DEFINITIONS, type FilterKey } from "@/lib/types";
import type { ActiveFilters } from "@/lib/filters";
import { GlassPanel } from "./glass-panel";

type FilterSidebarProps = {
  active: ActiveFilters;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function FilterSidebar({ active, onChange, onClear }: FilterSidebarProps) {
  return (
    <GlassPanel
      as="aside"
      variant="light"
      className="sticky top-[4.75rem] max-h-[calc(100vh-5.5rem)] overflow-y-auto p-5 md:top-[5.25rem]"
    >
      <div className="mb-5 flex items-end justify-between gap-3 border-b border-[#c9a962]/30 pb-3">
        <h2 className="font-serif text-xl font-medium text-[#1a1a1a]">Filters</h2>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full px-2 py-1 font-sans text-[0.625rem] uppercase tracking-[0.1em] text-[#777] transition hover:bg-[#c9a962]/10 hover:text-[#c9a962]"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-5">
        {FILTER_DEFINITIONS.map((group) => (
          <section key={group.key}>
            <h3 className="mb-3 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#333]">
              {group.label}
            </h3>
            <ul className="space-y-2">
              {group.values.map((value) => {
                const checked = active[group.key] === value;
                return (
                  <li key={value}>
                    <label
                      className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-3 py-2.5 transition ${
                        checked
                          ? "border-[#c9a962]/50 bg-[#c9a962]/10"
                          : "border-[#e8e4dc]/80 bg-white/35 hover:border-[#c9a962]/30 hover:bg-white/55"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          onChange(group.key, checked ? "" : value)
                        }
                        className="size-3.5 rounded accent-[#c9a962]"
                      />
                      <span className="font-sans text-xs text-[#333]">{value}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </GlassPanel>
  );
}
