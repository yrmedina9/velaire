import { Container } from "@/components/ui/Container";

const block = "animate-pulse rounded-full bg-blush-200";

/** Esqueleto mostrado al instante mientras carga una ficha de producto. */
export function ProductSkeleton() {
  return (
    <Container className="pt-8 pb-16" aria-busy="true" aria-label="Cargando producto">
      <div className={`${block} h-4 w-64`} />
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/5] animate-pulse rounded-t-[12rem] rounded-b-[2rem] bg-blush-200 sm:rounded-t-[16rem]" />
        <div className="space-y-5">
          <div className={`${block} h-3 w-32`} />
          <div className={`${block} h-12 w-4/5`} />
          <div className={`${block} h-5 w-3/5`} />
          <div className={`${block} mt-8 h-9 w-48`} />
          <div className="space-y-3 pt-6">
            <div className={`${block} h-4 w-full`} />
            <div className={`${block} h-4 w-11/12`} />
            <div className={`${block} h-4 w-3/4`} />
          </div>
          <div className="flex gap-3 pt-6">
            <div className={`${block} h-13 flex-1`} />
            <div className={`${block} h-13 flex-1`} />
          </div>
        </div>
      </div>
    </Container>
  );
}

/** Esqueleto de una página de categoría del catálogo. */
export function CatalogSkeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando catálogo">
      <div className="bg-blush-200 py-20">
        <div className="mx-auto h-14 w-72 animate-pulse rounded-full bg-blush-300/70" />
        <div className="mx-auto mt-6 h-4 w-96 max-w-[80%] animate-pulse rounded-full bg-blush-300/70" />
      </div>
      <Container className="py-14">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i}>
              <div className="aspect-[4/5] animate-pulse rounded-[1.75rem] bg-blush-200" />
              <div className={`${block} mt-4 h-5 w-3/4`} />
              <div className={`${block} mt-2 h-3 w-1/2`} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
