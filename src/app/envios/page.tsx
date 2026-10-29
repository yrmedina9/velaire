import { CircleHelp, Clock, ListChecks, Truck } from "lucide-react";
import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whatsappLink } from "@/lib/whatsapp";
import { getFaqs, getShippingInfo } from "@/modules/content/content.service";
import { FaqList } from "@/modules/shipping/components/FaqList";
import { OrderSteps } from "@/modules/shipping/components/OrderSteps";
import { PaymentAndPackaging } from "@/modules/shipping/components/PaymentAndPackaging";
import { ShippingZones } from "@/modules/shipping/components/ShippingZones";

export const metadata: Metadata = {
  title: "Envíos y pagos",
  description:
    "Envíos nacionales desde Neiva a toda Colombia. Conoce tiempos de entrega, elaboración, medios de pago y preguntas frecuentes.",
};

export default async function ShippingPage() {
  const [shipping, faqs] = await Promise.all([getShippingInfo(), getFaqs()]);

  return (
    <>
      <PageHeader
        icon={<Truck />}
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Envíos y pagos" }]}
        title={
          <>
            Envíos a toda <em>Colombia</em>
          </>
        }
        description="Hacemos cada detalle a mano en Neiva y lo enviamos con todo el cuidado a cualquier ciudad del país."
      />

      <section className="py-12 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Tiempos de entrega"
            icon={<Clock />}
            title={
              <>
                ¿Cuándo llega mi <em>pedido</em>?
              </>
            }
            description="Tiempos estimados después de la elaboración y despacho. Te confirmamos el valor exacto del envío al cotizar."
          />
          <div className="mt-8 sm:mt-12">
            <ShippingZones zones={shipping.zones} />
          </div>
        </Container>
      </section>

      <section className="bg-white/60 py-12 sm:py-24">
        <Container>
          <PaymentAndPackaging info={shipping} />
        </Container>
      </section>

      <section className="py-12 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Paso a paso"
            icon={<ListChecks />}
            title={
              <>
                Cómo hacer tu <em>pedido</em>
              </>
            }
          />
          <div className="mt-10 sm:mt-14">
            <OrderSteps steps={shipping.steps} />
          </div>
        </Container>
      </section>

      <section id="preguntas" className="scroll-mt-24 bg-blush-200/60 py-12 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Preguntas frecuentes"
              icon={<CircleHelp />}
              title={
                <>
                  Resolvemos tus <em>dudas</em>
                </>
              }
              description="¿No encuentras tu respuesta? Escríbenos y te ayudamos con gusto."
            />
            <ExternalButton
              href={whatsappLink("¡Hola Velaire! 🕯️ Tengo una pregunta sobre envíos.")}
              variant="whatsapp"
              className="tap mt-8"
            >
              <WhatsAppIcon className="size-4.5" /> Preguntar por WhatsApp
            </ExternalButton>
          </div>
          <FaqList items={faqs} />
        </Container>
      </section>
    </>
  );
}
