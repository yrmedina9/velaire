import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getCategoryBySlug, getProductBySlug, getProducts } from "@/modules/catalog/catalog.service";
import { swatchFor } from "@/modules/catalog/lib/color-swatches";
import { jpegResponse, loadOgFonts, loadPhoto, OG_CONTENT_TYPE, OG_SIZE, toJpeg } from "@/modules/seo/og/og-assets";
import { ogBackground, OgBrand, ogColors, OgPhoto, OgPill, OgSunRays } from "@/modules/seo/og/og-elements";

export const alt = "Producto de Velaire, velas artesanales";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

const truncate = (text: string, max: number) => (text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text);

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return jpegResponse(await renderProductImage(slug));
}

async function renderProductImage(slug: string) {
  "use cache";
  cacheLife("max");

  const product = await getProductBySlug(slug);
  if (!product) throw new Error(`Producto no encontrado: ${slug}`);

  const [fonts, photo, category] = await Promise.all([
    loadOgFonts(),
    loadPhoto(product.images[0].src, 430, 534),
    getCategoryBySlug(product.category),
  ]);
  const nameSize = product.name.length > 26 ? 58 : 70;

  return toJpeg(
    new ImageResponse(
      <div style={ogBackground}>
        <div style={{ position: "absolute", right: -60, top: -20, display: "flex" }}>
          <OgSunRays width={460} opacity={0.12} />
        </div>

        <OgPhoto
          src={photo}
          width={430}
          height={534}
          radius="215px 215px 30px 30px"
          style={{ position: "absolute", left: 52, top: 40 }}
        />

        <div
          style={{
            position: "absolute",
            left: 560,
            top: 0,
            width: 580,
            height: 630,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 0 48px 0",
          }}
        >
          <OgBrand scale={0.62} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {category && (
              <div style={{ display: "flex" }}>
                <OgPill
                  style={{ fontSize: 16, letterSpacing: 3, padding: "8px 16px", color: ogColors.clay600 }}
                >
                  {category.name.toUpperCase()}
                </OgPill>
              </div>
            )}
            <span
              style={{
                marginTop: 18,
                fontFamily: "Cormorant",
                fontSize: nameSize,
                lineHeight: 1,
                color: ogColors.cacao900,
              }}
            >
              {product.name}
            </span>
            <span style={{ marginTop: 16, fontSize: 24, lineHeight: 1.4, color: ogColors.cacao700 }}>
              {truncate(product.shortDescription, 110)}
            </span>
            {product.colors.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", marginTop: 20, gap: 8 }}>
                {product.colors.slice(0, 5).map((color) => (
                  <div
                    key={color}
                    style={{
                      display: "flex",
                      width: 28,
                      height: 28,
                      borderRadius: 999,
                      background: swatchFor(color),
                      border: `3px solid ${ogColors.blush50}`,
                      boxShadow: "0 2px 6px rgba(58,38,33,0.2)",
                    }}
                  />
                ))}
                {product.customizable && (
                  <span style={{ marginLeft: 8, fontSize: 19, color: ogColors.cacao500 }}>Colores personalizables</span>
                )}
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <OgPill dark>Pídelo al {siteConfig.contact.phoneDisplay}</OgPill>
            <OgPill>Envíos a toda Colombia</OgPill>
          </div>
        </div>
      </div>,
      { ...size, fonts },
    ),
  );
}
