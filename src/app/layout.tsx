import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Toaster } from "@/components/ui/Toaster";
import { siteConfig } from "@/config/site";
import { CartSheet } from "@/modules/cart/components/CartSheet";
import { CartProvider } from "@/modules/cart/context/CartProvider";
import { getFeaturedProducts } from "@/modules/catalog/catalog.service";
import { getShippingInfo } from "@/modules/content/content.service";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} · Bouquets de flores en vela y velas artesanales`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "velas artesanales",
    "bouquet de velas",
    "ramos de flores en vela",
    "velas aromatizadas",
    "recordatorios",
    "regalos Neiva",
    "velas Huila",
    "detalles personalizados",
  ],
  // La imagen la generan los archivos opengraph-image de cada segmento.
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ece1df",
  viewportFit: "cover",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [suggestions, shipping] = await Promise.all([getFeaturedProducts(6), getShippingInfo()]);

  return (
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${jost.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <a
            href="#contenido"
            className="sr-only z-50 rounded-full bg-clay-500 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Saltar al contenido
          </a>
          <AnnouncementBar />
          <Header />
          <main id="contenido" className="flex-1">
            {children}
          </main>
          <Footer />
          <MobileTabBar />
          <WhatsAppFloat />
          <CartSheet
            suggestions={suggestions.map(({ slug, name, price, images }) => ({ slug, name, price, images }))}
            productionEstimate={shipping.production.estimate}
          />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
