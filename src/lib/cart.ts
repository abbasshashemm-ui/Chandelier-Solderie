export type CartItem = {
  slug: string;
  title: string;
  sku?: string;
  price?: number;
  imageUrl?: string;
  qty: number;
};

export type CartProduct = Omit<CartItem, "qty">;

export const CART_STORAGE_KEY = "cs-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

const EMPTY_CART: CartItem[] = [];
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY_CART;

export function writeCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  cachedRaw = JSON.stringify(items);
  cachedItems = items.length === 0 ? EMPTY_CART : items;
  window.localStorage.setItem(CART_STORAGE_KEY, cachedRaw);
  emitCart();
}

function emitCart() {
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  if (event.key !== CART_STORAGE_KEY && event.key !== null) return;
  cachedRaw = null;
  emitCart();
}

export function subscribeCart(listener: () => void) {
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

export function getCartSnapshot() {
  const raw = window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]";
  if (raw === cachedRaw) return cachedItems;
  cachedRaw = raw;
  const next = readCart();
  cachedItems = next.length === 0 ? EMPTY_CART : next;
  return cachedItems;
}

export function getCartServerSnapshot() {
  return EMPTY_CART;
}

export function addToCart(
  items: CartItem[],
  product: CartProduct,
  qty = 1,
): CartItem[] {
  const existing = items.find((item) => item.slug === product.slug);
  if (existing) {
    return items.map((item) =>
      item.slug === product.slug ? { ...item, qty: item.qty + qty } : item,
    );
  }
  return [...items, { ...product, qty }];
}

export function setCartQty(
  items: CartItem[],
  slug: string,
  qty: number,
): CartItem[] {
  if (qty <= 0) return items.filter((item) => item.slug !== slug);
  return items.map((item) => (item.slug === slug ? { ...item, qty } : item));
}

export function removeFromCart(items: CartItem[], slug: string): CartItem[] {
  return items.filter((item) => item.slug !== slug);
}

export function cartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.qty, 0);
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce(
    (total, item) => total + (item.price ?? 0) * item.qty,
    0,
  );
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;
  const item = value as CartItem;
  return (
    typeof item.slug === "string" &&
    typeof item.title === "string" &&
    typeof item.qty === "number"
  );
}
