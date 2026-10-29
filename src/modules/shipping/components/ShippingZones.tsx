import { Clock, MapPin, Wallet } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ShippingZone } from "@/modules/content/content.service";

export function ShippingZones({ zones }: { zones: ShippingZone[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {zones.map((zone, index) => (
        <li
          key={zone.id}
          className={cn(
            "reveal flex flex-col rounded-[2rem] p-7 ring-1",
            index === 0 ? "bg-clay-500 text-white ring-clay-500" : "bg-white/80 ring-blush-200",
          )}
        >
          <span
            className={cn(
              "grid size-12 place-items-center rounded-full",
              index === 0 ? "bg-white/15" : "bg-blush-200 text-clay-600",
            )}
          >
            <MapPin className="size-5.5" strokeWidth={1.6} />
          </span>
          <h3 className="mt-5 font-display text-3xl">{zone.title}</h3>
          <p className={cn("mt-2 text-sm leading-relaxed", index === 0 ? "text-white/85" : "text-cacao-700")}>
            {zone.description}
          </p>
          <dl className={cn("mt-auto space-y-2 pt-6 text-sm", index === 0 ? "text-white" : "text-cacao-900")}>
            <div className="flex items-center gap-2">
              <Clock className="size-4 opacity-70" />
              <dt className="sr-only">Tiempo estimado</dt>
              <dd className="font-medium">{zone.time}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="size-4 opacity-70" />
              <dt className="sr-only">Costo</dt>
              <dd>{zone.cost}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}
