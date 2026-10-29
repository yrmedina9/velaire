import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import {
  getCategories,
  getFeaturedProducts,
  getLatestProducts,
  getProducts,
} from "@/modules/catalog/catalog.service";
import { CareGuide } from "@/modules/catalog/components/CareGuide";
import { getCareGuide, getShippingInfo } from "@/modules/content/content.service";
import { AboutSection } from "@/modules/home/components/AboutSection";
import { CategoryShowcase } from "@/modules/home/components/CategoryShowcase";
import { CtaSection } from "@/modules/home/components/CtaSection";
import { FeaturedProducts } from "@/modules/home/components/FeaturedProducts";
import { Hero } from "@/modules/home/components/Hero";
import { HowToOrder } from "@/modules/home/components/HowToOrder";
import { InstagramGallery } from "@/modules/home/components/InstagramGallery";
import { Marquee } from "@/modules/home/components/Marquee";
import { OccasionsSection } from "@/modules/home/components/OccasionsSection";

export default async function HomePage() {
  const [categories, featured, latest, products, shipping, care] = await Promise.all([
    getCategories(),
    getFeaturedProducts(8),
    getLatestProducts(6),
    getProducts(),
    getShippingInfo(),
    getCareGuide(),
  ]);
  const categoryNames = Object.fromEntries(categories.map((c) => [c.slug, c.shortName]));
  const { contact } = siteConfig;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          telephone: `+57${contact.phone}`,
          image: `${siteConfig.url}/images/products/bouquet-jardin-pastel-1.webp`,
          address: {
            "@type": "PostalAddress",
            addressLocality: contact.city,
            addressRegion: contact.region,
            addressCountry: "CO",
          },
          areaServed: "CO",
          sameAs: [contact.instagramUrl],
        }}
      />
      <Hero productCount={products.length} />
      <Marquee />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featured} categoryNames={categoryNames} />
      <AboutSection />
      <OccasionsSection />
      <HowToOrder steps={shipping.steps} />
      <CareGuide guide={care} />
      <InstagramGallery products={latest} />
      <CtaSection />
    </>
  );
}
