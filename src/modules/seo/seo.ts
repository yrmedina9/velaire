import { siteConfig } from "@/config/site";
import type { Category, CategoryWithCount, Product } from "@/modules/catalog/domain/catalog.types";

const MAX_DESCRIPTION = 158;

/** URL absoluta con el dominio canónico del sitio. */
export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * Título del producto en Google: nombre + qué es + ciudad, por ejemplo
 * "Bouquet Coral · Ramo de flores en vela en Neiva". La plantilla del
 * layout agrega "| Velaire".
 */
export function productSeoTitle(product: Product, category?: Category) {
  const base = category ? `${product.name} · ${category.productNoun}` : product.name;
  return base.length <= 44 ? `${base} en ${siteConfig.contact.city}` : base;
}

export function productSeoDescription(product: Product) {
  const { city, region } = siteConfig.contact;
  return clip(
    `${product.shortDescription} Hecho a mano en ${city}, ${region}. Pídelo por WhatsApp, con envíos a toda Colombia.`,
    MAX_DESCRIPTION,
  );
}

/* ───────────── Datos estructurados (schema.org) ───────────── */

const businessId = () => absoluteUrl("/#negocio");

/** Negocio local + sitio web: ayuda a Google a asociar Velaire con Neiva. */
export function businessJsonLd(categories: CategoryWithCount[]) {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Store",
        "@id": businessId(),
        name: siteConfig.name,
        alternateName: `${siteConfig.name} ${siteConfig.tagline}`,
        description: siteConfig.description,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/icons/icon-512.png"),
        image: absoluteUrl("/opengraph-image"),
        telephone: `+57${contact.phone}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: contact.city,
          addressRegion: contact.region,
          addressCountry: "CO",
        },
        areaServed: [
          { "@type": "City", name: contact.city },
          { "@type": "State", name: contact.region },
          { "@type": "Country", name: contact.country },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: `+57${contact.phone}`,
          contactType: "sales",
          availableLanguage: "Spanish",
        },
        knowsAbout: [
          "Ramos de flores en vela",
          "Bouquets aromatizados",
          "Velas artesanales",
          "Recordatorios para eventos",
          "Regalos personalizados",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: `Catálogo ${siteConfig.name}`,
          itemListElement: categories.map((category) => ({
            "@type": "OfferCatalog",
            name: category.name,
            url: absoluteUrl(`/catalogo/${category.slug}`),
          })),
        },
        sameAs: [contact.instagramUrl],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#sitio"),
        name: siteConfig.name,
        url: absoluteUrl("/"),
        inLanguage: "es-CO",
        publisher: { "@id": businessId() },
      },
    ],
  };
}

/** Migas de pan que Google muestra bajo el título del resultado. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
