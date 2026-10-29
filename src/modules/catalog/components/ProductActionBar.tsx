import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { productInquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { AddToCartButton } from "@/modules/cart/components/AddToCartButton";
import type { Product } from "../domain/catalog.types";

/** Barra de compra fija en móvil (reemplaza la barra de pestañas). */
export function ProductActionBar({ product }: { product: Product }) {
  return (
    <div className="fixed inset-x-3 bottom-0 z-40 mb-safe md:hidden">
      <div className="glass flex items-center gap-2 rounded-[1.6rem] p-2 shadow-float ring-1 ring-white/70">
        <a
          href={whatsappLink(productInquiryMessage(product.name))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Preguntar por WhatsApp"
          className="tap grid size-12 shrink-0 place-items-center rounded-[1.1rem] bg-whatsapp-dark text-white"
        >
          <WhatsAppIcon className="size-5.5" />
        </a>
        <AddToCartButton product={product} size="lg" className="h-12 flex-1 rounded-[1.1rem]" />
      </div>
    </div>
  );
}
