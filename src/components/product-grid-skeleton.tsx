import { ProductCardSkeleton } from "./product-card-skeleton";

type ProductGridSkeletonProps = {
  count?: number;
};

export function ProductGridSkeleton({ count = 8 }: ProductGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6"
      aria-busy="true"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
