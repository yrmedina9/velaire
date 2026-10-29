import { ArrowRight, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import { SunRays } from "@/components/brand/SunRays";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero({ productCount }: { productCount: number }) {
  const stats = [
    { value: `+${Math.floor(productCount / 10) * 10}`, label: "diseños únicos" },
    { value: "100%", label: "hecho a mano" },
    { value: "🇨🇴", label: "envíos nacionales" },
  ];

  return (
    <section className="bg-grain relative overflow-hidden bg-blush-200">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 size-[34rem] rounded-full bg-blush-50/70 blur-3xl"
      />
      <Container className="relative grid items-center gap-14 pt-12 pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-28">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-clay-600 uppercase ring-1 ring-clay-300/40">
            <Sparkles className="size-3.5" /> Velas artesanales · {siteConfig.contact.city}, {siteConfig.contact.region}
          </p>
          <h1 className="mt-6 font-display text-[3.2rem] leading-[0.95] font-medium text-cacao-900 text-balance sm:text-7xl xl:text-[5.6rem]">
            Flores que no se marchitan, <em className="text-clay-500">luz</em> que enamora
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cacao-700 text-pretty">
            Bouquets, ramos y detalles en vela aromatizada, hechos a mano para regalar amor y celebrar momentos
            especiales. Personaliza colores, aromas y mensaje.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/catalogo" size="lg">
              Explorar catálogo <ArrowRight className="size-4.5" />
            </ButtonLink>
            <ExternalButton
              href={whatsappLink("¡Hola Velaire! 🕯️ Quiero hacer un pedido personalizado.")}
              variant="secondary"
              size="lg"
            >
              <WhatsAppIcon className="size-5 text-whatsapp-dark" /> Pedido personalizado
            </ExternalButton>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-clay-300/40 pt-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-clay-600 sm:text-4xl">{stat.value}</span>
                  <span className="text-xs text-cacao-700 sm:text-sm">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <SunRays
            animated
            className="absolute -top-14 left-1/2 w-[115%] -translate-x-1/2 text-clay-400/35 sm:-top-20"
          />
          <div className="relative mx-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-2xl shadow-clay-700/25 ring-8 ring-blush-50">
            <Image
              src="/images/products/bouquet-jardin-pastel-1.webp"
              alt="Bouquet de flores en vela en tonos pastel dentro de una maceta dorada"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-10 -left-2 w-[38%] animate-float overflow-hidden rounded-full shadow-xl ring-6 ring-blush-50 sm:left-0">
            <Image
              src="/images/products/inicial-rosas-chocolates-1.webp"
              alt="Inicial personalizada con rosas rojas en vela y chocolates"
              width={400}
              height={400}
              sizes="20vw"
              className="aspect-square object-cover"
            />
          </div>

          <div className="absolute top-[18%] -right-1 flex animate-float items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-xl backdrop-blur [animation-delay:1.5s] sm:right-0">
            <span className="grid size-10 place-items-center rounded-full bg-gold-300 text-cacao-900">
              <Palette className="size-5" strokeWidth={1.7} />
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-medium">Personalízalo</span>
              <span className="text-cacao-500">colores y aromas</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
