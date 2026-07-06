"use client";

import { useEffect, useState } from "react";
import type { ActiveFilters } from "@/lib/filters";
import type { FilterKey } from "@/lib/types";
import { FilterPanel } from "./filter-panel";

type MobileFilterSheetProps = {
  open: boolean;
  onClose: () => void;
  active: ActiveFilters;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
  activeCount: number;
};

function MobileFilterSheet({
  open,
  onClose,
  active,
  onChange,
  onClear,
  activeCount,
}: MobileFilterSheetProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-[#1a1a1a]/25 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter catalogue"
        className="mobile-filter-sheet liquid-glass absolute inset-x-0 bottom-0 top-[calc(var(--cs-header-height)+0.5rem)] flex flex-col overflow-hidden"
      >
        <div className="relative z-10 flex shrink-0 items-center justify-end px-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex min-h-11 min-w-11 items-center justify-center font-sans text-2xl text-[#444]"
          >
            ×
          </button>
        </div>

        <FilterPanel
          active={active}
          onChange={onChange}
          onClear={onClear}
          className="flex min-h-0 flex-1 flex-col"
        />

        <div className="mobile-filter-sheet__footer relative z-10 shrink-0 border-t border-[#c9a962]/15 p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex min-h-11 w-full items-center justify-center bg-[#c9a962] py-3.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white"
          >
            Show results{activeCount > 0 ? ` (${activeCount} filters)` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}

type MobileFilterBarProps = {
  active: ActiveFilters;
  onChange: (key: FilterKey, value: string) => void;
  onClear: () => void;
};

export function MobileFilterBar({ active, onChange, onClear }: MobileFilterBarProps) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(active).filter(Boolean).length;

  return (
    <>
      <div className="sticky top-[var(--cs-header-height)] z-40 border-b border-[#c9a962]/10 bg-[rgba(255,255,255,0.72)] px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-[#c9a962]/30 bg-white/50 px-4 font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-[#1a1a1a]"
          >
            Filters
            {activeCount > 0 ? (
              <span className="bg-[#c9a962]/15 px-2 py-0.5 text-[#a8893f]">
                {activeCount}
              </span>
            ) : null}
          </button>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="min-h-11 shrink-0 px-3 font-sans text-[0.625rem] uppercase tracking-[0.1em] text-[#999]"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <MobileFilterSheet
        open={open}
        onClose={() => setOpen(false)}
        active={active}
        onChange={onChange}
        onClear={onClear}
        activeCount={activeCount}
      />
    </>
  );
}
