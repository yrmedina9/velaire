import { ArrowUpRight, CalendarHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OccasionIcon } from "@/modules/catalog/lib/catalog-icons";

const highlights = [
  { slug: "amor-y-amistad", title: "Amor y amistad", image: "/images/products/ramo-amor-y-pureza-1.webp" },
  { slug: "dia-de-la-madre", title: "Para mamá", image: "/images/products/inicial-rosas-chocolates-2.webp" },
  { slug: "cumpleanos", title: "Cumpleaños", image: "/images/products/bouquet-feliz-cumpleanos-1.webp" },
  { slug: "primera-comunion", title: "Primera Comunión", image: "/images/products/angel-primera-comunion-1.webp" },
  { slug: "empresarial", title: "Empresas y eventos", image: "/images/products/arbolito-recordatorio-1.webp" },
  { slug: "navidad", title: "Navidad", image: "/images/products/set-navideno-1.webp" },
];

export function OccasionsSection() {
  return (
    <section className="grain relative bg-blush-200 py-14 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ocasiones"
          icon={<CalendarHeart />}
          title={
            <>
              Un detalle para cada <em>momento</em>
            </>
          }
          description="Celebra, agradece o sorprende. Elige la ocasión y te mostramos las ideas que mejor la acompañan."
        />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.slug} className="reveal">
              <Link
                href={`/catalogo?ocasion=${item.slug}`}
                className="tap group relative block aspect-[4/5] overflow-hidden rounded-[1.6rem] shadow-card ring-1 ring-cacao-900/5 sm:aspect-[16/11]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-cover transition duration-700 ease-(--ease-ios) group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-linear-to-t from-cacao-950/80 via-cacao-950/10 to-transparent" />
                <span className="absolute top-3 left-3 grid size-9 place-items-center rounded-full bg-white/85 text-clay-600 shadow-soft backdrop-blur-md sm:top-4 sm:left-4 sm:size-10">
                  <OccasionIcon slug={item.slug} className="size-4.5" strokeWidth={1.8} />
                </span>
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-6">
                  <span className="font-display text-[1.45rem] leading-[1.05] text-white sm:text-3xl">{item.title}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition group-hover:bg-white group-hover:text-clay-600 sm:size-10">
                    <ArrowUpRight className="size-4 sm:size-5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
