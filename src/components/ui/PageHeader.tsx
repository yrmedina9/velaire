import type { ReactNode } from "react";
import { SunRays } from "@/components/brand/SunRays";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { Container } from "./Container";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
}

/** Cabecera de las páginas internas con el motivo de rayos de sol. */
export function PageHeader({ title, description, breadcrumbs, children }: PageHeaderProps) {
  return (
    <section className="bg-grain relative overflow-hidden bg-blush-200">
      <SunRays className="pointer-events-none absolute -bottom-6 left-1/2 w-[46rem] max-w-none -translate-x-1/2 text-clay-400/20" />
      <Container className="relative py-14 text-center sm:py-20">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6 justify-center" />}
        <h1 className="mx-auto max-w-3xl animate-fade-up font-display text-5xl leading-[1] font-medium text-balance sm:text-6xl [&_em]:text-clay-500 [&_em]:italic">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-cacao-700 text-pretty sm:text-lg">{description}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
