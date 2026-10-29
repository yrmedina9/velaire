import type { ReactNode } from "react";
import { SunRays } from "@/components/brand/SunRays";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  /** Ícono de Lucide que se muestra en una insignia sobre el título. */
  icon?: ReactNode;
  children?: ReactNode;
}

/** Cabecera de las páginas internas con el motivo de rayos de sol. */
export function PageHeader({ title, description, breadcrumbs, icon, children }: PageHeaderProps) {
  return (
    <section className="grain relative overflow-hidden bg-blush-200">
      <SunRays className="pointer-events-none absolute -bottom-6 left-1/2 w-[34rem] max-w-none -translate-x-1/2 text-clay-400/20 sm:w-[46rem]" />
      <Container className="relative py-9 text-center sm:py-16 md:py-20">
        {breadcrumbs && (
          <div className="mb-6 hidden md:block">
            <Breadcrumbs items={breadcrumbs} className="justify-center" />
          </div>
        )}
        {icon && (
          <span className="surface mx-auto mb-4 grid size-12 animate-fade-up place-items-center rounded-2xl text-clay-500 [&>svg]:size-5.5 [&>svg]:stroke-[1.6] sm:size-14 sm:[&>svg]:size-6">
            {icon}
          </span>
        )}
        <h1 className="mx-auto max-w-3xl animate-fade-up font-display text-[2.6rem] leading-[1] font-medium text-balance sm:text-6xl [&_em]:text-clay-500 [&_em]:italic">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-cacao-700 text-pretty sm:mt-5 sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
