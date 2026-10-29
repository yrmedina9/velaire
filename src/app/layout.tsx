import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { siteConfig } from "@/config/site";
import { CartDrawer } from "@/modules/cart/components/CartDrawer";
import { CartProvider } from "@/modules/cart/context/CartProvider";
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
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [{ url: "/images/products/bouquet-jardin-pastel-1.webp", width: 1200, height: 1253 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#ece1df",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" data-scroll-behavior="smooth" className={`${cormorant.variable} ${jost.variable} ${marcellus.variable} h-full antialiased`}>
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
          <WhatsAppFloat />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
