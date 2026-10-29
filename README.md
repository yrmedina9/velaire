# Velaire · Velas artesanales

Sitio web de **Velaire** (Neiva, Huila): bouquets y ramos de flores en vela, cajitas de regalo,
recordatorios y colección de Navidad. Catálogo con pedido por WhatsApp y envíos a toda Colombia.

- **Stack:** Next.js 16.4 (App Router, Cache Components, Turbopack) · React 19 · Tailwind CSS 4 · TypeScript
- **Iconos:** lucide-react · **Fuentes:** Marcellus (logo), Cormorant Garamond (títulos), Jost (texto)
- **Datos:** JSON local en `src/data` mientras se construye el backend

## Cómo correrlo

Requiere Node 20.9 o superior (el proyecto incluye `.nvmrc` con Node 22).

```bash
nvm use
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción (genera las 56 páginas estáticas)
npm run lint
```

Copia `.env.example` a `.env.local` y define `NEXT_PUBLIC_SITE_URL` con el dominio final
(se usa en metadatos, Open Graph y `sitemap.xml`).

## Arquitectura

Organizada por capas y por módulos de negocio. Las páginas (`app/`) solo componen; la lógica vive
en `modules/` y el acceso a datos queda detrás de un repositorio intercambiable.

```
src/
├── app/                      # Capa de rutas (App Router): páginas delgadas que componen módulos
│   ├── page.tsx              # Inicio
│   ├── catalogo/             # /catalogo y /catalogo/[categoria]
│   ├── producto/[slug]/      # Ficha de producto
│   ├── envios/  contacto/    # Envíos y pagos · Contacto
│   └── sitemap.ts robots.ts icon.svg not-found.tsx
├── config/                   # Datos de marca, contacto y navegación (site.ts, navigation.ts)
├── data/                     # Fuente de datos temporal (JSON)
│   ├── catalog/              # products.json, categories.json, occasions.json
│   └── content/              # shipping.json, faq.json, care.json
├── lib/                      # Utilidades puras (cn, formatPrice, enlaces de WhatsApp)
├── components/               # UI compartida sin lógica de negocio
│   ├── brand/                # Logo y motivo de rayos de sol
│   ├── layout/               # Header, Footer, barra de anuncio, botón flotante de WhatsApp
│   ├── ui/                   # Button, Badge, Container, SectionHeading, PageHeader, Breadcrumbs
│   └── seo/                  # JSON-LD
└── modules/                  # Módulos de negocio
    ├── catalog/              # domain/ (tipos) · repository/ (datos) · catalog.service.ts · components/
    ├── cart/                 # Pedido: store en localStorage, contexto, cajón y mensaje de WhatsApp
    ├── content/              # Servicio de contenido informativo (envíos, FAQ, cuidados)
    ├── shipping/             # Componentes de envíos, pasos del pedido y preguntas frecuentes
    ├── contact/              # Canales y formulario de contacto
    └── home/                 # Secciones de la página de inicio
```

**Flujo de datos:** `página → service → repository → JSON`.

### Conectar el backend

1. Crea `modules/catalog/repository/api-catalog.repository.ts` que implemente `CatalogRepository`
   (por ejemplo con `fetch` a la API y la directiva `"use cache"`).
2. Cambia la constante `repository` en `modules/catalog/catalog.service.ts`.
3. Haz lo mismo con `modules/content/content.service.ts`.

Las páginas y componentes no necesitan cambios.

## Catálogo

`src/data/catalog/products.json` contiene 40 productos tomados de las publicaciones de
[@velaire.velas_](https://www.instagram.com/velaire.velas_/), con sus fotos optimizadas en WebP
en `public/images/products/`. Campos principales:

| Campo | Descripción |
| --- | --- |
| `slug`, `name`, `category` | Identificador para la URL, nombre y categoría (`bouquets`, `detalles`, `recordatorios`, `navidad`, `decorativas`) |
| `price` | Precio en COP. `null` muestra "Precio a consultar" |
| `images` | `src`, `alt`, `width`, `height` de cada foto |
| `occasions` | Slugs de `occasions.json` para el filtro por ocasión |
| `featured`, `isNew`, `seasonal` | Etiquetas Favorito, Nuevo y Temporada |
| `instagramUrl` | Publicación original en Instagram |

## Pedidos

El carrito ("Mi pedido") se guarda en el navegador y arma un mensaje con los productos, la ciudad
y la personalización para enviarlo por WhatsApp al 312 726 9317. Si se agregan precios, el mensaje
incluye el subtotal automáticamente.

## Pendiente de confirmar con Velaire

- **Precios** de cada producto (hoy todos en `null`).
- **Tiempos y costos de envío** y **tiempo de elaboración** (`src/data/content/shipping.json`): son estimados de referencia.
- **Medios de pago** aceptados (`shipping.json → payment`).
- **Dominio** final para `NEXT_PUBLIC_SITE_URL`.
