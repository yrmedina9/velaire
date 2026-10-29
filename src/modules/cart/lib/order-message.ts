import { formatPrice } from "@/lib/format";
import type { CartItem, CustomerDetails } from "../domain/cart.types";

/** Construye el mensaje de WhatsApp con el resumen del pedido. */
export function buildOrderMessage(items: CartItem[], customer: CustomerDetails) {
  const lines = [
    "¡Hola Velaire! 🕯️ Quiero hacer este pedido:",
    "",
    ...items.map((item) => `• ${item.quantity} x ${item.name} (${formatPrice(item.price)})`),
  ];

  const priced = items.every((item) => item.price !== null);
  if (priced) {
    const total = items.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
    lines.push("", `Subtotal: ${formatPrice(total)} + envío`);
  }

  const details = [
    customer.name.trim() && `Nombre: ${customer.name.trim()}`,
    customer.city.trim() && `Ciudad de entrega: ${customer.city.trim()}`,
    customer.notes.trim() && `Personalización: ${customer.notes.trim()}`,
  ].filter(Boolean) as string[];
  if (details.length > 0) lines.push("", ...details);

  lines.push("", "¿Me confirmas disponibilidad, valor total y envío? ¡Gracias!");

  return lines.join("\n");
}
