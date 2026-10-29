import { ArrowRight, ListChecks, Truck } from "lucide-react";
import { SunRays } from "@/components/brand/SunRays";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { Step } from "@/modules/content/content.service";
import { OrderSteps } from "@/modules/shipping/components/OrderSteps";

export function HowToOrder({ steps }: { steps: Step[] }) {
  return (
    <section className="relative overflow-hidden bg-cacao-950 py-14 text-white sm:py-28">
      <SunRays className="pointer-events-none absolute -bottom-10 left-1/2 w-[60rem] max-w-none -translate-x-1/2 text-clay-500/15" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/8 py-1 pr-3 pl-2 text-[0.68rem] font-semibold tracking-[0.2em] text-gold-300 uppercase ring-1 ring-white/10">
            <ListChecks className="size-3.5" strokeWidth={2} /> Cómo pedir
          </p>
          <h2 className="font-display text-[2.15rem] leading-[1.05] font-medium text-balance sm:text-5xl">
            Así de fácil es tener tu <em className="text-gold-300">Velaire</em>
          </h2>
          <p className="mt-4 text-blush-200/80 sm:text-lg">
            Arma tu pedido en la web y termínalo por WhatsApp. Te acompañamos en cada paso.
          </p>
        </div>
        <div className="mt-10 sm:mt-14">
          <OrderSteps steps={steps} tone="dark" />
        </div>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:mt-14 sm:flex-row">
          <ButtonLink href="/catalogo" variant="light" size="lg" className="tap">
            Empezar mi pedido <ArrowRight className="size-4.5" />
          </ButtonLink>
          <ButtonLink href="/envios" variant="outlineLight" size="lg" className="tap">
            <Truck className="size-4.5" strokeWidth={1.8} />
            Envíos y tiempos
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
