import { SunRays } from "@/components/brand/SunRays";

const words = [
  "Bouquets de velas",
  "Ramos de flores",
  "Recordatorios",
  "Velas de soya aromatizadas",
  "Detalles personalizados",
  "Envíos nacionales",
];

export function Marquee() {
  const track = [...words, ...words];
  return (
    <div className="overflow-hidden bg-clay-500 py-4 text-blush-50" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {track.map((word, index) => (
          <span key={index} className="flex items-center gap-6 pr-6 font-display text-2xl whitespace-nowrap italic sm:text-3xl">
            {word}
            <SunRays className="w-8 text-gold-300" />
          </span>
        ))}
      </div>
    </div>
  );
}
