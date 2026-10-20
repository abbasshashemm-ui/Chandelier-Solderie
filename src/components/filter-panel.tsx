"use client";

import { useState } from "react";
import type { ActiveFilters } from "@/lib/filters";
import type { FilterKey, FilterOption } from "@/lib/types";

type FilterPanelProps = {
  active: ActiveFilters;
  groups: FilterOption[];
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
  className?: string;
};

export function FilterPanel({
  active,
  groups,
  onChange,
  onClear,
  className = "",
}: FilterPanelProps) {
  const [openKeys, setOpenKeys] = useState<string[]>(() => {
    const selected = groups
      .filter((group) => (active[group.key]?.length ?? 0) > 0)
      .map((group) => group.key);
    if (selected.length > 0) return selected;
    return groups[0] ? [groups[0].key] : [];
  });

  const toggleGroup = (key: string) => {
    setOpenKeys((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  };

  return (
    <div className={className}>
      <div className="shrink-0 px-4 pb-3 pt-5 md:px-5">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-serif text-lg font-medium text-ivory md:text-xl">
            Filters
          </h2>
          <button
            type="button"
            onClick={onClear}
            className="min-h-11 px-2 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-faint transition hover:text-gold-bright"
          >
            Clear all
          </button>
        </div>
        <div className="mt-3 h-px bg-gradient-to-r from-line-strong via-line to-transparent" />
      </div>

      <div className="filter-sidebar__scroll min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 pb-6 pt-2 md:px-5">
        <div className="space-y-2">
          {groups.map((group) => {
            const selected = active[group.key] ?? [];
            const open = openKeys.includes(group.key);

            return (
              <section key={group.key} className="border border-line">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => toggleGroup(group.key)}
                  className="flex min-h-11 w-full items-center justify-between gap-3 px-3 py-2 text-left transition hover:bg-white/[0.03]"
                >
                  <span className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.2em] text-gold">
                    {group.label}
                  </span>
                  <span className="flex items-center gap-2">
                    {selected.length > 0 ? (
                      <span className="bg-gold/15 px-1.5 py-0.5 font-sans text-[0.5rem] uppercase tracking-[0.12em] text-gold-bright">
                        {selected.length}
                      </span>
                    ) : null}
                    <span
                      aria-hidden
                      className={`font-sans text-xs text-faint transition ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </span>
                </button>

                {open ? (
                  <ul className="space-y-0.5 border-t border-line px-1 py-2">
                    {group.values.map((value) => {
                      const checked = selected.includes(value);
                      return (
                        <li key={value}>
                          <label
                            className={`flex min-h-11 cursor-pointer items-center gap-3 px-2 py-2 transition ${
                              checked
                                ? "bg-gold/10 text-gold-bright"
                                : "text-muted hover:bg-white/[0.03] hover:text-ivory"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => onChange(group.key, value)}
                              className="size-4 accent-[#c9a35f]"
                            />
                            <span className="font-sans text-sm md:text-xs">
                              {value}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
