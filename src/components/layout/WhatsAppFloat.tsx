import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("¡Hola Velaire! 🕯️ Quiero información sobre sus velas.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="group fixed right-4 bottom-4 z-30 flex items-center gap-2 rounded-full bg-whatsapp-dark p-3.5 text-white shadow-lg shadow-cacao-900/25 transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" />
      <WhatsAppIcon className="size-7" />
      <span className="hidden max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">
        ¿Te ayudamos?
      </span>
    </a>
  );
}
