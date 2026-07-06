import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { LightsProvider } from "@/components/lights-provider";
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
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chandelier Solderie",
    template: "%s | Chandelier Solderie",
  },
  description:
    "Luxury lighting catalogue — curated chandeliers and pendants in Lebanon.",
  openGraph: {
    title: "Chandelier Solderie",
    description:
      "Luxury lighting catalogue — curated chandeliers and pendants in Lebanon.",
    siteName: "Chandelier Solderie",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandelier Solderie",
    description:
      "Luxury lighting catalogue — curated chandeliers and pendants in Lebanon.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3ece3",
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
        <LightsProvider>
          {children}
          <MobileBottomNav />
        </LightsProvider>
      </body>
    </html>
  );
}
