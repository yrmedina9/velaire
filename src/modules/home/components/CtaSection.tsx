import { SunRays } from "@/components/brand/SunRays";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function CtaSection() {
  return (
    <section className="pb-14 sm:pb-28">
      <Container>
        <div className="grain relative overflow-hidden rounded-[2rem] bg-linear-to-br from-clay-400 via-clay-500 to-clay-700 px-6 py-14 text-center text-white shadow-float ring-1 ring-white/10 sm:rounded-[2.5rem] sm:px-12 sm:py-20">
          <SunRays animated className="mx-auto w-28 text-gold-300" />
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl leading-[1.05] font-medium text-balance sm:text-6xl">
            ¿Tienes una idea? La hacemos <em className="text-gold-300">realidad</em>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85 sm:text-lg">
            Colores, aromas, iniciales, recordatorios por cantidad… Escríbenos y creamos un detalle único para ti.
          </p>
          <ExternalButton
            href={whatsappLink("¡Hola Velaire! 🕯️ Tengo una idea para un detalle personalizado.")}
            variant="light"
            size="lg"
            className="tap mt-8"
          >
            <WhatsAppIcon className="size-5 text-whatsapp-dark" /> Escribir al {siteConfig.contact.phoneDisplay}
          </ExternalButton>
        </div>
      </Container>
    </section>
  );
}
