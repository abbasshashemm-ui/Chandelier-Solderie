import { getDisplayPrices } from "@/lib/pricing";
import type { Product } from "@/lib/types";

type PriceDisplayProps = {
  product: Product;
  size?: "card" | "detail";
};

export function PriceDisplay({ product, size = "card" }: PriceDisplayProps) {
  const { current, original } = getDisplayPrices(product);

  if (!current) return null;

  if (size === "detail") {
    return (
      <div className="mt-7 border-y border-line py-5">
        <p className="font-sans text-[0.625rem] uppercase tracking-[0.22em] text-faint">
          {original ? "Sale price" : "Price"}
        </p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-serif tracking-wide">
          {original ? (
            <span className="text-xl text-faint line-through decoration-gold/50 sm:text-2xl">
              {original}
            </span>
          ) : null}
          <span className="text-3xl text-gold-bright sm:text-4xl">{current}</span>
        </p>
      </div>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 font-serif tracking-wide">
      {original ? (
        <span className="text-sm text-faint line-through decoration-gold/50 sm:text-base">
          {original}
        </span>
      ) : null}
      <span className="text-base text-gold-bright sm:text-lg">{current}</span>
    </p>
  );
}
