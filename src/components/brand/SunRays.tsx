import { cn } from "@/lib/cn";

const RAY_COUNT = 13;
const CENTER = { x: 60, y: 60 };

/** Rayos de sol del logo Velaire: un medio sol con rayos en abanico. */
const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = Math.PI + (i * Math.PI) / (RAY_COUNT - 1);
  const inner = 16;
  const outer = i % 2 === 0 ? 52 : 40;
  const point = (r: number) => ({
    x: +(CENTER.x + r * Math.cos(angle)).toFixed(2),
    y: +(CENTER.y + r * Math.sin(angle)).toFixed(2),
  });
  return { from: point(inner), to: point(outer) };
});

export function SunRays({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 62"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      aria-hidden="true"
      className={cn("overflow-visible", className)}
    >
      <g className={cn("origin-[50%_100%]", animated && "animate-flicker")}>
        {rays.map(({ from, to }, i) => (
          <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} strokeWidth={1.6} />
        ))}
      </g>
      <path d="M49 60a11 11 0 0 1 22 0" strokeWidth={1.8} />
    </svg>
  );
}
