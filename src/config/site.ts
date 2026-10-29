/**
 * URL pública del sitio. Prioridad: variable propia, dominio de
 * producción de Vercel, URL del despliegue en Vercel y, en local,
 * localhost. Las vistas previas de WhatsApp necesitan URLs absolutas.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

/**
 * Configuración central de la marca. Cualquier dato de contacto o
 * identidad se cambia aquí y se refleja en todo el sitio.
 */
export const siteConfig = {
  name: "Velaire",
  tagline: "Velas artesanales",
  description:
    "Bouquets y ramos de flores en vela, recordatorios y detalles personalizados hechos a mano en Neiva, Huila. Envíos a toda Colombia.",
  url: resolveSiteUrl(),
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
