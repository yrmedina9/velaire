import care from "@/data/content/care.json";
import faq from "@/data/content/faq.json";
import shipping from "@/data/content/shipping.json";

export type ShippingInfo = typeof shipping;
export type ShippingZone = ShippingInfo["zones"][number];
export type Step = ShippingInfo["steps"][number];
export type FaqItem = (typeof faq)[number];
export type CareGuide = typeof care;

/** Contenido informativo del sitio (envíos, pagos, FAQ, cuidados). */
export async function getShippingInfo(): Promise<ShippingInfo> {
  return shipping;
}

export async function getFaqs(): Promise<FaqItem[]> {
  return faq;
}

export async function getCareGuide(): Promise<CareGuide> {
  return care;
}
