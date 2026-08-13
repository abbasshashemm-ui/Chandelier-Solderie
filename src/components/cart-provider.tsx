"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  addToCart,
  cartItemCount,
  cartSubtotal,
  getCartServerSnapshot,
  getCartSnapshot,
  removeFromCart,
  setCartQty,
  subscribeCart,
  writeCart,
  type CartItem,
  type CartProduct,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  open: boolean;
  itemCount: number;
  subtotal: number;
  addItem: (product: CartProduct, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot,
  );
  const [open, setOpen] = useState(false);

  const addItem = useCallback((product: CartProduct, qty = 1) => {
    writeCart(addToCart(getCartSnapshot(), product, qty));
    setOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    writeCart(setCartQty(getCartSnapshot(), slug, qty));
  }, []);

  const removeItem = useCallback((slug: string) => {
    writeCart(removeFromCart(getCartSnapshot(), slug));
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      open,
      itemCount: cartItemCount(items),
      subtotal: cartSubtotal(items),
      addItem,
      setQty,
      removeItem,
      clear,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      toggleCart: () => setOpen((current) => !current),
    }),
    [addItem, clear, items, open, removeItem, setQty],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
