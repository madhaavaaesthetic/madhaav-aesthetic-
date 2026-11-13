"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Strands, Follicle, Sprig } from "@/components/brand/Strands";
import { Magnetic } from "@/components/motion/Magnetic";
import { Marquee } from "@/components/motion/Marquee";
import { ArrowUpRight, Stars, WhatsApp } from "@/components/ui/Icons";
import { site, whatsappLink } from "@/lib/site";

export function Hero({ marquee }: { marquee: { slug: string; shortName: string }[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      const lines = SplitText.create(q("[data-hero-line]"), { type: "words,chars", aria: "none", wordsClass: "inline-block whitespace-nowrap", charsClass: "inline-block will-change-transform" });
      lines.chars.forEach((c) => c.parentElement?.closest(".text-grad") && c.classList.add("text-grad"));
      // On phones the picture sits on top, so it reveals first and the headline follows.
      const mobile = window.matchMedia("(max-width: 1023px)").matches;
      const textAt = mobile ? 0.45 : 0;
      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      tl.set(q("[data-hero]"), { autoAlpha: 1 })
        .set(q("[data-strand]"), { drawSVG: "0%" })
        .from(lines.chars, { yPercent: 115, rotate: 5, duration: 0.8, stagger: 0.012 }, textAt)
        .from(q("[data-hero-fade]"), { y: 24, autoAlpha: 0, duration: 0.9, stagger: 0.06 }, textAt + 0.2)
        .fromTo(q("[data-hero-arch]"), { clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)", duration: mobile ? 1.1 : 1.8, ease: mobile ? "expo.out" : "expo.inOut" }, 0)
        .from(q("[data-hero-arch] img"), { scale: 1.35, duration: 2.2 }, 0)
        .to(q("[data-strand]"), { drawSVG: "100%", duration: 2.4, stagger: 0.1, ease: "power2.inOut" }, 0.2)
        .from(q("[data-hero-float]"), { y: 40, autoAlpha: 0, scale: 0.9, duration: 1.2, stagger: 0.12 }, mobile ? 0.9 : 0.8);

      const play = () => tl.play();
      if (document.documentElement.dataset.loaded) play();
      else window.addEventListener("madhaav:loaded", play, { once: true });

      gsap.to(q("[data-hero-arch-inner]"), { yPercent: 14, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-strands]"), { yPercent: -18, rotate: -6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(q("[data-hero-title]"), { yPercent: -10, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });

      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine)", () => {
        const xTo = gsap.quickTo(q("[data-hero-strands]"), "x", { duration: 1.2, ease: "power3" });
        const yTo = gsap.quickTo(q("[data-hero-strands]"), "y", { duration: 1.2, ease: "power3" });
        const move = (e: PointerEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 40);
          yTo((e.clientY / window.innerHeight - 0.5) * 30);
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
      });

      return () => {
        window.removeEventListener("madhaav:loaded", play);
        lines.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_75%_30%,#f9dccb_0%,transparent_70%),radial-gradient(40%_40%_at_10%_90%,#f6e1d3_0%,transparent_70%)]" />
      <div data-hero-strands className="pointer-events-none absolute top-0 -right-[20%] -z-0 h-[120%] w-[90%] md:-right-[8%] md:w-[70%]">
        <Strands className="h-full w-full opacity-60" strokeWidth={1.2} id="hero-grad" />
      </div>

      {/* Exactly one screen tall: type and image scale with viewport height so nothing is cut off above the fold. */}
      <div className="wrap relative flex h-[100svh] min-h-[600px] max-h-[1080px] flex-col gap-5 pt-[calc(var(--header-h)+0.75rem)] pb-5 lg:grid lg:h-[calc(100svh-5.25rem)] lg:min-h-[560px] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-[calc(var(--header-h)+1rem)] lg:pb-0">
        <div data-hero-title className="relative z-10 shrink-0 lg:col-span-7">
          <p data-hero-fade className="mb-[min(1.25rem,2svh)] inline-flex items-center gap-2.5 rounded-full border border-cocoa/12 bg-shell/70 py-1.5 pr-4 pl-2 text-[0.75rem] font-medium text-cocoa/80 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermilion opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermilion" />
            </span>
            Open 7 days · Berhampur · Thane · Bhiwadi
          </p>
          <h1 className="text-cocoa">
            <span data-hero-fade className="eyebrow mb-[min(0.9rem,1.6svh)] block text-[0.68rem] leading-relaxed text-vermilion md:text-xs">
              Hair transplant & skin clinic in Berhampur, Thane & Bhiwadi
            </span>
            {/* The animated lines below are split into letters; screen readers get this single clean copy instead. */}
            <span className="sr-only">Thicker hair. Clearer skin. Treated by real doctors.</span>
            <span data-hero-line aria-hidden className="block font-hero text-[min(14.5vw,8.6svh)] leading-[0.95] lg:text-[min(8vw,12.5svh)]">
              Thicker hair.
            </span>
            <span className="flex flex-wrap items-center gap-x-5">
              <span data-hero-line aria-hidden className="block pr-2 font-accent text-[min(14.5vw,8.6svh)] leading-[1.02] italic text-grad lg:text-[min(8vw,12.5svh)]">
                Clearer skin.
              </span>
              <Sprig className="hidden h-7 w-20 text-ember lg:block" />
            </span>
            <span data-hero-line aria-hidden className="mt-1 block font-display text-[min(8.4vw,4.9svh)] leading-[1.05] lg:text-[min(3.9vw,6.4svh)]">
              Treated by real doctors.
            </span>
          </h1>
          <p data-hero-fade className="mt-[min(1.5rem,2.4svh)] max-w-xl text-[0.98rem] leading-relaxed text-cocoa/75 md:text-lead">
            Hair fall, baldness, acne or pigmentation? Our doctors find the cause first, then treat it with FUE hair transplant, PRP, GFC, laser and skin treatments. 0% EMI available.
          </p>
          <div data-hero-fade className="mt-[min(1.75rem,3svh)] grid grid-cols-[1.5fr_1fr] gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
            <Magnetic className="w-full sm:w-auto">
              <Link href="/contact" className="btn btn-primary w-full !pl-4 text-[0.88rem] whitespace-nowrap sm:w-auto sm:!pl-6 sm:text-[0.95rem]" data-cursor="Book">
                Book appointment
                <span className="btn-ico">
                  <ArrowUpRight />
                </span>
              </Link>
            </Magnetic>
            <a href={whatsappLink("Hi Madhaav Aesthetic, I'd like to know more about treatment.")} target="_blank" rel="noopener" className="btn btn-ghost !px-3 text-[0.88rem] whitespace-nowrap text-cocoa sm:!px-6 sm:text-[0.95rem]">
              <WhatsApp className="text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>

        <div className="relative order-first min-h-[150px] flex-1 lg:order-none lg:col-span-5 lg:flex-none lg:self-end">
          <div
            data-hero-arch
            className="relative mx-auto h-full w-full overflow-hidden rounded-[999px_999px_24px_24px] bg-blush lg:aspect-[4/5] lg:h-[min(72svh,700px)] lg:w-auto lg:translate-y-[3.25rem]"
          >
            <div data-hero-arch-inner className="absolute inset-x-0 -top-[8%] -bottom-[8%]">
              <Image
                src="/images/brand-scalp-massage-therapy.jpg"
                alt="Patient receiving scalp treatment for hair fall at Madhaav Aesthetic clinic"
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 to-transparent" />
          </div>

          <div data-hero-float className="absolute -top-4 -left-2 hidden h-32 w-32 lg:block xl:-left-14">
            <svg viewBox="0 0 200 200" className="h-full w-full animate-spin-slow text-cocoa" aria-hidden>
              <defs>
                <path id="circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text className="fill-current text-[13px] font-semibold uppercase">
                <textPath href="#circle" textLength="486" lengthAdjust="spacing">
                  Diagnosis first · Doctor led · Natural results ·
                </textPath>
              </text>
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="glass grid h-14 w-14 place-items-center rounded-full">
                <Follicle className="h-9 w-9 text-cocoa" />
              </span>
            </div>
          </div>

          <div data-hero-float className="glass absolute bottom-3 left-3 z-10 rounded-2xl px-4 py-3 lg:bottom-10 lg:-left-10">
            <div className="flex items-center gap-1 text-ember">
              <Stars className="text-xs" />
              <span className="ml-1.5 font-semibold text-cocoa">{site.rating.value}</span>
            </div>
            <p className="mt-0.5 text-xs text-cocoa/70">{site.rating.count}+ Google reviews</p>
          </div>

          <div data-hero-float className="glass-dark absolute top-1/3 -right-2 hidden rounded-2xl !bg-night/85 p-4 text-shell md:block lg:-right-6">
            <p className="eyebrow text-[0.62rem] text-ember">0% EMI</p>
            <p className="mt-1 font-display text-lg leading-tight">
              Pay for your hair
              <br />
              transplant monthly
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-y border-white/60 bg-shell/65 py-5 shadow-[0_-12px_40px_-24px_rgba(58,29,24,0.35)] backdrop-blur-xl backdrop-saturate-150">
        <Marquee duration={55}>
          {marquee.map((t) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} className="group flex items-center gap-6 px-6">
              <span className="font-display text-3xl whitespace-nowrap text-cocoa transition-colors group-hover:text-vermilion md:text-4xl">{t.shortName}</span>
              <span aria-hidden className="sprig-mark h-4 w-12 text-ember/70" />
            </Link>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
