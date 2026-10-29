import { Truck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";

export function AnnouncementBar() {
  return (
    <div className="bg-clay-600 text-blush-50">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs tracking-wide sm:text-[0.8rem]">
        <Truck className="size-3.5 shrink-0" aria-hidden="true" />
        <span>
          Envíos nacionales desde {siteConfig.contact.city} 🇨🇴
          <span className="hidden sm:inline">
            {" "}
            · Pedidos personalizados al{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
              {siteConfig.contact.phoneDisplay}
            </a>
          </span>
        </span>
      </p>
    </div>
  );
}
