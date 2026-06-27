import type { Product } from "./types";

const DEFAULT_NUMBER = "96170123456";

export function getWhatsAppNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_NUMBER;
}

export function buildWhatsAppUrl(product: Product) {
  const message = [
    "Hello, I'm interested in the following item:",
    "",
    `*Product:* ${product.title}`,
    `*SKU:* ${product.sku ?? "N/A"}`,
    `*Link:* ${typeof window !== "undefined" ? window.location.origin : ""}/product/${product.slug}`,
    "",
    "Could you please provide a quote?",
  ].join("\n");

  return `https://wa.me/${getWhatsAppNumber()}?text=${encodeURIComponent(message)}`;
}

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
