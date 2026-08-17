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

export const MAX_ITEM_QTY = 20;

export function parseCart(raw: string | null): CartItem[] {
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartItem);
  } catch {
    return [];
  }
}

export function addToCart(
  items: CartItem[],
  product: CartProduct,
  qty = 1,
): CartItem[] {
  const existing = items.find((item) => item.slug === product.slug);
  if (existing) {
    return items.map((item) =>
      item.slug === product.slug
        ? { ...item, qty: Math.min(item.qty + qty, MAX_ITEM_QTY) }
        : item,
    );
  }
  return [...items, { ...product, qty: Math.min(qty, MAX_ITEM_QTY) }];
}

export function setCartQty(
  items: CartItem[],
  slug: string,
  qty: number,
): CartItem[] {
  if (qty <= 0) return items.filter((item) => item.slug !== slug);
  const capped = Math.min(qty, MAX_ITEM_QTY);
  return items.map((item) =>
    item.slug === slug ? { ...item, qty: capped } : item,
  );
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
