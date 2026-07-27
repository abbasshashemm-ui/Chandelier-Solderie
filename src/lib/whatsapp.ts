import type { Product } from "./types";
import { getWhatsAppNumber } from "./site-contact";

export function buildWhatsAppUrlStatic(product: Product, origin: string) {
  const message = [
    "Hello, I'm interested in the following item:",
    "",
    `*Product:* ${product.title}`,
    `*SKU:* ${product.sku ?? "N/A"}`,
    `*Link:* ${origin}/product/${product.slug}`,
    "",
    "Could you please provide a quote?",
  ].join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}
