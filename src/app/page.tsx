import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
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
import { LocalSeoSection } from "@/modules/home/components/LocalSeoSection";
import { Marquee } from "@/modules/home/components/Marquee";
import { OccasionsSection } from "@/modules/home/components/OccasionsSection";
import { businessJsonLd } from "@/modules/seo/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

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

  return (
    <>
      <JsonLd data={businessJsonLd(categories)} />
      <Hero productCount={products.length} />
      <Marquee />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featured} categoryNames={categoryNames} />
      <AboutSection />
      <OccasionsSection />
      <HowToOrder steps={shipping.steps} />
      <CareGuide guide={care} />
      <InstagramGallery products={latest} />
      <LocalSeoSection />
      <CtaSection />
    </>
  );
}
