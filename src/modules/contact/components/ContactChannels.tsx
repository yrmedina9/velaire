import { MapPin, Truck } from "lucide-react";
import type { ReactNode } from "react";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

interface Channel {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  href?: string;
}

export function ContactChannels() {
  const { contact } = siteConfig;
  const channels: Channel[] = [
    {
      icon: <WhatsAppIcon className="size-5.5" />,
      label: "WhatsApp y llamadas",
      value: contact.phoneDisplay,
      detail: "Pedidos, cotizaciones y diseños personalizados",
      href: whatsappLink("¡Hola Velaire! 🕯️"),
    },
    {
      icon: <InstagramIcon className="size-5.5" />,
      label: "Instagram",
      value: `@${contact.instagramHandle}`,
      detail: "Mira nuestras últimas creaciones",
      href: contact.instagramUrl,
    },
    {
      icon: <FacebookIcon className="size-5.5" />,
      label: "Facebook",
      value: contact.facebookName,
      detail: "Síguenos y comparte tus favoritos",
      href: contact.facebookUrl,
    },
    {
      icon: <TikTokIcon className="size-5" />,
      label: "TikTok",
      value: `@${contact.tiktokHandle}`,
      detail: "Videos de cómo hacemos tus velas",
      href: contact.tiktokUrl,
    },
    {
      icon: <MapPin className="size-5.5" strokeWidth={1.6} />,
      label: "Ubicación",
      value: `${contact.city}, ${contact.region}`,
      detail: "Taller de velas artesanales",
    },
    {
      icon: <Truck className="size-5.5" strokeWidth={1.6} />,
      label: "Cobertura",
      value: "Envíos nacionales",
      detail: "Llegamos a toda Colombia 🇨🇴",
    },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {channels.map((channel) => {
        const content = (
          <>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-blush-200 text-clay-600 transition group-hover:bg-clay-500 group-hover:text-white">
              {channel.icon}
            </span>
            <span>
              <span className="block text-xs tracking-[0.18em] text-cacao-500 uppercase">{channel.label}</span>
              <span className="mt-1 block font-display text-2xl text-cacao-900">{channel.value}</span>
              <span className="mt-0.5 block text-sm text-cacao-700">{channel.detail}</span>
            </span>
          </>
        );
        const className = "group flex h-full items-start gap-4 rounded-[1.75rem] bg-white/80 p-6 ring-1 ring-blush-200";
        return (
          <li key={channel.label}>
            {channel.href ? (
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${className} transition hover:-translate-y-0.5 hover:ring-clay-300`}
              >
                {content}
              </a>
            ) : (
              <div className={className}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
