"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { cartLineId } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { siteUrl } from "@/lib/site-metadata";
import { buildCartWhatsAppUrl } from "@/lib/whatsapp";
import { useOptionalCart } from "./cart-provider";

export function CartDrawer() {
  const pathname = usePathname();
  const cart = useOptionalCart();
  const open = cart?.open ?? false;
  const closeCart = cart?.closeCart;

  useEffect(() => {
    if (!open || !closeCart) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeCart]);

  if (!cart || pathname.startsWith("/studio") || !open) return null;

  const { items, setQty, removeItem, subtotal } = cart;

  const origin =
    typeof window !== "undefined" ? window.location.origin : siteUrl;
  const checkoutUrl = buildCartWhatsAppUrl(items, origin);
  const total = formatPrice(subtotal);

  return createPortal(
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        aria-label="Close cart"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={closeCart}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-line bg-ink shadow-[-24px_0_48px_rgba(0,0,0,0.45)]"
      >
        <header className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
          <div>
            <p className="font-sans text-[0.5625rem] uppercase tracking-[0.28em] text-gold">
              Your selection
            </p>
            <h2 className="mt-1 font-serif text-2xl text-ivory">Cart</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="flex size-11 items-center justify-center font-sans text-2xl text-muted transition hover:text-ivory"
          >
            ×
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center font-serif text-lg text-muted">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const lineId = cartLineId(item);
                const linePrice = formatPrice(
                  item.price != null ? item.price * item.qty : undefined,
                );

                return (
                  <li
                    key={lineId}
                    className="flex gap-3 border border-line bg-surface p-3"
                  >
                    <div className="relative size-20 shrink-0 overflow-hidden bg-ink-deep">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-base leading-snug text-ivory">
                        {item.title}
                      </p>
                      {item.size ? (
                        <p className="mt-1 font-sans text-[0.5rem] uppercase tracking-[0.16em] text-gold">
                          {item.size}
                        </p>
                      ) : null}
                      {item.sku ? (
                        <p className="mt-1 font-sans text-[0.5rem] uppercase tracking-[0.16em] text-faint">
                          {item.sku}
                        </p>
                      ) : null}

                      <div className="mt-3 flex items-center justify-between gap-2">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            aria-label={`Decrease ${item.title}`}
                            onClick={() => setQty(lineId, item.qty - 1)}
                            className="flex size-8 items-center justify-center text-muted transition hover:text-ivory"
                          >
                            −
                          </button>
                          <span className="min-w-6 text-center font-sans text-xs text-ivory">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase ${item.title}`}
                            onClick={() => setQty(lineId, item.qty + 1)}
                            className="flex size-8 items-center justify-center text-muted transition hover:text-ivory"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-serif text-sm text-gold-bright">
                          {linePrice ?? "—"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(lineId)}
                        className="mt-2 font-sans text-[0.5rem] uppercase tracking-[0.16em] text-faint transition hover:text-gold-bright"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="shrink-0 border-t border-line p-5">
          {items.length > 0 ? (
            <>
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-sans text-[0.625rem] uppercase tracking-[0.2em] text-faint">
                  Subtotal
                </span>
                <span className="font-serif text-xl text-gold-bright">
                  {total ?? "—"}
                </span>
              </div>
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--gold w-full"
              >
                Checkout on WhatsApp
              </a>
            </>
          ) : (
            <button
              type="button"
              onClick={closeCart}
              className="btn btn--ghost w-full"
            >
              Continue Through the Collection
            </button>
          )}
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
