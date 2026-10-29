import { MapPin, Phone, Truck } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { getCategories } from "@/modules/catalog/catalog.service";

const helpLinks = [
  { href: "/envios", label: "Envíos y tiempos" },
  { href: "/envios#pagos", label: "Medios de pago" },
  { href: "/envios#preguntas", label: "Preguntas frecuentes" },
  { href: "/#cuidados", label: "Cuidado de tus velas" },
  { href: "/contacto", label: "Contacto" },
];

const linkClass = "text-blush-200/80 transition hover:text-gold-300";

export async function Footer() {
  const categories = await getCategories();
  const { contact } = siteConfig;

  return (
    <footer className="relative overflow-hidden bg-cacao-950 text-blush-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-clay-500/15 blur-3xl"
      />
      <Container className="relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div className="space-y-5">
          <Logo tone="light" className="items-start [&>svg]:self-center" />
          <p className="max-w-xs text-sm leading-relaxed text-blush-200/80">
            Velas artesanales hechas a mano en {contact.city}, {contact.region}. Flores que no se marchitan y
            detalles que iluminan momentos especiales.
          </p>
          <div className="flex gap-2">
            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-clay-500"
            >
              <InstagramIcon className="size-4.5" />
            </a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-whatsapp-dark"
            >
              <WhatsAppIcon className="size-4.5" />
            </a>
          </div>
        </div>

        <nav aria-label="Catálogo">
          <h2 className="mb-4 font-display text-xl text-white">Catálogo</h2>
          <ul className="space-y-2.5 text-sm">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={`/catalogo/${category.slug}`} className={linkClass}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Ayuda">
          <h2 className="mb-4 font-display text-xl text-white">Ayuda</h2>
          <ul className="space-y-2.5 text-sm">
            {helpLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-xl text-white">Contacto</h2>
          <ul className="space-y-3 text-sm text-blush-200/80">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-300">
                <Phone className="size-4 text-gold-400" /> {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-300">
                <InstagramIcon className="size-4 text-gold-400" /> @{contact.instagramHandle}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="size-4 text-gold-400" /> {contact.city}, {contact.region}
            </li>
            <li className="flex items-center gap-3">
              <Truck className="size-4 text-gold-400" /> Envíos a toda Colombia
            </li>
          </ul>
        </div>
      </Container>

      <div className="relative border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-blush-200/60 sm:flex-row">
          <p>© {siteConfig.name} · {siteConfig.tagline}</p>
          <p>Hecho a mano con amor en {contact.city}, {contact.region} 🕯️</p>
        </Container>
      </div>
    </footer>
  );
}
