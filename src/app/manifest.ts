import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Permite instalar el sitio en el celular y abrirlo como una app. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} · ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fcf8f7",
    theme_color: "#ece1df",
    lang: "es-CO",
    categories: ["shopping", "lifestyle"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Catálogo", url: "/catalogo", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Bouquets", url: "/catalogo/bouquets", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
