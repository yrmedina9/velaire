import { ArrowRight, Flower2, HandHeart, Palette, Sparkles, Truck } from "lucide-react";
import Image from "next/image";
import { SunRays } from "@/components/brand/SunRays";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ButtonLink, ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero({ productCount }: { productCount: number }) {
  const stats = [
    { icon: Flower2, value: `+${Math.floor(productCount / 10) * 10}`, label: "diseños únicos" },
    { icon: HandHeart, value: "100%", label: "hecho a mano" },
    { icon: Truck, value: "Colombia", label: "envíos nacionales" },
  ];

  return (
    <section className="grain relative overflow-hidden bg-blush-200">
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 size-[34rem] rounded-full bg-blush-50/70 blur-3xl"
      />
      <Container className="relative grid items-center gap-12 pt-8 pb-14 sm:gap-14 sm:pt-12 sm:pb-20 lg:grid-cols-[1.05fr_1fr] lg:pt-16 lg:pb-28">
        <div className="animate-fade-up">
          {/* El H1 describe el negocio para Google; el eslogan es decorativo */}
          <h1 className="surface inline-flex items-center gap-2 rounded-2xl px-3.5 py-1.5 sm:rounded-full text-[0.68rem] font-semibold tracking-[0.14em] text-clay-600 uppercase sm:text-xs">
            <Sparkles className="size-3.5 shrink-0" aria-hidden="true" />
            Ramos de flores en vela aromatizada en {siteConfig.contact.city}, {siteConfig.contact.region}
          </h1>
          <p className="mt-5 font-display text-[2.9rem] leading-[0.95] font-medium text-cacao-900 text-balance sm:mt-6 sm:text-7xl xl:text-[5.6rem]">
            Flores que no se marchitan, <em className="text-clay-500">luz</em> que enamora
          </p>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cacao-700 text-pretty sm:mt-6 sm:text-lg">
            Ramos, bouquets y detalles en vela aromatizada hechos a mano en {siteConfig.contact.city}, para regalar
            amor y celebrar momentos especiales. Personaliza colores, aromas y mensaje.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <ButtonLink href="/catalogo" size="lg" className="tap">
              Explorar catálogo <ArrowRight className="size-4.5" />
            </ButtonLink>
            <ExternalButton
              href={whatsappLink("¡Hola Velaire! 🕯️ Quiero hacer un pedido personalizado.")}
              variant="secondary"
              size="lg"
              className="tap"
            >
              <WhatsAppIcon className="size-5 text-whatsapp-dark" /> Pedido personalizado
            </ExternalButton>
          </div>
          <ul className="mt-8 grid max-w-lg grid-cols-3 gap-2 sm:mt-12 sm:gap-3">
            {stats.map(({ icon: Icon, value, label }) => (
              <li
                key={label}
                className="flex flex-col gap-2 rounded-[1.25rem] bg-white/70 p-3 shadow-hairline backdrop-blur sm:flex-row sm:items-center sm:gap-3"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-clay-500/10 text-clay-600">
                  <Icon className="size-4.5" strokeWidth={1.7} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-xl leading-none text-cacao-900 sm:text-2xl">{value}</span>
                  <span className="mt-1 block text-[0.68rem] leading-tight text-cacao-500 sm:text-xs">{label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <SunRays
            animated
            className="absolute -top-14 left-1/2 w-[115%] -translate-x-1/2 text-clay-400/35 sm:-top-20"
          />
          <div className="relative mx-auto aspect-[4/5] w-[82%] overflow-hidden rounded-t-full rounded-b-[2.5rem] shadow-float ring-8 ring-blush-50">
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

          <div className="absolute bottom-10 -left-2 w-[38%] animate-float overflow-hidden rounded-full shadow-float ring-6 ring-blush-50 sm:left-0">
            <Image
              src="/images/products/inicial-rosas-chocolates-1.webp"
              alt="Inicial personalizada con rosas rojas en vela y chocolates"
              width={400}
              height={400}
              sizes="20vw"
              className="aspect-square object-cover"
            />
          </div>

          <div className="glass absolute top-[18%] -right-1 flex animate-float items-center gap-3 rounded-2xl p-2.5 pr-4 shadow-float ring-1 ring-white/70 [animation-delay:1.5s] sm:right-0 sm:p-3 sm:pr-5">
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
