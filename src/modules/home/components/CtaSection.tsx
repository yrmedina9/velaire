import { SunRays } from "@/components/brand/SunRays";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function CtaSection() {
  return (
    <section className="pb-20 sm:pb-28">
      <Container>
        <div className="bg-grain relative overflow-hidden rounded-[2.5rem] bg-clay-500 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
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
            className="mt-8"
          >
            <WhatsAppIcon className="size-5 text-whatsapp-dark" /> Escribir al {siteConfig.contact.phoneDisplay}
          </ExternalButton>
        </div>
      </Container>
    </section>
  );
}
