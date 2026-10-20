import type { Metadata, Viewport } from "next";
import {
  siteDescription,
  siteIcons,
  siteName,
  siteOpenGraph,
  siteTwitter,
  siteUrl,
} from "@/lib/site-metadata";

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
    <html lang="en" data-scroll-behavior="smooth" className="h-full">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
