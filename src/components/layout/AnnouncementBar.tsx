import { MessageCircleHeart, Palette, Truck } from "lucide-react";
import { siteConfig } from "@/config/site";

const messages = [
  { icon: Truck, text: `Envíos nacionales desde ${siteConfig.contact.city} 🇨🇴` },
  { icon: Palette, text: "Personaliza colores, aromas y mensaje" },
  { icon: MessageCircleHeart, text: `Pedidos por WhatsApp al ${siteConfig.contact.phoneDisplay}` },
];

/** Mensajes rotativos (solo CSS); el primero se repite para cerrar el ciclo. */
export function AnnouncementBar() {
  const track = [...messages, messages[0]];
  return (
    <div className="relative h-8 overflow-hidden bg-cacao-950 text-blush-100">
      <ul className="animate-ticker" aria-label="Anuncios">
        {track.map(({ icon: Icon, text }, index) => (
          <li
            key={index}
            aria-hidden={index === track.length - 1 || undefined}
            className="flex h-8 items-center justify-center gap-2 px-4 text-[0.72rem] tracking-wide sm:text-xs"
          >
            <Icon className="size-3.5 shrink-0 text-gold-400" strokeWidth={1.8} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
