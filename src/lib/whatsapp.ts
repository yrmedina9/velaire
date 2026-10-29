import { siteConfig } from "@/config/site";

/** Enlace de WhatsApp al número de Velaire con un mensaje opcional. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function productInquiryMessage(productName: string) {
  return `¡Hola Velaire! 🕯️ Me interesa el producto "${productName}". ¿Me cuentas precio, colores y aromas disponibles?`;
}
