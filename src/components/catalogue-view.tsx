"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import type { ActiveFilters } from "@/lib/filters";
import { filterProducts } from "@/lib/filters";
import { FilterSidebar } from "./filter-sidebar";
import { ProductCard } from "./product-card";
import { QuickViewModal } from "./quick-view-modal";

type CatalogueViewProps = {
  products: Product[];
  title?: string;
  showEmptyMessage?: boolean;
};

export function CatalogueView({
  products,
  title,
  showEmptyMessage = true,
}: CatalogueViewProps) {
  const [filters, setFilters] = useState<ActiveFilters>({});
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  const handleFilterChange = (key: keyof ActiveFilters, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: value || undefined,
    }));
  };

  return (
    <>
      <div className="mx-auto grid max-w-[1600px] gap-4 px-3 pb-10 pt-2 md:grid-cols-[260px_minmax(0,1fr)] md:gap-5 md:px-5">
        <FilterSidebar
          active={filters}
          onChange={handleFilterChange}
          onClear={() => setFilters({})}
        />

        <section className="min-w-0">
          {title ? (
            <div className="mb-5 px-1">
              <h1 className="font-serif text-3xl font-medium tracking-wide text-[#1a1a1a] md:text-4xl">
                {title}
              </h1>
            </div>
          ) : null}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  priority={index < 4}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          ) : showEmptyMessage ? (
            <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-white/70 bg-white/45 px-6 py-16 text-center backdrop-blur-xl">
              <p className="max-w-md font-serif text-lg text-[#777]">
                Our collection is being curated. Please check back soon.
              </p>
            </div>
          ) : null}
        </section>
      </div>

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </>
  );
}
