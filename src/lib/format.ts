const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** Formatea un precio en pesos colombianos o indica que se cotiza. */
export function formatPrice(price: number | null) {
  return price === null ? "Precio a consultar" : copFormatter.format(price);
}
