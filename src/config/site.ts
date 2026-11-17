/** Dominio oficial de producción. Los demás alias redirigen aquí. */
const PRODUCTION_URL = "https://velaire-store.vercel.app";

/**
 * Códigos de Google Search Console (verificación por "Etiqueta HTML").
 * No son secretos: Google los busca en el HTML público de la página.
 * También se pueden agregar con NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
 * (separados por comas).
 */
const GOOGLE_VERIFICATION_CODES = ["XszvUC2Q7hEE5hiTzJ7aAxkVY9PfobCH2C2P-OXm3b4"];

function googleVerificationCodes() {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.split(",") ?? [];
  return [...new Set([...GOOGLE_VERIFICATION_CODES, ...fromEnv].map((code) => code.trim()).filter(Boolean))];
}

/**
 * URL pública del sitio. Prioridad: variable propia (dominio propio a
 * futuro), dominio oficial en producción, URL del despliegue de
 * vista previa en Vercel y, en local, localhost. Google y WhatsApp
 * necesitan siempre la misma URL absoluta.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") return PRODUCTION_URL;
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
    "Ramos y bouquets de flores en vela aromatizada, hechos a mano en Neiva, Huila. Regalos personalizados para toda ocasión y envíos a toda Colombia.",
  url: resolveSiteUrl(),
  locale: "es_CO",
  contact: {
    phone: "3127269317",
    phoneDisplay: "312 726 9317",
    whatsapp: "573127269317",
    instagramHandle: "velaire.velas_",
    instagramUrl: "https://www.instagram.com/velaire.velas_/",
    facebookName: "Velaire Velas",
    facebookUrl: "https://www.facebook.com/people/Velaire-Velas/61582776355168/",
    tiktokHandle: "velaire.velas",
    tiktokUrl: "https://www.tiktok.com/@velaire.velas",
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
  seo: {
    /** Título de la página de inicio (lo que se ve en Google). */
    homeTitle: "Ramos de flores en vela aromatizada en Neiva, Huila | Velaire",
    keywords: [
      "ramos de flores Neiva",
      "ramos de flores aromatizados",
      "bouquet de velas",
      "flores en vela",
      "rosas en vela",
      "velas aromáticas Neiva",
      "regalos personalizados Neiva",
      "detalles para regalar Neiva",
      "recordatorios en vela",
      "velas artesanales Huila",
    ],
    googleVerification: googleVerificationCodes(),
  },
} as const;

export type SiteConfig = typeof siteConfig;
