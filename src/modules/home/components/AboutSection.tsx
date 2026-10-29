import { Check, Flower2, Gift, HandHeart, Palette, Store } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const values = [
  { icon: HandHeart, title: "Hecho a mano", text: "Cada flor se moldea pétalo a pétalo en nuestro taller." },
  { icon: Palette, title: "Personalizado", text: "Tú eliges colores, aroma y el mensaje de la tarjeta." },
  { icon: Flower2, title: "Aromatizado", text: "Velas que decoran, perfuman y nunca se marchitan." },
  { icon: Gift, title: "Listo para regalar", text: "Lazos de satín, mariposas doradas y empaque de regalo." },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="scroll-mt-24 overflow-hidden py-14 sm:py-28">
      <Container className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg">
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-t-full rounded-b-[2.5rem]">
            <Image
              src="/images/products/bouquet-coral-1.webp"
              alt="Bouquet de flores en vela coral sobre la mesa de una sala"
              fill
              sizes="(min-width: 1024px) 30vw, 70vw"
              className="object-cover"
            />
          </div>
          <div className="absolute right-0 bottom-[-6%] w-[48%] overflow-hidden rounded-[2rem] shadow-2xl ring-8 ring-blush-50">
            <Image
              src="/images/products/vela-bambuquera-1.webp"
              alt="Vela bambuquera rosada, homenaje a la tradición del Huila"
              width={600}
              height={800}
              sizes="(min-width: 1024px) 18vw, 45vw"
              className="aspect-[3/4] object-cover"
            />
          </div>
          <div className="absolute top-8 right-4 grid size-28 place-items-center rounded-full bg-clay-500 p-4 text-center text-white shadow-xl sm:size-32">
            <span className="font-display text-sm leading-tight italic sm:text-base">
              Orgullo
              <br />
              <span className="text-2xl not-italic sm:text-3xl">opita</span>
            </span>
          </div>
        </div>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Sobre Velaire"
            icon={<Store />}
            title={
              <>
                Detalles que <em>iluminan</em> espacios y corazones
              </>
            }
            description={`Somos un taller de velas artesanales en ${siteConfig.contact.city}, ${siteConfig.contact.region}. Convertimos la cera en rosas, peonías y tulipanes que perfuman, decoran y cuentan historias: regalos para decir "te quiero" sin palabras.`}
          />
          <ul className="mt-6 flex flex-wrap gap-2">
            {siteConfig.services.map((service) => (
              <li key={service} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm text-cacao-700 shadow-hairline">
                <Check className="size-3.5 text-clay-500" strokeWidth={2.2} />
                {service}
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-clay-600 shadow-soft">
                  <Icon className="size-5.5" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-cacao-700">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
