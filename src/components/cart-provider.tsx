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
  CART_STORAGE_KEY,
  cartItemCount,
  cartSubtotal,
  parseCart,
  removeFromCart,
  setCartQty,
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

const EMPTY_CART: CartItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

function emitCart() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;
  cachedRaw = null;
  emitCart();
}

function subscribeCart(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function getCartSnapshot() {
  const raw = window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  const next = parseCart(raw);
  cachedItems = next.length === 0 ? EMPTY_CART : next;
  return cachedItems;
}

function getCartServerSnapshot() {
  return EMPTY_CART;
}

function writeCart(items: CartItem[]) {
  cachedRaw = JSON.stringify(items);
  cachedItems = items.length === 0 ? EMPTY_CART : items;
  window.localStorage.setItem(CART_STORAGE_KEY, cachedRaw);
  emitCart();
}

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

export function useOptionalCart() {
  return useContext(CartContext);
}
