import { MessageCircleHeart, Send } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { siteConfig } from "@/config/site";
import { getOccasions } from "@/modules/catalog/catalog.service";
import { ContactChannels } from "@/modules/contact/components/ContactChannels";
import { ContactForm } from "@/modules/contact/components/ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Escríbenos por WhatsApp al ${siteConfig.contact.phoneDisplay} o en Instagram @${siteConfig.contact.instagramHandle}. Pedidos personalizados y envíos a toda Colombia.`,
};

export default async function ContactPage() {
  const occasions = await getOccasions();

  return (
    <>
      <PageHeader
        icon={<MessageCircleHeart />}
        breadcrumbs={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
        title={
          <>
            Hablemos de tu <em>detalle</em>
          </>
        }
        description="Cuéntanos qué quieres regalar o celebrar y te ayudamos a crear algo único con tus colores, aromas y mensaje."
      />

      <section className="py-10 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-8">
            <ContactChannels />
            <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[2rem] sm:block">
              <Image
                src="/images/products/peonia-en-caja-1.webp"
                alt="Peonía en vela dentro de una caja de regalo con lazo dorado"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="flex items-center gap-3 font-display text-4xl">
              <span className="grid size-11 place-items-center rounded-2xl bg-clay-500 text-white shadow-glow">
                <Send className="size-5" strokeWidth={1.8} />
              </span>
              Escríbenos
            </h2>
            <p className="mt-2 mb-6 text-cacao-700">
              Completa el formulario y lo enviamos directo a nuestro WhatsApp.
            </p>
            <ContactForm occasions={occasions} />
          </div>
        </Container>
      </section>
    </>
  );
}
