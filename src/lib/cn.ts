import { extendTailwindMerge } from "tailwind-merge";

/** tailwind-merge con las sombras propias de la marca registradas. */
const twMerge = extendTailwindMerge({
  extend: {
    theme: { shadow: ["hairline", "soft", "card", "float", "glow"] },
  },
});

/**
 * Une clases condicionales de Tailwind; si dos clases chocan
 * (p. ej. `rounded-full` y `rounded-2xl`) gana la última.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(...classes);
}
