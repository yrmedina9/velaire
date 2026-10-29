import { Check, Clock, Palette, Truck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ExternalButton } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { productInquiryMessage, whatsappLink } from "@/lib/whatsapp";
import { AddToCartButton } from "@/modules/cart/components/AddToCartButton";
import type { Category, Occasion, Product } from "../domain/catalog.types";

interface ProductInfoProps {
  product: Product;
  category?: Category;
  occasions: Occasion[];
  productionEstimate: string;
}

export function ProductInfo({ product, category, occasions, productionEstimate }: ProductInfoProps) {
  const productOccasions = occasions.filter((o) => product.occasions.includes(o.slug));

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <Link
            href={`/catalogo/${category.slug}`}
            className="text-xs font-medium tracking-[0.2em] text-clay-500 uppercase hover:underline"
          >
            {category.name}
          </Link>
        )}
        {product.isNew && <Badge tone="clay">Nuevo</Badge>}
        {product.featured && <Badge tone="gold">Favorito</Badge>}
        {product.seasonal && <Badge tone="soft">Temporada</Badge>}
      </div>

      <h1 className="mt-3 font-display text-4xl leading-[1.05] font-medium text-balance sm:text-5xl">{product.name}</h1>
      <p className="mt-3 text-lg text-cacao-700">{product.shortDescription}</p>

      <div className="mt-6 flex items-baseline gap-3 border-y border-blush-200 py-5">
        <p className="font-display text-3xl text-clay-600">{formatPrice(product.price)}</p>
        {product.price === null && (
          <p className="text-sm text-cacao-500">Según tamaño y personalización</p>
        )}
      </div>

      <p className="mt-6 leading-relaxed text-cacao-700">{product.description}</p>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blush-200 text-clay-600">
              <Check className="size-3" strokeWidth={2.5} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {product.colors.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Palette className="size-4 text-clay-500" />
            {product.customizable ? "Colores de la foto (puedes elegir otros)" : "Colores"}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color) => (
              <span key={color} className="rounded-full bg-white px-3 py-1 text-sm ring-1 ring-blush-300">
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <AddToCartButton product={product} size="lg" className="sm:flex-1" />
        <ExternalButton
          href={whatsappLink(productInquiryMessage(product.name))}
          variant="whatsapp"
          size="lg"
          className="sm:flex-1"
        >
          <WhatsAppIcon className="size-5" />
          Preguntar por WhatsApp
        </ExternalButton>
      </div>

      <dl className="mt-8 grid gap-4 rounded-[1.5rem] bg-white/70 p-5 text-sm ring-1 ring-blush-200 sm:grid-cols-2">
        <div className="flex gap-3">
          <Clock className="mt-0.5 size-5 shrink-0 text-clay-500" />
          <div>
            <dt className="font-medium">Hecho a mano para ti</dt>
            <dd className="text-cacao-700">Elaboración de {productionEstimate}.</dd>
          </div>
        </div>
        <div className="flex gap-3">
          <Truck className="mt-0.5 size-5 shrink-0 text-clay-500" />
          <div>
            <dt className="font-medium">Envíos nacionales</dt>
            <dd className="text-cacao-700">
              Desde Neiva a toda Colombia.{" "}
              <Link href="/envios" className="text-clay-600 underline-offset-2 hover:underline">
                Ver tiempos
              </Link>
            </dd>
          </div>
        </div>
      </dl>

      {productOccasions.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium">Ideal para</p>
          <div className="flex flex-wrap gap-2">
            {productOccasions.map((o) => (
              <Link
                key={o.slug}
                href={`/catalogo?ocasion=${o.slug}`}
                className="rounded-full bg-blush-200/70 px-3 py-1 text-sm text-cacao-700 transition hover:bg-blush-300"
              >
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
