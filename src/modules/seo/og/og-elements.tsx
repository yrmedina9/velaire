import type { CSSProperties, ReactNode } from "react";

/**
 * Piezas visuales compartidas por las imágenes Open Graph.
 * Satori solo entiende estilos en línea y flexbox: todo div con más
 * de un hijo debe declarar `display: "flex"`.
 */
export const ogColors = {
  blush50: "#fcf8f7",
  blush100: "#f7efed",
  blush200: "#ece1df",
  blush300: "#e0cbc6",
  clay500: "#a36453",
  clay600: "#8b5244",
  cacao950: "#2a1b17",
  cacao900: "#3a2621",
  cacao700: "#5c463f",
  cacao500: "#85716a",
  gold300: "#ecd3a8",
  gold400: "#d9b072",
  whatsapp: "#128c4b",
};

export const ogBackground: CSSProperties = {
  display: "flex",
  width: "100%",
  height: "100%",
  position: "relative",
  backgroundColor: ogColors.blush200,
  backgroundImage: `radial-gradient(circle at 85% 15%, ${ogColors.blush50} 0%, rgba(252,248,247,0) 45%), linear-gradient(135deg, ${ogColors.blush100} 0%, ${ogColors.blush200} 55%, #e4d0ca 100%)`,
  fontFamily: "Jost",
  color: ogColors.cacao900,
};

/** Rayos de sol del logo como SVG. */
export function OgSunRays({ width, color = ogColors.clay500, opacity = 1 }: { width: number; color?: string; opacity?: number }) {
  const rays = Array.from({ length: 13 }, (_, i) => {
    const angle = Math.PI + (i * Math.PI) / 12;
    const outer = i % 2 === 0 ? 52 : 40;
    const p = (r: number) => [+(60 + r * Math.cos(angle)).toFixed(2), +(60 + r * Math.sin(angle)).toFixed(2)];
    const [x1, y1] = p(16);
    const [x2, y2] = p(outer);
    return { x1, y1, x2, y2 };
  });
  return (
    <svg width={width} height={(width * 62) / 120} viewBox="0 0 120 62" style={{ opacity }}>
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      ))}
      <path d="M49 60a11 11 0 0 1 22 0" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Logo Velaire: rayos + nombre + "velas artesanales". */
export function OgBrand({ scale = 1, align = "flex-start" }: { scale?: number; align?: "flex-start" | "center" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <OgSunRays width={70 * scale} />
        <span
          style={{
            fontFamily: "Marcellus",
            fontSize: 46 * scale,
            lineHeight: 1,
            color: ogColors.clay500,
            marginTop: -6 * scale,
          }}
        >
          Velaire
        </span>
        <span
          style={{
            fontSize: 12 * scale,
            letterSpacing: 4 * scale,
            color: ogColors.clay500,
            marginTop: 6 * scale,
            opacity: 0.85,
          }}
        >
          VELAS ARTESANALES
        </span>
      </div>
    </div>
  );
}

export function OgPill({
  children,
  dark = false,
  style,
}: {
  children: ReactNode;
  dark?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 20px",
        borderRadius: 999,
        fontSize: 20,
        fontWeight: 500,
        whiteSpace: "nowrap",
        backgroundColor: dark ? ogColors.cacao900 : "rgba(255,255,255,0.85)",
        color: dark ? ogColors.blush50 : ogColors.cacao700,
        boxShadow: dark ? "none" : "0 0 0 1px rgba(58,38,33,0.06), 0 6px 16px -8px rgba(58,38,33,0.25)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Foto con marco blanco y sombra suave. */
export function OgPhoto({
  src,
  width,
  height,
  radius,
  style,
}: {
  src: string;
  width: number;
  height: number;
  radius: string | number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        display: "flex",
        padding: 8,
        backgroundColor: ogColors.blush50,
        borderRadius: typeof radius === "number" ? radius + 8 : radius,
        boxShadow: "0 24px 48px -20px rgba(58,38,33,0.45), 0 4px 12px -4px rgba(58,38,33,0.15)",
        ...style,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori solo admite <img> */}
      <img src={src} width={width} height={height} alt="" style={{ borderRadius: radius, objectFit: "cover" }} />
    </div>
  );
}
