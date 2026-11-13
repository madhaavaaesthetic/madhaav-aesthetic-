import Image from "next/image";
import Link from "next/link";
import type { Treatment } from "@/data/types";
import { categoryName } from "@/data/categories";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "./Icons";

/** Only the fields the card renders, so client components can pass slim objects. */
export type TreatmentCardData = Pick<Treatment, "slug" | "name" | "image" | "imageAlt" | "tagline" | "category">;

export function TreatmentCard({ t, href, index, className, priority }: { t: TreatmentCardData; href?: string; index?: number; className?: string; priority?: boolean }) {
  return (
    <Link
      href={href ?? `/treatments/${t.slug}`}
      data-cursor="Explore"
      className={cn("group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-shell p-3 ring-1 ring-cocoa/8 transition-shadow duration-700 hover:shadow-[0_30px_60px_-30px_rgba(58,29,24,0.45)]", className)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] arch">
        <Image
          src={t.image}
          alt={t.imageAlt}
          fill
          loading={priority ? "eager" : undefined}
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 26vw"
          className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-expo)] group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent" />
        <span className="glass absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">
          {categoryName(t.category)}
        </span>
        {index !== undefined && <span className="absolute bottom-3 left-4 font-hero text-5xl text-shell/90">{String(index + 1).padStart(2, "0")}</span>}
      </div>
      <div className="flex flex-1 flex-col px-2 pt-5 pb-2">
        <h3 className="font-display text-[1.65rem] leading-tight text-cocoa">{t.name}</h3>
        <p className="mt-2 line-clamp-2 text-[0.95rem] text-cocoa/65">{t.tagline}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-vermilion">
          Learn more
          <span className="grid h-8 w-8 place-items-center rounded-full bg-vermilion/10 transition-all duration-500 group-hover:rotate-45 group-hover:bg-vermilion group-hover:text-shell">
            <ArrowUpRight />
          </span>
        </span>
      </div>
    </Link>
  );
}
