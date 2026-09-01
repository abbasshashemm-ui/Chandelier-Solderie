import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import "./globals.css";

const castellar = localFont({
  src: "../fonts/Castellar.woff2",
  variable: "--font-castellar",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export function StorefrontShell({ children }: { children: ReactNode }) {
  const fontClass = `${castellar.variable} ${cormorant.variable} ${montserrat.variable}`;

  return (
    <div className={`${fontClass} min-h-full font-serif`}>
      <CartProvider>
        <div className="pb-[var(--cs-mobile-nav-height)] md:pb-0">
          {children}
        </div>
        <MobileBottomNav />
        <FloatingWhatsApp />
        <CartDrawer />
      </CartProvider>
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
