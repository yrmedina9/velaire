import { cn } from "@/lib/cn";
import type { Step } from "@/modules/content/content.service";

/** Pasos para hacer un pedido, de la elección a la entrega. */
export function OrderSteps({ steps, tone = "light" }: { steps: Step[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <ol className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-6 right-[10%] left-[10%] hidden h-px lg:block",
          dark ? "bg-white/20" : "bg-clay-300/60",
        )}
      />
      {steps.map((step, index) => (
        <li key={step.title} className="reveal relative flex flex-col items-start lg:items-center lg:text-center">
          <span
            className={cn(
              "relative grid size-12 place-items-center rounded-full font-display text-xl ring-8",
              dark ? "bg-gold-400 text-cacao-950 ring-cacao-950" : "bg-clay-500 text-white ring-blush-50",
            )}
          >
            {index + 1}
          </span>
          <h3 className={cn("mt-4 font-display text-2xl", dark ? "text-white" : "text-cacao-900")}>{step.title}</h3>
          <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-blush-200/80" : "text-cacao-700")}>
            {step.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
