import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { jpegResponse, loadOgFonts, loadPhoto, OG_CONTENT_TYPE, OG_SIZE, toJpeg } from "@/modules/seo/og/og-assets";
import { ogBackground, OgBrand, ogColors, OgPhoto, OgPill, OgSunRays } from "@/modules/seo/og/og-elements";

export const alt = "Velaire · Bouquets de flores en vela y velas artesanales hechas a mano en Neiva, Huila";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return jpegResponse(await renderHomeImage());
}

async function renderHomeImage() {
  "use cache";
  cacheLife("max");

  const [fonts, hero, detail] = await Promise.all([
    loadOgFonts(),
    loadPhoto("/images/products/bouquet-jardin-pastel-1.webp", 372, 470),
    loadPhoto("/images/products/inicial-rosas-chocolates-1.webp", 168, 168),
  ]);

  return toJpeg(
    new ImageResponse(
      <div style={ogBackground}>
        <div style={{ position: "absolute", right: 20, top: 40, display: "flex" }}>
          <OgSunRays width={560} opacity={0.16} />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            padding: "52px 0 50px 64px",
          }}
        >
          <OgBrand scale={0.9} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontFamily: "Cormorant",
                fontSize: 68,
                lineHeight: 1,
                color: ogColors.cacao900,
              }}
            >
              <span>Flores que no se marchitan,</span>
              <div style={{ display: "flex", marginTop: 4 }}>
                <span style={{ fontStyle: "italic", color: ogColors.clay500 }}>luz</span>
                <span style={{ marginLeft: 16 }}>que enamora</span>
              </div>
            </div>
            <span style={{ marginTop: 20, fontSize: 24, lineHeight: 1.4, color: ogColors.cacao700, width: 540 }}>
              Bouquets, ramos y detalles en vela aromatizada, hechos a mano en {siteConfig.contact.city},{" "}
              {siteConfig.contact.region}.
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <OgPill>Envíos a toda Colombia</OgPill>
            <OgPill dark>WhatsApp {siteConfig.contact.phoneDisplay}</OgPill>
          </div>
        </div>

        <OgPhoto
          src={hero}
          width={372}
          height={470}
          radius="186px 186px 30px 30px"
          style={{ position: "absolute", left: 742, top: 64 }}
        />
        <OgPhoto
          src={detail}
          width={168}
          height={168}
          radius={84}
          style={{ position: "absolute", left: 660, top: 390 }}
        />
        <OgPill
          style={{ position: "absolute", left: 930, top: 516, fontSize: 18, padding: "10px 18px", color: ogColors.clay600 }}
        >
          100% hecho a mano
        </OgPill>
      </div>,
      { ...size, fonts },
    ),
  );
}
