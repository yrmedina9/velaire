import { HandHeart, MessageCircleHeart, MousePointerClick, PackageCheck, Palette } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Step } from "@/modules/content/content.service";

const stepIcons = [MousePointerClick, Palette, MessageCircleHeart, HandHeart, PackageCheck];

/**
 * Pasos para hacer un pedido: línea de tiempo vertical en móvil y
 * horizontal en escritorio.
 */
export function OrderSteps({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol
      className={cn(
        "relative grid sm:grid-cols-2 sm:gap-8 lg:grid-cols-5 lg:gap-6",
        "lg:before:absolute lg:before:top-7 lg:before:right-[10%] lg:before:left-[10%] lg:before:h-px",
        dark ? "lg:before:bg-white/15" : "lg:before:bg-clay-300/60",
      )}
    >
      {steps.map((step, index) => {
        const Icon = stepIcons[index % stepIcons.length];
        const last = index === steps.length - 1;
        return (
          <li
            key={step.title}
            className="reveal relative flex gap-4 pb-8 last:pb-0 sm:block sm:pb-0 lg:flex lg:flex-col lg:items-center lg:text-center"
          >
            {!last && (
              <span
                aria-hidden="true"
                className={cn("absolute top-16 bottom-2 left-7 w-px sm:hidden", dark ? "bg-white/15" : "bg-clay-300/60")}
              />
            )}
            <span
              className={cn(
                "relative grid size-14 shrink-0 place-items-center rounded-2xl ring-8",
                dark
                  ? "bg-white/8 text-gold-300 ring-cacao-950 backdrop-blur"
                  : "bg-white text-clay-600 shadow-soft ring-blush-50",
              )}
            >
              <Icon className="size-6" strokeWidth={1.6} />
              <span
                className={cn(
                  "absolute -top-1.5 -right-1.5 grid size-6 place-items-center rounded-full text-[0.68rem] font-semibold",
                  dark ? "bg-gold-400 text-cacao-950" : "bg-clay-500 text-white",
                )}
              >
                {index + 1}
              </span>
            </span>
            <div className="pt-1 sm:mt-4 sm:pt-0">
              <h3 className={cn("font-display text-2xl", dark ? "text-white" : "text-cacao-900")}>{step.title}</h3>
              <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-blush-200/80" : "text-cacao-700")}>
                {step.text}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
