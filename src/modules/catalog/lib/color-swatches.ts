/** Tono aproximado de cada color del catálogo para las muestras. */
const swatches: Record<string, string> = {
  rosa: "#eaa2b4",
  fucsia: "#d0457f",
  coral: "#ef8a73",
  rojo: "#b8242f",
  vino: "#6e1f2b",
  lila: "#b9a2dc",
  morado: "#7d5ba6",
  azul: "#7fb2e5",
  amarillo: "#f2cb4c",
  naranja: "#ef9a3c",
  durazno: "#f4bfa0",
  crema: "#f3e7cf",
  blanco: "#fbf8f4",
  verde: "#5e8f63",
  dorado: "#c9a14f",
  "café": "#8a6248",
  multicolor: "linear-gradient(135deg, #eaa2b4, #f2cb4c, #7fb2e5, #b9a2dc)",
};

export function swatchFor(color: string) {
  return swatches[color.toLowerCase()] ?? "#e0cbc6";
}
