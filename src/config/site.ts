/**
 * Configuración central de la marca. Cualquier dato de contacto o
 * identidad se cambia aquí y se refleja en todo el sitio.
 */
export const siteConfig = {
  name: "Velaire",
  tagline: "Velas artesanales",
  description:
    "Bouquets y ramos de flores en vela, recordatorios y detalles personalizados hechos a mano en Neiva, Huila. Envíos a toda Colombia.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_CO",
  contact: {
    phone: "3127269317",
    phoneDisplay: "312 726 9317",
    whatsapp: "573127269317",
    instagramHandle: "velaire.velas_",
    instagramUrl: "https://www.instagram.com/velaire.velas_/",
    city: "Neiva",
    region: "Huila",
    country: "Colombia",
  },
  services: [
    "Ramos de flores de velas aromatizadas",
    "Bouquets de flores de velas aromatizadas",
    "Recordatorios para baby shower",
    "Recordatorios empresariales",
    "Velas de soya aromatizadas",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
