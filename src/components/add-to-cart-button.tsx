"use client";

import { useEffect, useState } from "react";
import type { CartProduct } from "@/lib/cart";
import { useCart } from "./cart-provider";

type AddToCartButtonProps = {
  product: CartProduct;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const timer = window.setTimeout(() => setAdded(false), 1600);
    return () => window.clearTimeout(timer);
  }, [added]);

  return (
    <button
      type="button"
      className="btn btn--gold w-full"
      onClick={() => {
        addItem(product);
        setAdded(true);
      }}
    >
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
