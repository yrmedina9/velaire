import { ArrowUpRight, Gift, MapPin, Truck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { CategoryIcon, OccasionIcon } from "@/modules/catalog/lib/catalog-icons";

const { city, region } = siteConfig.contact;

const popularSearches: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Ramos de flores para cumpleaños", href: "/catalogo?ocasion=cumpleanos", icon: <OccasionIcon slug="cumpleanos" /> },
  { label: "Regalos para el Día de la Madre", href: "/catalogo?ocasion=dia-de-la-madre", icon: <OccasionIcon slug="dia-de-la-madre" /> },
  { label: "Ramos para Amor y Amistad", href: "/catalogo?ocasion=amor-y-amistad", icon: <OccasionIcon slug="amor-y-amistad" /> },
  { label: "Bouquets de rosas en vela", href: "/catalogo/bouquets", icon: <CategoryIcon slug="bouquets" /> },
  { label: "Inicial con rosas y chocolates", href: "/producto/inicial-rosas-chocolates", icon: <Gift /> },
  { label: "Recordatorios de primera comunión", href: "/catalogo?ocasion=primera-comunion", icon: <OccasionIcon slug="primera-comunion" /> },
  { label: "Velas de Navidad y velitas", href: "/catalogo/navidad", icon: <CategoryIcon slug="navidad" /> },
  { label: "Velas aromáticas decorativas", href: "/catalogo/decorativas", icon: <CategoryIcon slug="decorativas" /> },
];

/**
 * Texto local para quien busca "ramos de flores en Neiva": explica qué
 * hacemos, dónde y cómo llega, con enlaces a las búsquedas frecuentes.
 */
export function LocalSeoSection() {
  return (
    <section aria-labelledby="ramos-neiva" className="py-14 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            eyebrow={`${city}, ${region}`}
            icon={<MapPin />}
            title={
              <span id="ramos-neiva">
                Ramos de flores aromatizados en <em>{city}</em>
              </span>
            }
          />
          <div className="mt-5 space-y-4 leading-relaxed text-cacao-700">
            <p>
              Velaire es un taller de velas artesanales en {city}, {region}. Hacemos ramos y bouquets de flores en
              vela aromatizada: rosas, peonías y tulipanes moldeados a mano que perfuman, decoran y nunca se
              marchitan. Son una alternativa diferente a las flores naturales para regalar en cumpleaños,
              aniversarios, Amor y Amistad o el Día de la Madre.
            </p>
            <p>
              También elaboramos cajitas de regalo, iniciales con rosas y chocolates, recordatorios para primera
              comunión, bautizos y eventos empresariales, y velas de Navidad. Todo se personaliza con tus colores,
              aroma y mensaje, y se pide fácil por WhatsApp.
            </p>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2 text-sm">
            <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-hairline">
              <MapPin className="size-4 text-clay-500" strokeWidth={1.8} /> Entrega a domicilio en {city}
            </li>
            <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 shadow-hairline">
              <Truck className="size-4 text-clay-500" strokeWidth={1.8} /> Envíos al Huila y a toda Colombia
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-[0.18em] text-cacao-500 uppercase">Lo más buscado</h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {popularSearches.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="tap group flex items-center gap-3 rounded-2xl bg-white p-3 pr-4 text-sm font-medium shadow-hairline hover:shadow-soft"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blush-100 text-clay-500 [&>svg]:size-4.5 [&>svg]:stroke-[1.8]">
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  <ArrowUpRight className="size-4 text-cacao-500 transition group-hover:text-clay-600" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
