import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { SunRays } from "./SunRays";

interface LogoProps {
  className?: string;
  size?: "sm" | "lg";
  tone?: "clay" | "light";
  showTagline?: boolean;
}

export function Logo({ className, size = "sm", tone = "clay", showTagline = true }: LogoProps) {
  const large = size === "lg";
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, ir al inicio`}
      className={cn(
        "group inline-flex flex-col items-center leading-none",
        tone === "clay" ? "text-clay-500" : "text-blush-100",
        className,
      )}
    >
      <SunRays
        className={cn(
          "transition-transform duration-500 group-hover:-translate-y-0.5",
          large ? "-mb-3 w-24" : "-mb-1.5 w-10",
        )}
      />
      <span className={cn("font-brand tracking-wide", large ? "text-6xl" : "text-[1.7rem]")}>
        {siteConfig.name}
      </span>
      {showTagline && (
        <span
          className={cn(
            "font-sans font-light lowercase tracking-[0.2em] opacity-80",
            large ? "mt-2 text-sm" : "mt-0.5 text-[0.55rem]",
          )}
        >
          {siteConfig.tagline}
        </span>
      )}
    </Link>
  );
}
