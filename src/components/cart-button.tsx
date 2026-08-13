"use client";

import { usePathname } from "next/navigation";
import { useOptionalCart } from "./cart-provider";

export function CartButton() {
  const pathname = usePathname();
  const cart = useOptionalCart();

  if (!cart || pathname.startsWith("/studio")) {
    return null;
  }

  const { itemCount, toggleCart } = cart;

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={itemCount > 0 ? `Open cart, ${itemCount} items` : "Open cart"}
      className="relative flex size-10 items-center justify-center text-ivory transition hover:text-gold-bright"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="size-5"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
      {itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4 items-center justify-center bg-gold px-1 font-sans text-[0.5rem] font-medium leading-4 text-ink">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
