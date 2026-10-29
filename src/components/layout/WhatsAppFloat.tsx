import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";

/** Botón flotante de WhatsApp para tablet y escritorio (en móvil está la barra inferior). */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("¡Hola Velaire! 🕯️ Quiero información sobre sus velas.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-6 bottom-6 z-30 hidden items-center gap-2 rounded-full bg-whatsapp-dark p-3.5 text-white shadow-float ring-4 ring-white/60 transition duration-300 hover:-translate-y-0.5 md:flex"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/35 [animation-duration:2.6s]" />
      <WhatsAppIcon className="size-6.5" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-500 ease-(--ease-ios) group-hover:max-w-40 group-hover:pr-1">
        ¿Te ayudamos?
      </span>
    </a>
  );
}
