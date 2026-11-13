"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ContourBackdrop } from "@/components/brand/ContourBackdrop";
import { ArrowUpRight, Scalpel, Scope, Stars, WhatsApp } from "@/components/ui/Icons";
import type { ReactNode } from "react";
import { site, whatsappLink } from "@/lib/site";

/** Calm, typographic hero: a full-screen contour wash with one statement, one line of copy and one clear action. */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const split = SplitText.create(q("[data-hero-line]"), { type: "words,chars", aria: "none", wordsClass: "inline-block whitespace-nowrap", charsClass: "inline-block will-change-transform" });
      split.chars.forEach((c) => c.parentElement?.closest(".text-grad") && c.classList.add("text-grad"));

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.fromTo(q("[data-hero-bg]"), { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 2.2, ease: "power2.out" }, 0)
        .fromTo(q("[data-hero-photo]"), { autoAlpha: 0, scale: 1.06, yPercent: 3 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: 2, ease: "power3.out" }, 0.05)
        .from(split.chars, { yPercent: 110, autoAlpha: 0, duration: 1, stagger: 0.018 }, 0.15)
        .from(q("[data-hero-fade]"), { y: 22, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55)
        .from(q("[data-hero-card]"), { y: 24, autoAlpha: 0, scale: 0.92, duration: 1.1, stagger: 0.14 }, 0.9);

      const play = () => tl.play();
      if (document.documentElement.dataset.loaded) play();
      else window.addEventListener("madhaav:loaded", play, { once: true });

      // Gentle depth as the page scrolls away (works with native touch scrolling too).
      gsap.to(q("[data-hero-content]"), { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-bg]"), { scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-photo-inner]"), { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      return () => {
        window.removeEventListener("madhaav:loaded", play);
        split.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative h-[100svh] min-h-[620px] overflow-hidden">
      <div data-hero-bg className="absolute inset-0">
        <ContourBackdrop />
      </div>

      {/* The photograph floats behind the headline: radial edges melt into the wash and its whites take on the warm tone. */}
      <div data-hero-photo className="pointer-events-none absolute top-[max(4.5rem,4svh)] left-0 right-0 mx-auto aspect-square w-[min(122vw,68svh)] md:w-[min(72vw,76svh)]">
        <div
          data-hero-photo-inner
          className="relative h-full w-full mix-blend-multiply"
          style={{
            maskImage: "radial-gradient(closest-side at 50% 48%, #000 42%, rgba(0,0,0,0.5) 66%, transparent 88%)",
            WebkitMaskImage: "radial-gradient(closest-side at 50% 48%, #000 42%, rgba(0,0,0,0.5) 66%, transparent 88%)",
          }}
        >
          <Image
            src="/images/brand-scalp-massage-therapy.jpg"
            alt="Patient relaxing during a scalp treatment for hair fall at Madhaav Aesthetic"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover object-[48%_42%]"
          />
        </div>
      </div>

      {/* Small glass cards around the photo: rating and expertise at a glance. Desktop: three, beside the photo; phones: two, inside the screen. */}
      <div aria-hidden className="pointer-events-none absolute top-[max(4.5rem,4svh)] right-0 left-0 z-10 mx-auto hidden aspect-square w-[min(72vw,76svh)] md:block">
        <HeroCard className="top-[20%] -left-[14%]" delay="0s" icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-bold text-[#4285F4] shadow-sm">G</span>} title={<><span className="font-semibold">{site.rating.value}</span> <Stars className="ml-1 text-[0.62rem] text-ember" /></>} sub={`${site.rating.count}+ Google reviews`} />
        <HeroCard className="top-[38%] -right-[16%]" delay="-2s" icon={<span className="grid h-8 w-8 place-items-center rounded-full grad-ember text-shell"><Scope /></span>} title="Doctor-led care" sub="Trichologist & dermatologist" />
        <HeroCard className="top-[58%] -left-[10%]" delay="-4s" icon={<span className="grid h-8 w-8 place-items-center rounded-full bg-night text-shell"><Scalpel /></span>} title="FUE hair transplant" sub="Surgeons from Mumbai" />
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[max(5.5rem,10svh)] z-10 px-4 md:hidden">
        <HeroCard className="left-4 top-0" small delay="0s" icon={<span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[0.7rem] font-bold text-[#4285F4] shadow-sm">G</span>} title={<><span className="font-semibold">{site.rating.value}</span> <Stars className="ml-0.5 text-[0.5rem] text-ember" /></>} sub={`${site.rating.count}+ reviews`} />
        <HeroCard className="right-4 top-[33svh]" small delay="-2.5s" icon={<span className="grid h-6 w-6 place-items-center rounded-full grad-ember text-[0.7rem] text-shell"><Scope /></span>} title="Doctor-led care" sub="Trichologist & dermatologist" />
      </div>

      <div data-hero-content className="wrap relative flex h-full flex-col items-center justify-end pb-[max(6svh,2.5rem)] text-center">
        <h1 className="text-cocoa">
          <span data-hero-fade className="glass mb-7 inline-flex rounded-full px-3.5 py-1.5 text-[0.56rem] font-semibold tracking-[0.1em] whitespace-nowrap text-cocoa/80 uppercase sm:px-4 sm:text-[0.7rem] sm:tracking-[0.18em]">
            Hair transplant & skin clinic · Berhampur · Thane · Bhiwadi
          </span>
          {/* The animated line is split into letters; screen readers get this single clean copy instead. */}
          <span className="sr-only">Thicker hair. Clearer skin.</span>
          <span data-hero-line aria-hidden className="block font-display text-[clamp(3.2rem,7.4vw,7.6rem)] !font-normal leading-[0.98] tracking-[-0.02em] text-balance">
            Thicker hair. <span className="font-accent italic text-grad">Clearer skin.</span>
          </span>
        </h1>
        <div data-hero-fade className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
          <Link href="/contact" className="btn btn-dark !min-h-12 !gap-1.5 !px-4 text-[0.86rem] whitespace-nowrap sm:!min-h-14 sm:!gap-2 sm:!px-8 sm:text-[0.98rem]" data-cursor="Book">
            Book a consultation <ArrowUpRight />
          </Link>
          <a
            href={whatsappLink("Hi Madhaav Aesthetic, I'd like to book a consultation.")}
            target="_blank"
            rel="noopener"
            className="btn glass !min-h-12 !gap-1.5 !px-4 text-[0.86rem] whitespace-nowrap text-cocoa sm:!min-h-14 sm:!gap-2 sm:!px-7 sm:text-[0.98rem]"
          >
            <WhatsApp className="text-[#1f9d55]" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/** A small glass card floating beside the hero photo (gentle drift; offset delays keep the cards out of step). */
function HeroCard({ icon, title, sub, className, delay, small }: { icon: ReactNode; title: ReactNode; sub: string; className?: string; delay: string; small?: boolean }) {
  return (
    <div data-hero-card className={`absolute ${className ?? ""}`}>
      <div
        className={`hero-bob glass flex items-center gap-2.5 rounded-2xl text-left shadow-[0_18px_40px_-22px_rgba(58,29,24,0.45)] ${small ? "px-2.5 py-1.5" : "px-3.5 py-2.5"}`}
        style={{ animationDelay: delay }}
      >
        {icon}
        <span className="leading-tight">
          <span className={`flex items-center text-cocoa ${small ? "text-[0.72rem]" : "text-[0.86rem] font-medium"}`}>{title}</span>
          <span className={`block text-cocoa/70 ${small ? "text-[0.6rem]" : "text-[0.72rem]"}`}>{sub}</span>
        </span>
      </div>
    </div>
  );
}
