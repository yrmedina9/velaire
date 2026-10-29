import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { CategoryWithCount } from "../domain/catalog.types";

export function CategoryCard({ category, className }: { category: CategoryWithCount; className?: string }) {
  return (
    <Link
      href={`/catalogo/${category.slug}`}
      className={cn(
        "group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-t-[10rem] rounded-b-[2rem] p-6 text-white",
        className,
      )}
    >
      <Image
        src={category.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
        className="-z-10 object-cover transition duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-cacao-950/85 via-cacao-950/25 to-transparent" />
      <p className="text-[0.7rem] tracking-[0.25em] text-gold-300 uppercase">{category.tagline}</p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <h3 className="font-display text-3xl leading-none">{category.shortName}</h3>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition group-hover:bg-white group-hover:text-clay-600">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <p className="mt-2 text-xs text-white/75">{category.productCount} diseños</p>
    </Link>
  );
}
