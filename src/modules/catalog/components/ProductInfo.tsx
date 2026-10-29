import {
  Check,
  ChevronDown,
  Clock,
  Flame,
  Gift,
  HandHeart,
  Info,
  MapPin,
  Palette,
  PenLine,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { productInquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { AddToCartButton } from "@/modules/cart/components/AddToCartButton";
import type { ShippingInfo } from "@/modules/content/content.service";
import type { Category, Occasion, Product } from "../domain/catalog.types";
import { CategoryIcon, OccasionIcon } from "../lib/catalog-icons";
import { swatchFor } from "../lib/color-swatches";
import { ShareButton } from "./ShareButton";

interface ProductInfoProps {
  product: Product;
  category?: Category;
  occasions: Occasion[];
  shipping: ShippingInfo;
}

const highlights = [
  { icon: HandHeart, label: "Hecho a mano" },
  { icon: Flame, label: "Aromatizada" },
  { icon: Gift, label: "Lista para regalar" },
];

export function ProductInfo({ product, category, occasions, shipping }: ProductInfoProps) {
  const productOccasions = occasions.filter((o) => product.occasions.includes(o.slug));

  return (
    <div className="flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {category && (
            <Link
              href={`/catalogo/${category.slug}`}
              className="tap inline-flex items-center gap-1.5 rounded-full bg-clay-500/10 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-clay-600 uppercase"
            >
              <CategoryIcon slug={product.category} className="size-3.5" strokeWidth={2} />
              {category.shortName}
            </Link>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full bg-clay-500 px-2.5 py-1.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase">
              <Sparkles className="size-3" /> Nuevo
            </span>
          )}
          {product.featured && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-300 px-2.5 py-1.5 text-[0.65rem] font-semibold tracking-wide text-cacao-900 uppercase">
              Favorito
            </span>
          )}
        </div>
        <ShareButton title={product.name} text={product.shortDescription} />
      </div>

      <h1 className="mt-4 font-display text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-cacao-700 sm:text-lg">{product.shortDescription}</p>

      <div className="surface mt-6 flex items-center justify-between gap-4 rounded-[1.4rem] p-4">
        <div>
          <p className="flex items-center gap-1.5 text-xs text-cacao-500">
            <Tag className="size-3.5" /> Precio
          </p>
          <p className="font-display text-[1.7rem] leading-tight text-clay-600">
            {product.price === null ? "A cotizar" : formatPrice(product.price)}
          </p>
          {product.price === null && <p className="text-xs text-cacao-500">Según tamaño y personalización</p>}
        </div>
        {product.customizable && (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-blush-100 px-3 py-2 text-xs font-medium text-cacao-700 ring-1 ring-cacao-900/5">
            <Palette className="size-4 text-clay-500" strokeWidth={1.8} /> Personalizable
          </span>
        )}
      </div>

      <ul className="mt-4 grid grid-cols-3 gap-2">
        {highlights.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-blush-200/50 px-2 py-3 text-center text-[0.7rem] leading-tight font-medium text-cacao-700"
          >
            <Icon className="size-5 text-clay-500" strokeWidth={1.6} />
            {label}
          </li>
        ))}
      </ul>

      {product.colors.length > 0 && (
        <div className="mt-6">
          <p className="mb-2.5 text-xs font-medium tracking-[0.16em] text-cacao-500 uppercase">
            {product.customizable ? "Colores de la foto · puedes elegir otros" : "Colores"}
          </p>
          <ul className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <li
                key={color}
                className="inline-flex items-center gap-2 rounded-full bg-white py-1 pr-3.5 pl-1 text-sm shadow-hairline"
              >
                <span className="size-6 rounded-full ring-2 ring-white" style={{ background: swatchFor(color) }} />
                {color}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 hidden gap-3 md:flex">
        <AddToCartButton product={product} size="lg" className="flex-1" />
        <ExternalButton
          href={whatsappLink(productInquiryMessage(product.name))}
          variant="whatsapp"
          size="lg"
          className="tap flex-1"
        >
          <WhatsAppIcon className="size-5" />
          Preguntar
        </ExternalButton>
      </div>

      <div className="surface mt-8 divide-y divide-cacao-900/5 overflow-hidden rounded-[1.4rem]">
        <Disclosure icon={<Info />} title="Descripción" defaultOpen>
          <p className="leading-relaxed">{product.description}</p>
          <ul className="mt-4 space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-clay-500/12 text-clay-600">
                  <Check className="size-3" strokeWidth={2.6} />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Disclosure>
        <Disclosure icon={<PenLine />} title="Personalización">
          <p className="leading-relaxed">
            Cuéntanos al hacer tu pedido los colores, el aroma y el mensaje de la tarjeta. Si es un recordatorio, la
            cantidad y la fecha de tu evento.
          </p>
        </Disclosure>
        <Disclosure icon={<Truck />} title="Envío y entrega">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-clay-500" />
              <span>
                <strong className="font-medium text-cacao-900">Elaboración:</strong> {shipping.production.estimate}
              </span>
            </li>
            {shipping.zones.map((zone) => (
              <li key={zone.id} className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay-500" />
                <span>
                  <strong className="font-medium text-cacao-900">{zone.title}:</strong> {zone.time}
                </span>
              </li>
            ))}
          </ul>
          <Link href="/envios" className="mt-4 inline-flex items-center gap-1 text-clay-600 hover:underline">
            Ver envíos y pagos
          </Link>
        </Disclosure>
      </div>

      {productOccasions.length > 0 && (
        <div className="mt-6">
          <p className="mb-2.5 text-xs font-medium tracking-[0.16em] text-cacao-500 uppercase">Ideal para</p>
          <div className="flex flex-wrap gap-2">
            {productOccasions.map((o) => (
                <Link
                  key={o.slug}
                  href={`/catalogo?ocasion=${o.slug}`}
                  className="tap inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm text-cacao-700 shadow-hairline hover:text-clay-600"
                >
                  <OccasionIcon slug={o.slug} className="size-3.5 text-clay-500" strokeWidth={1.8} />
                  {o.name}
                </Link>
            ))}
          </div>
        </div>
      )}

      <a
        href={product.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex w-fit items-center gap-2 text-sm text-cacao-500 transition hover:text-clay-500"
      >
        <InstagramIcon className="size-4" /> Ver publicación en Instagram
      </a>
    </div>
  );
}

function Disclosure({
  icon,
  title,
  defaultOpen = false,
  children,
}: {
  icon: ReactNode;
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen} className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-3 px-4 py-4 select-none active:bg-blush-100">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-blush-100 text-clay-500 [&>svg]:size-4.5 [&>svg]:stroke-[1.7]">
          {icon}
        </span>
        <span className="flex-1 font-medium">{title}</span>
        <ChevronDown className="size-4.5 text-cacao-500 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-5 pl-16 text-sm text-cacao-700">{children}</div>
    </details>
  );
}
