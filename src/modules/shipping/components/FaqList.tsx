import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/modules/content/content.service";

/** Acordeón nativo (<details>), accesible y sin JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-blush-200 rounded-[2rem] bg-white/80 px-6 ring-1 ring-blush-200 sm:px-8">
      {items.map((item) => (
        <details key={item.question} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl text-cacao-900 sm:text-2xl">
            {item.question}
            <ChevronDown className="size-5 shrink-0 text-clay-500 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cacao-700 sm:text-base">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
