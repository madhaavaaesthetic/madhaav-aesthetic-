import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ContourBackdrop } from "@/components/brand/ContourBackdrop";
import { Magnetic } from "@/components/motion/Magnetic";
import { ArrowRight, Stars, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  waMessage,
  aside,
  children,
  bookHref = "/contact",
}: {
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  image?: string;
  imageAlt?: string;
  waMessage?: string;
  bookHref?: string;
  aside?: ReactNode;
  children?: ReactNode;
}) {
  // Long names (e.g. "Pigmentation & Melasma Treatment") get a smaller headline so the whole hero fits the first screen;
  // sizes are also capped by viewport height for short laptop screens.
  const len = title.length;
  const titleSize =
    len <= 16
      ? "text-[clamp(2.6rem,min(6.4vw,10.5svh),6.2rem)]"
      : len <= 30
        ? "text-[clamp(2.4rem,min(5vw,8.2svh),4.9rem)]"
        : "text-[clamp(2.2rem,min(4.2vw,7.2svh),4.1rem)]";
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+1.25rem)] pb-10 md:pb-12">
      <ContourBackdrop intensity="soft" />
      <div className="wrap relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 grid items-end gap-10 lg:mt-8 lg:grid-cols-12 lg:gap-12">
          <div className={image || aside ? "lg:col-span-7" : "lg:col-span-10"}>
            {eyebrow && (
              <Reveal y={14}>
                <p className="eyebrow flex items-center gap-3 text-vermilion">
                  <span className="h-px w-8 bg-current" /> {eyebrow}
                </p>
              </Reveal>
            )}
            <SplitReveal as="h1" immediate delay={0.15} className={`mt-4 font-display ${titleSize} leading-[0.98] text-balance text-cocoa`}>
              {title}
            </SplitReveal>
            {lead && (
              <Reveal delay={0.3}>
                <div className="mt-5 max-w-2xl text-lead text-cocoa/75 lg:mt-6">{lead}</div>
              </Reveal>
            )}
            <Reveal delay={0.4} className="mt-7 flex flex-wrap gap-3 lg:mt-8">
              <Magnetic>
                <Link href={bookHref} className="btn btn-primary" data-cursor="Book">
                  Book appointment <ArrowRight />
                </Link>
              </Magnetic>
              <a href={whatsappLink(waMessage ?? "Hi Madhaav Aesthetic, I'd like to know more.")} target="_blank" rel="noopener" className="btn btn-ghost text-cocoa">
                <WhatsApp className="text-[#25D366]" /> WhatsApp
              </a>
            </Reveal>
            {children}
          </div>
          {/* Not wrapped in Reveal: this photo is the page's LCP, so it must paint with the HTML (CSS-only, transform-only entrance). */}
          {image && (
            <div className="hero-rise lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[999px_999px_1.75rem_1.75rem] bg-blush lg:h-[min(34rem,calc(100svh-var(--header-h)-8.5rem))] lg:w-auto lg:max-w-none">
                <Image src={image} alt={imageAlt ?? ""} fill loading="eager" fetchPriority="high" sizes="(max-width:1024px) 90vw, 36vw" className="object-cover" />
                <div className="glass absolute right-4 bottom-4 left-4 flex items-center justify-between gap-3 rounded-2xl px-4 py-3">
                  <span className="flex items-center gap-1 text-ember">
                    <Stars className="text-xs" />
                    <span className="ml-1.5 font-semibold text-cocoa">{site.rating.value}</span>
                  </span>
                  <span className="text-xs font-medium text-cocoa/75">{site.rating.count}+ Google reviews · 0% EMI</span>
                </div>
              </div>
            </div>
          )}
          {!image && aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
