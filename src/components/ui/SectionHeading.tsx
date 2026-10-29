import type { ReactNode } from "react";
import { SunRays } from "@/components/brand/SunRays";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
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
            "mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-clay-500",
            centered && "justify-center",
          )}
        >
          <SunRays className="w-6" />
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-4xl leading-[1.05] font-medium text-cacao-900 text-balance sm:text-5xl [&_em]:text-clay-500 [&_em]:italic">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-cacao-700 text-pretty sm:text-lg">{description}</p>
      )}
    </div>
  );
}
