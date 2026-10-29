import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-clay-500 text-white shadow-[0_10px_30px_-12px] shadow-clay-500/60 hover:bg-clay-600 hover:shadow-clay-600/60",
  secondary: "border border-clay-500/40 bg-white/70 text-clay-600 hover:border-clay-500 hover:bg-white",
  ghost: "text-clay-600 hover:bg-blush-200/70",
  whatsapp:
    "bg-whatsapp-dark text-white shadow-[0_10px_30px_-12px] shadow-whatsapp/60 hover:bg-[#0f7a41]",
  light: "bg-blush-50 text-clay-600 hover:bg-white",
  outlineLight: "border border-white/30 text-blush-100 hover:border-white/60 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-6 text-[0.95rem] gap-2",
  lg: "h-13 px-8 text-base gap-2.5",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex shrink-0 items-center justify-center rounded-full font-medium tracking-wide transition-all duration-300",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-500",
    "active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type StyleProps = { variant?: Variant; size?: Size };

export function Button({ variant, size, className, ...props }: ComponentProps<"button"> & StyleProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}

/** Enlace a un sitio externo (WhatsApp, Instagram) con estilo de botón. */
export function ExternalButton({ variant, size, className, ...props }: ComponentProps<"a"> & StyleProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({ variant, size, className })}
      {...props}
    />
  );
}
