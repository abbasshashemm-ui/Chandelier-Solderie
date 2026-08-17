import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="pb-[var(--cs-mobile-nav-height)] md:pb-0">
        {children}
      </div>
      <MobileBottomNav />
      <FloatingWhatsApp />
      <CartDrawer />
    </CartProvider>
  );
}
