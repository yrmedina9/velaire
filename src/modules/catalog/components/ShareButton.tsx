"use client";

import { Link2, Share2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { toast } from "@/lib/toast-store";

interface ShareButtonProps {
  title: string;
  text: string;
  className?: string;
}

/** Comparte con la hoja nativa del celular o copia el enlace. */
export function ShareButton({ title, text, className }: ShareButtonProps) {
  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // El usuario canceló la hoja de compartir.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Enlace copiado", description: "Pégalo en WhatsApp o tus redes", icon: Link2 });
    } catch {
      toast({ title: "No pudimos copiar el enlace", icon: Link2 });
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Compartir este producto"
      className={cn(
        "tap grid size-10 shrink-0 place-items-center rounded-full bg-white text-cacao-700 shadow-hairline hover:text-clay-600",
        className,
      )}
    >
      <Share2 className="size-4.5" strokeWidth={1.8} />
    </button>
  );
}
