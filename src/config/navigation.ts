import { House, LayoutGrid, type LucideIcon, MessageCircleHeart, Truck } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  /** Etiqueta corta para tablet y la barra inferior. */
  shortLabel: string;
  icon: LucideIcon;
}

export const mainNav: NavItem[] = [
  { href: "/", label: "Inicio", shortLabel: "Inicio", icon: House },
  { href: "/catalogo", label: "Catálogo", shortLabel: "Catálogo", icon: LayoutGrid },
  { href: "/envios", label: "Envíos y pagos", shortLabel: "Envíos", icon: Truck },
  { href: "/contacto", label: "Contacto", shortLabel: "Contacto", icon: MessageCircleHeart },
];

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Subpáginas que en móvil muestran "atrás" en lugar de ser una pestaña. */
export function parentPathOf(pathname: string) {
  if (pathname.startsWith("/producto/")) return "/catalogo";
  if (/^\/catalogo\/.+/.test(pathname)) return "/catalogo";
  return null;
}
