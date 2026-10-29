export interface NavItem {
  href: string;
  label: string;
}

export const mainNav: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/envios", label: "Envíos y pagos" },
  { href: "/contacto", label: "Contacto" },
];
