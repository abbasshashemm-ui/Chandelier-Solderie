import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  priorityCount?: number;
};

export function ProductGrid({ products, priorityCount = 4 }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
