import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
    <section className="bg-grain bg-blush-200 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Ocasiones"
          title={
            <>
              Un detalle para cada <em>momento</em>
            </>
          }
          description="Celebra, agradece o sorprende. Elige la ocasión y te mostramos las ideas que mejor la acompañan."
        />
        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <li key={item.slug} className="reveal">
              <Link
                href={`/catalogo?ocasion=${item.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[1.75rem] sm:aspect-[16/11]"
              >
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-linear-to-t from-cacao-950/75 via-cacao-950/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
                  <span className="font-display text-2xl leading-none text-white sm:text-3xl">{item.title}</span>
                  <span className="hidden rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur transition group-hover:bg-white group-hover:text-clay-600 sm:inline">
                    Ver ideas
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
