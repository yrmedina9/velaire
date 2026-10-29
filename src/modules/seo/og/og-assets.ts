import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ImageResponse } from "next/og";
import sharp from "sharp";

/** Tamaño recomendado para vistas previas en WhatsApp, Facebook y X. */
export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/jpeg";

const fontsDir = join(process.cwd(), "src/assets/fonts");
const publicDir = join(process.cwd(), "public");

async function font(file: string) {
  const data = await readFile(join(fontsDir, file));
  return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
}

/** Fuentes de la marca para `ImageResponse` (Satori necesita TTF). */
export async function loadOgFonts() {
  const [marcellus, cormorant, cormorantItalic, jost, jostMedium] = await Promise.all([
    font("Marcellus-Regular.ttf"),
    font("CormorantGaramond-Medium.ttf"),
    font("CormorantGaramond-MediumItalic.ttf"),
    font("Jost-Regular.ttf"),
    font("Jost-Medium.ttf"),
  ]);
  return [
    { name: "Marcellus", data: marcellus, weight: 400 as const, style: "normal" as const },
    { name: "Cormorant", data: cormorant, weight: 500 as const, style: "normal" as const },
    { name: "Cormorant", data: cormorantItalic, weight: 500 as const, style: "italic" as const },
    { name: "Jost", data: jost, weight: 400 as const, style: "normal" as const },
    { name: "Jost", data: jostMedium, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * Recorta una foto del catálogo al tamaño exacto y la devuelve como
 * JPEG en data URI (Satori no decodifica WebP).
 */
export async function loadPhoto(src: string, width: number, height: number) {
  const buffer = await sharp(join(publicDir, src))
    .resize(width, height, { fit: "cover", position: "attention" })
    .jpeg({ quality: 86 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Convierte el PNG de `ImageResponse` a JPEG: pesa varias veces menos,
 * algo clave para que WhatsApp muestre la vista previa. Devuelve bytes
 * para poder guardarse con `'use cache'` y prerenderizarse en el build.
 */
export async function toJpeg(image: ImageResponse) {
  const png = Buffer.from(await image.arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
  return new Uint8Array(jpeg);
}

export function jpegResponse(bytes: Uint8Array) {
  return new Response(bytes as Uint8Array<ArrayBuffer>, { headers: { "Content-Type": OG_CONTENT_TYPE } });
}
