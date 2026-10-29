import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Tone = "clay" | "gold" | "soft" | "dark";

const tones: Record<Tone, string> = {
  clay: "bg-clay-500 text-white",
  gold: "bg-gold-300 text-cacao-900",
  soft: "bg-blush-200 text-clay-700",
  dark: "bg-cacao-900/80 text-blush-50 backdrop-blur",
};

export function Badge({ tone = "soft", className, ...props }: ComponentProps<"span"> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.7rem] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
