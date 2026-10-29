import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getCategories, getCategoryBySlug, getProducts } from "@/modules/catalog/catalog.service";
import type { CategorySlug } from "@/modules/catalog/domain/catalog.types";
import { jpegResponse, loadOgFonts, loadPhoto, OG_CONTENT_TYPE, OG_SIZE, toJpeg } from "@/modules/seo/og/og-assets";
import { ogBackground, OgBrand, ogColors, OgPhoto, OgPill, OgSunRays } from "@/modules/seo/og/og-elements";

export const alt = "Colección de Velaire, velas artesanales";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ categoria: category.slug }));
}

export default async function Image({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const category = await getCategoryBySlug(categoria);
  if (!category) notFound();
  return jpegResponse(await renderCategoryImage(categoria));
}

async function renderCategoryImage(slug: string) {
  "use cache";
  cacheLife("max");

  const category = await getCategoryBySlug(slug);
  if (!category) throw new Error(`Categoría no encontrada: ${slug}`);

  const products = await getProducts({ category: category.slug as CategorySlug });
  const covers = products.slice(0, 3).map((p) => p.images[0].src);
  while (covers.length < 3) covers.push(category.image);

  const [fonts, side1, main, side2] = await Promise.all([
    loadOgFonts(),
    loadPhoto(covers[1], 230, 290),
    loadPhoto(covers[0], 290, 370),
    loadPhoto(covers[2], 230, 290),
  ]);

  return toJpeg(
    new ImageResponse(
      <div style={ogBackground}>
        <div style={{ position: "absolute", right: 40, top: 30, display: "flex" }}>
          <OgSunRays width={540} opacity={0.16} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 600,
            padding: "52px 0 50px 64px",
          }}
        >
          <OgBrand scale={0.8} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 18, letterSpacing: 5, color: ogColors.clay500 }}>
              {category.tagline.toUpperCase()}
            </span>
            <span
              style={{ marginTop: 12, fontFamily: "Cormorant", fontSize: 76, lineHeight: 1, color: ogColors.cacao900 }}
            >
              {category.name}
            </span>
            <span style={{ marginTop: 18, fontSize: 24, lineHeight: 1.4, color: ogColors.cacao700, width: 500 }}>
              {category.description}
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <OgPill>{category.productCount} diseños</OgPill>
            <OgPill dark>WhatsApp {siteConfig.contact.phoneDisplay}</OgPill>
          </div>
        </div>

        <OgPhoto
          src={side1}
          width={230}
          height={290}
          radius={28}
          style={{ position: "absolute", left: 650, top: 190, transform: "rotate(-7deg)" }}
        />
        <OgPhoto
          src={side2}
          width={230}
          height={290}
          radius={28}
          style={{ position: "absolute", left: 930, top: 190, transform: "rotate(7deg)" }}
        />
        <OgPhoto
          src={main}
          width={290}
          height={370}
          radius="145px 145px 28px 28px"
          style={{ position: "absolute", left: 762, top: 120 }}
        />
      </div>,
      { ...size, fonts },
    ),
  );
}
