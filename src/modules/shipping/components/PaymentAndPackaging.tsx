import { Check, Gift, Hourglass, Wallet } from "lucide-react";
import type { ShippingInfo } from "@/modules/content/content.service";

export function PaymentAndPackaging({ info }: { info: ShippingInfo }) {
  const cards = [
    {
      id: "elaboracion",
      icon: Hourglass,
      title: info.production.title,
      text: info.production.text,
      list: [`Tiempo estimado: ${info.production.estimate}`],
    },
    { id: "pagos", icon: Wallet, title: "Medios de pago", text: info.payment.text, list: info.payment.methods },
    {
      id: "empaque",
      icon: Gift,
      title: "Empaque de regalo",
      text: "Cada pedido sale listo para entregar, cuidado hasta el último detalle.",
      list: info.packaging,
    },
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {cards.map(({ id, icon: Icon, title, text, list }) => (
        <article id={id} key={id} className="reveal scroll-mt-28 rounded-[2rem] bg-white/80 p-7 ring-1 ring-blush-200">
          <span className="grid size-12 place-items-center rounded-full bg-blush-200 text-clay-600">
            <Icon className="size-5.5" strokeWidth={1.6} />
          </span>
          <h3 className="mt-5 font-display text-3xl">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-cacao-700">{text}</p>
          <ul className="mt-5 space-y-2">
            {list.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-clay-500" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
