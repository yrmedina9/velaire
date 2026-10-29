import Image from "next/image";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Product } from "@/modules/catalog/domain/catalog.types";

export function InstagramGallery({ products }: { products: Product[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow={`@${siteConfig.contact.instagramHandle}`}
          title={
            <>
              Recién salidas del <em>taller</em>
            </>
          }
          description="Síguenos en Instagram para ver nuestras creaciones más recientes, sorteos y ediciones de temporada."
        />
        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {products.map((product) => (
            <li key={product.slug} className="reveal">
              <a
                href={product.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${product.name} en Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-3xl"
              >
                <Image
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-clay-600/0 text-white opacity-0 transition group-hover:bg-clay-600/45 group-hover:opacity-100">
                  <InstagramIcon className="size-8" />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <ExternalButton href={siteConfig.contact.instagramUrl} variant="secondary">
            <InstagramIcon className="size-4.5" /> Seguir en Instagram
          </ExternalButton>
        </div>
      </Container>
    </section>
  );
}
