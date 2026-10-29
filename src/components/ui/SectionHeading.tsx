import type { ReactNode } from "react";
import { SunRays } from "@/components/brand/SunRays";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Ícono de Lucide para el antetítulo (por defecto, los rayos del logo). */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}

/**
 * Encabezado de sección. Envuelve en <em> la palabra a resaltar
 * dentro de `title` para el acento en cursiva terracota.
 */
export function SectionHeading({
  eyebrow,
  icon,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 inline-flex items-center gap-2 rounded-full bg-clay-500/8 py-1 pr-3 pl-2 text-[0.68rem] font-semibold tracking-[0.2em] text-clay-600 uppercase [&>svg]:size-3.5 [&>svg]:stroke-[2]",
          )}
        >
          {icon ?? <SunRays className="w-5" />}
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-[2.15rem] leading-[1.05] font-medium text-cacao-900 text-balance sm:text-5xl [&_em]:text-clay-500 [&_em]:italic">
        {title}
      </Tag>
      {description && (
        <p className="mt-3 text-[0.95rem] leading-relaxed text-cacao-700 text-pretty sm:mt-4 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
