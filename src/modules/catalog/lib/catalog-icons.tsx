import {
  Baby,
  Briefcase,
  Cake,
  Church,
  Flame,
  Flower2,
  Gem,
  Gift,
  Heart,
  type LucideIcon,
  type LucideProps,
  Ribbon,
  Sofa,
  Sparkles,
  Sun,
  TreePine,
} from "lucide-react";
import { createElement } from "react";

/** Ícono representativo de cada categoría. */
export const categoryIcons: Record<string, LucideIcon> = {
  bouquets: Flower2,
  detalles: Gift,
  recordatorios: Ribbon,
  navidad: TreePine,
  decorativas: Flame,
};

/** Ícono de cada ocasión para chips y tarjetas. */
export const occasionIcons: Record<string, LucideIcon> = {
  "amor-y-amistad": Heart,
  "dia-de-la-madre": Flower2,
  cumpleanos: Cake,
  aniversario: Gem,
  "dia-de-la-mujer": Sparkles,
  "flores-amarillas": Sun,
  navidad: TreePine,
  "primera-comunion": Church,
  "baby-shower": Baby,
  recordatorio: Ribbon,
  empresarial: Briefcase,
  religioso: Church,
  decoracion: Sofa,
};

type IconProps = { slug: string } & LucideProps;

/** Ícono de una categoría: `<CategoryIcon slug="bouquets" className="size-4" />`. */
export function CategoryIcon({ slug, ...props }: IconProps) {
  return createElement(categoryIcons[slug] ?? Sparkles, props);
}

/** Ícono de una ocasión: `<OccasionIcon slug="cumpleanos" />`. */
export function OccasionIcon({ slug, ...props }: IconProps) {
  return createElement(occasionIcons[slug] ?? Gift, props);
}
