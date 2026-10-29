import { Camera } from "lucide-react";
import Image from "next/image";
import { SunRays } from "@/components/brand/SunRays";
import { InstagramIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import type { Product } from "@/modules/catalog/domain/catalog.types";

export function InstagramGallery({ products }: { products: Product[] }) {
  return (
    <section className="py-14 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Instagram"
          icon={<Camera />}
          title={
            <>
              Recién salidas del <em>taller</em>
            </>
          }
          description="Síguenos en Instagram para ver nuestras creaciones más recientes, sorteos y ediciones de temporada."
        />
        <div className="surface mx-auto mt-8 max-w-5xl rounded-[2rem] p-2.5 sm:mt-12 sm:p-4">
          <div className="flex items-center gap-3 px-1.5 pt-1 pb-3.5 sm:px-2 sm:pb-4">
            <span className="shrink-0 rounded-full bg-conic from-clay-500 via-gold-400 to-clay-500 p-[2.5px]">
              <span className="block rounded-full bg-white p-[2.5px]">
                <span className="grid size-12 place-items-center rounded-full bg-blush-200 text-clay-500">
                  <SunRays className="w-8" />
                </span>
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">@{siteConfig.contact.instagramHandle}</p>
              <p className="truncate text-xs text-cacao-500">
                {siteConfig.tagline} · {siteConfig.contact.city}, {siteConfig.contact.region}
              </p>
            </div>
            <ExternalButton href={siteConfig.contact.instagramUrl} size="sm" className="tap">
              <InstagramIcon className="size-4" /> Seguir
            </ExternalButton>
          </div>
          <ul className="grid grid-cols-3 gap-1 overflow-hidden rounded-[1.4rem] sm:gap-2 lg:grid-cols-6">
            {products.map((product) => (
              <li key={product.slug}>
                <a
                  href={product.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${product.name} en Instagram`}
                  className="group relative block aspect-square overflow-hidden bg-blush-200 sm:rounded-xl"
                >
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    fill
                    sizes="(min-width: 1024px) 16vw, 33vw"
                    className="object-cover transition duration-700 ease-(--ease-ios) group-hover:scale-110"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-clay-600/0 text-white opacity-0 transition group-hover:bg-clay-600/45 group-hover:opacity-100">
                    <InstagramIcon className="size-7" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
