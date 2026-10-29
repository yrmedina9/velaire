import { Flame, Hand, Scissors, ShieldCheck, UtensilsCrossed } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { CareGuide as CareGuideData } from "@/modules/content/content.service";

const icons = [Hand, UtensilsCrossed, Scissors, Flame];

/** Guía de encendido del bouquet, basada en la tarjeta que entrega Velaire. */
export function CareGuide({ guide }: { guide: CareGuideData }) {
  return (
    <section id="cuidados" className="scroll-mt-24 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Guía de encendido"
              title={
                <>
                  Enciende tu <em>bouquet</em> de velas
                </>
              }
              description="Tus flores no se marchitan: disfrútalas como decoración el tiempo que quieras y, cuando lo desees, enciéndelas una a una."
            />
            <ul className="mt-8 space-y-3">
              {guide.tips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm text-cacao-700">
                  <ShieldCheck className="mt-0.5 size-4.5 shrink-0 text-clay-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {guide.steps.map((step, index) => {
              const Icon = icons[index % icons.length];
              return (
                <li
                  key={step.title}
                  className="reveal relative overflow-hidden rounded-[1.75rem] bg-white/80 p-6 ring-1 ring-blush-200"
                >
                  <span className="absolute -top-4 -right-1 font-display text-8xl text-blush-200 select-none" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-full bg-blush-200 text-clay-600">
                    <Icon className="size-5.5" strokeWidth={1.6} />
                  </span>
                  <h3 className="relative mt-4 font-display text-2xl">{step.title}</h3>
                  <p className="relative mt-1 text-sm leading-relaxed text-cacao-700">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
