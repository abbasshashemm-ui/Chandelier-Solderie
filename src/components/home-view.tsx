import Link from "next/link";
import type { Product } from "@/lib/types";
import { CatalogueWelcome } from "./catalogue-welcome";
import { ProductGrid } from "./product-grid";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type HomeViewProps = {
  products: Product[];
};

export function HomeView({ products }: HomeViewProps) {
  return (
    <>
      <SiteHeader />

      <main className="flex min-h-[calc(var(--cs-viewport-height)-var(--cs-header-height))] flex-col pt-[var(--cs-header-height)]">
        <section className="mx-auto flex w-full max-w-[1340px] flex-col items-center px-3 pb-6 pt-6 sm:px-4 sm:pt-8 md:px-8 md:pb-8 md:pt-10">
          <CatalogueWelcome />

          <Link
            href="/shop"
            className="relative z-10 mt-8 min-h-11 border border-[#c9a962]/35 bg-white/45 px-6 py-3.5 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#1a1a1a] backdrop-blur-md transition hover:border-[#c9a962] hover:bg-[#c9a962] hover:text-white sm:px-8"
          >
            Explore the Collection
          </Link>
        </section>

        <section className="mx-auto w-full max-w-[1340px] px-3 pb-8 sm:px-4 md:px-8 md:pb-10">
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="liquid-glass flex min-h-[280px] flex-col items-center justify-center px-8 py-16 text-center">
              <p className="relative z-10 font-serif text-xl text-[#555]">
                The collection is being curated.
              </p>
              <p className="relative z-10 mt-2 font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-[#999]">
                Publish products in the studio to see them here
              </p>
            </div>
          )}
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
