"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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

  // Portaled to <body> so the sheet stacks above the fixed bottom nav,
  // outside the page-shell stacking context.
  return createPortal(
    <div className="fixed inset-0 z-[90] md:hidden">
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter catalogue"
        className="absolute inset-x-0 bottom-0 top-[calc(var(--cs-header-height)+0.5rem)] flex flex-col overflow-hidden border-t border-line bg-ink"
      >
        <div className="flex shrink-0 items-center justify-end px-4 pt-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex min-h-11 min-w-11 items-center justify-center font-sans text-2xl text-muted"
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

        <div className="mobile-filter-sheet__footer shrink-0 border-t border-line p-4">
          <button
            type="button"
            onClick={onClose}
            className="btn btn--gold w-full"
          >
            Show results{activeCount > 0 ? ` (${activeCount} filters)` : ""}
          </button>
        </div>
      </div>
    </div>,
    document.body,
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
      <div className="sticky top-[var(--cs-header-height)] z-40 border-b border-line bg-ink/85 px-4 py-3 backdrop-blur-xl md:hidden">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 border border-line-strong px-4 font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ivory"
          >
            Filters
            {activeCount > 0 ? (
              <span className="bg-gold/15 px-2 py-0.5 text-gold-bright">
                {activeCount}
              </span>
            ) : null}
          </button>
          {activeCount > 0 ? (
            <button
              type="button"
              onClick={onClear}
              className="min-h-11 shrink-0 px-3 font-sans text-[0.625rem] uppercase tracking-[0.12em] text-faint"
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
