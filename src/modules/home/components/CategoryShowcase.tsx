import { LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/modules/catalog/components/CategoryCard";
import type { CategoryWithCount } from "@/modules/catalog/domain/catalog.types";

export function CategoryShowcase({ categories }: { categories: CategoryWithCount[] }) {
  return (
    <section className="py-14 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Colecciones"
          icon={<LayoutGrid />}
          title={
            <>
              Encuentra el detalle <em>perfecto</em>
            </>
          }
          description="Desde bouquets que nunca se marchitan hasta recordatorios para tus eventos y la magia de la Navidad."
        />
      </Container>
      <div className="mx-auto mt-8 max-w-7xl sm:mt-12 lg:px-8">
        <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:px-6 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {categories.map((category, index) => (
            <li
              key={category.slug}
              className="reveal w-[72%] shrink-0 snap-center sm:w-[42%] lg:w-auto"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <CategoryCard category={category} className="h-full min-h-96" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
