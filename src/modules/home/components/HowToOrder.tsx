import { ArrowRight } from "lucide-react";
import { SunRays } from "@/components/brand/SunRays";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Step } from "@/modules/content/content.service";
import { OrderSteps } from "@/modules/shipping/components/OrderSteps";

export function HowToOrder({ steps }: { steps: Step[] }) {
  return (
    <section className="relative overflow-hidden bg-cacao-950 py-20 text-white sm:py-28">
      <SunRays className="pointer-events-none absolute -bottom-10 left-1/2 w-[60rem] max-w-none -translate-x-1/2 text-clay-500/15" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] text-gold-400 uppercase">Cómo pedir</p>
          <h2 className="font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl">
            Así de fácil es tener tu <em className="text-gold-300">Velaire</em>
          </h2>
          <p className="mt-4 text-blush-200/80 sm:text-lg">
            Arma tu pedido en la web y termínalo por WhatsApp. Te acompañamos en cada paso.
          </p>
        </div>
        <div className="mt-14">
          <OrderSteps steps={steps} tone="dark" />
        </div>
        <div className="mt-14 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/catalogo" variant="light" size="lg">
            Empezar mi pedido <ArrowRight className="size-4.5" />
          </ButtonLink>
          <ButtonLink href="/envios" variant="outlineLight" size="lg">
            Envíos y tiempos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
