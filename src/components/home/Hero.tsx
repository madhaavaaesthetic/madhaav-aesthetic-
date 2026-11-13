"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ContourBackdrop } from "@/components/brand/ContourBackdrop";
import { ArrowUpRight, Stars, WhatsApp } from "@/components/ui/Icons";
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
        .from(split.chars, { yPercent: 110, autoAlpha: 0, duration: 1, stagger: 0.018 }, 0.15)
        .from(q("[data-hero-fade]"), { y: 22, autoAlpha: 0, duration: 1, stagger: 0.08 }, 0.55);

      const play = () => tl.play();
      if (document.documentElement.dataset.loaded) play();
      else window.addEventListener("madhaav:loaded", play, { once: true });

      // Gentle depth as the page scrolls away (works with native touch scrolling too).
      gsap.to(q("[data-hero-content]"), { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-bg]"), { scale: 1.12, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

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

      <div data-hero-content className="wrap relative flex h-full flex-col items-center justify-end pb-[max(11svh,4.5rem)] text-center">
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
        <p data-hero-fade className="mx-auto mt-6 max-w-[34rem] text-[1.02rem] leading-relaxed text-cocoa/75 md:text-[1.12rem]">
          Doctor-led hair transplant, hair regrowth and skin treatments, with a gentle and personal approach.
        </p>
        <div data-hero-fade className="mt-9 flex flex-col items-center gap-4">
          <Link href="/contact" className="btn btn-dark !min-h-14 !px-9 text-[0.98rem]" data-cursor="Book">
            Book a consultation <ArrowUpRight />
          </Link>
          <a
            href={whatsappLink("Hi Madhaav Aesthetic, I'd like to book a consultation.")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 text-sm text-cocoa/75 transition-colors hover:text-cocoa"
          >
            <WhatsApp className="text-[#1f9d55]" /> or chat with us on WhatsApp
          </a>
        </div>
        <p data-hero-fade className="mt-9 flex items-center gap-2 text-xs text-cocoa/70">
          <Stars className="text-[0.7rem] text-ember" /> {site.rating.value} from {site.rating.count}+ Google reviews · 0% EMI
        </p>
      </div>
    </section>
  );
}
