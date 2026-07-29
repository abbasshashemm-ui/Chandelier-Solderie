import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import {
  siteDescription,
  siteIcons,
  siteName,
  siteOpenGraph,
  siteTwitter,
  siteUrl,
} from "@/lib/site-metadata";
import "./globals.css";

const castellar = localFont({
  src: "../fonts/Castellar.woff2",
  variable: "--font-castellar",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  icons: siteIcons,
  openGraph: siteOpenGraph,
  twitter: siteTwitter,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0f0c09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${castellar.variable} ${cormorant.variable} ${montserrat.variable} h-full`}
    >
      <body className="min-h-full antialiased pb-[var(--cs-mobile-nav-height)] md:pb-0">
        {children}
        <MobileBottomNav />
        <FloatingWhatsApp />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
