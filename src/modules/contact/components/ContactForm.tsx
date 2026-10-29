"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { whatsappLink } from "@/lib/whatsapp";

const fieldClass =
  "mt-1.5 w-full rounded-2xl border border-blush-300 bg-white px-4 py-3 text-sm text-cacao-900 placeholder:text-cacao-500/70 focus:border-clay-400 focus:ring-2 focus:ring-clay-300/40 focus:outline-none";

/**
 * Mientras no exista backend, el formulario arma un mensaje y lo
 * abre en WhatsApp. Al conectar la API basta con reemplazar
 * `handleSubmit` por la llamada al endpoint.
 */
export function ContactForm({ occasions }: { occasions: { slug: string; name: string }[] }) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const message = [
      "¡Hola Velaire! 🕯️",
      `Soy ${get("name")}${get("city") ? ` de ${get("city")}` : ""}.`,
      get("occasion") ? `Ocasión: ${get("occasion")}` : "",
      get("date") ? `Fecha en que lo necesito: ${get("date")}` : "",
      "",
      get("message"),
    ]
      .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
      .join("\n");

    window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-[2rem] bg-white/80 p-6 ring-1 ring-blush-200 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Nombre
          <input name="name" required autoComplete="name" placeholder="¿Cómo te llamas?" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium">
          Ciudad
          <input name="city" autoComplete="address-level2" placeholder="Ej: Neiva" className={fieldClass} />
        </label>
        <label className="block text-sm font-medium">
          Ocasión
          <select name="occasion" defaultValue="" className={fieldClass}>
            <option value="">Selecciona una opción</option>
            {occasions.map((o) => (
              <option key={o.slug} value={o.name}>
                {o.name}
              </option>
            ))}
            <option value="Otra">Otra</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          ¿Para cuándo lo necesitas?
          <input name="date" type="date" className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium">
        Cuéntanos tu idea
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Colores, aromas, cantidad de recordatorios, mensaje para la tarjeta…"
          className={`${fieldClass} resize-none`}
        />
      </label>
      <button type="submit" className={buttonStyles({ variant: "whatsapp", size: "lg", className: "w-full" })}>
        <Send className="size-4.5" /> Enviar por WhatsApp
      </button>
      {sent && (
        <p role="status" className="text-center text-sm text-clay-600">
          ¡Listo! Abrimos WhatsApp con tu mensaje. Solo tienes que enviarlo 💌
        </p>
      )}
    </form>
  );
}
