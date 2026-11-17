import { ArrowUpRight, CircleHelp, Flame, MapPin, MessageCircleHeart, Phone, Truck, Wallet } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { getCategories } from "@/modules/catalog/catalog.service";
import { CategoryIcon } from "@/modules/catalog/lib/catalog-icons";

const helpLinks = [
  { href: "/envios", label: "Envíos y tiempos", icon: Truck },
  { href: "/envios#pagos", label: "Medios de pago", icon: Wallet },
  { href: "/envios#preguntas", label: "Preguntas frecuentes", icon: CircleHelp },
  { href: "/#cuidados", label: "Cuidado de tus velas", icon: Flame },
  { href: "/contacto", label: "Contacto", icon: MessageCircleHeart },
];

const socialLinks = [
  { label: "Instagram", href: siteConfig.contact.instagramUrl, icon: InstagramIcon, hover: "hover:bg-clay-500" },
  { label: "Facebook", href: siteConfig.contact.facebookUrl, icon: FacebookIcon, hover: "hover:bg-[#1877f2]" },
  { label: "TikTok", href: siteConfig.contact.tiktokUrl, icon: TikTokIcon, hover: "hover:bg-black" },
  { label: "WhatsApp", href: whatsappLink(), icon: WhatsAppIcon, hover: "hover:bg-whatsapp-dark" },
];

const linkClass = "group flex items-center gap-2.5 py-1 text-blush-200/75 transition hover:text-gold-300";
const iconClass = "size-4 shrink-0 text-blush-200/40 transition group-hover:text-gold-400";

export async function Footer() {
  const categories = await getCategories();
  const { contact } = siteConfig;

  return (
    <footer className="grain relative overflow-hidden bg-cacao-950 text-blush-100">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-clay-500/15 blur-3xl"
      />

      <Container className="relative pt-14 pb-10 sm:pt-16">
        {/* Tarjeta de contacto destacada */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-white/[0.04] p-6 ring-1 ring-white/10 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="font-display text-3xl text-white sm:text-4xl">
              ¿Lista para tu <em className="text-gold-300">detalle</em>?
            </p>
            <p className="mt-1.5 text-sm text-blush-200/70">Te respondemos por WhatsApp y te ayudamos a personalizarlo.</p>
          </div>
          <a
            href={whatsappLink("¡Hola Velaire! 🕯️ Quiero hacer un pedido.")}
            target="_blank"
            rel="noopener noreferrer"
            className="tap inline-flex shrink-0 items-center gap-2 rounded-full bg-whatsapp-dark px-6 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px] shadow-whatsapp/60"
          >
            <WhatsAppIcon className="size-5" /> Escribir al {contact.phoneDisplay}
          </a>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <Logo tone="light" className="items-start [&>svg]:self-center" />
            <p className="max-w-xs text-sm leading-relaxed text-blush-200/70">
              Velas artesanales hechas a mano en {contact.city}, {contact.region}. Flores que no se marchitan y
              detalles que iluminan momentos especiales.
            </p>
            <ul className="flex gap-2" aria-label="Redes sociales">
              {socialLinks.map(({ label, href, icon: Icon, hover }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`tap grid size-10 place-items-center rounded-full bg-white/8 ring-1 ring-white/10 ${hover}`}
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Catálogo">
            <h2 className="mb-3 text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">Catálogo</h2>
            <ul className="space-y-1 text-sm">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link href={`/catalogo/${category.slug}`} className={linkClass}>
                    <CategoryIcon slug={category.slug} className={iconClass} strokeWidth={1.7} />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Ayuda">
            <h2 className="mb-3 text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">Ayuda</h2>
            <ul className="space-y-1 text-sm">
              {helpLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    <Icon className={iconClass} strokeWidth={1.7} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-3 text-xs font-medium tracking-[0.2em] text-gold-400 uppercase">Contacto</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Phone className={iconClass} strokeWidth={1.7} /> {contact.phoneDisplay}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <InstagramIcon className={iconClass} /> @{contact.instagramHandle}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <FacebookIcon className={iconClass} /> {contact.facebookName}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href={contact.tiktokUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <TikTokIcon className={iconClass} /> @{contact.tiktokHandle}
                  <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                </a>
              </li>
              <li className="flex items-center gap-2.5 py-1 text-blush-200/75">
                <MapPin className="size-4 shrink-0 text-blush-200/40" strokeWidth={1.7} /> {contact.city},{" "}
                {contact.region}
              </li>
              <li className="flex items-center gap-2.5 py-1 text-blush-200/75">
                <Truck className="size-4 shrink-0 text-blush-200/40" strokeWidth={1.7} /> Envíos a toda Colombia
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <div className="relative border-t border-white/8">
        <Container className="flex flex-col items-center justify-between gap-2 py-6 text-xs text-blush-200/50 sm:flex-row">
          <p>
            © {siteConfig.name} · {siteConfig.tagline}
          </p>
          <p className="flex items-center gap-1.5">
            Hecho a mano con amor en {contact.city}, {contact.region}
            <Flame className="size-3.5 text-gold-400" />
          </p>
        </Container>
      </div>
    </footer>
  );
}
