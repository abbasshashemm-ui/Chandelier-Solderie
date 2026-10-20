import type { Product } from "./types";
import type { CartItem } from "./cart";
import { formatPrice } from "./format";
import { getWhatsAppNumber } from "./site-contact";

const MAX_ENCODED_LENGTH = 1800;

export function buildWhatsAppUrlStatic(
  product: Product,
  origin: string,
  size?: string,
) {
  const message = [
    "Hello, I'm interested in the following item:",
    "",
    `*Product:* ${product.title}`,
    `*SKU:* ${product.sku ?? "N/A"}`,
    size ? `*Size:* ${size}` : null,
    product.price != null ? `*Price:* ${formatPrice(product.price)}` : null,
    `*Link:* ${origin}/product/${product.slug}`,
    "",
    "Could you please provide a quote?",
  ]
    .filter((line): line is string => line != null)
    .join("\n");

  return whatsappUrl(message);
}

export function buildCartWhatsAppUrl(items: CartItem[], origin: string) {
  const withLinks = items
    .map((item, index) => formatCartLine(item, index, origin, true))
    .join("\n");
  const withoutLinks = items
    .map((item, index) => formatCartLine(item, index, origin, false))
    .join("\n");

  const wrap = (body: string) =>
    [
      "Hello, I'd like to inquire about the following pieces:",
      "",
      body,
      "",
      "Could you please provide a quote?",
    ].join("\n");

  const full = wrap(withLinks);
  const message =
    encodeURIComponent(full).length > MAX_ENCODED_LENGTH
      ? wrap(withoutLinks)
      : full;

  return whatsappUrl(message);
}

function formatCartLine(
  item: CartItem,
  index: number,
  origin: string,
  includeLink: boolean,
) {
  const sku = item.sku ? ` (${item.sku})` : "";
  const size = item.size ? ` — ${item.size}` : "";
  const price = formatPrice(item.price);
  const priceBit = price ? ` — ${price}` : "";
  const line = `${index + 1}. ${item.title}${sku}${size} × ${item.qty}${priceBit}`;
  if (!includeLink) return line;
  return `${line}\n   ${origin}/product/${item.slug}`;
}

function whatsappUrl(message: string) {
  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
