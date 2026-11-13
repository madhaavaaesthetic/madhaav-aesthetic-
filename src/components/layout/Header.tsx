"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/brand/Logo";
import { Magnetic } from "@/components/motion/Magnetic";
import { headerNav, mainNav } from "@/lib/nav";
import { branches, site, telLink, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Phone, WhatsApp, Instagram } from "@/components/ui/Icons";

const ease = [0.76, 0, 0.24, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [preview, setPreview] = useState(mainNav[0].image);

  // Hysteresis (on past 80px, off above 24px) keeps smooth-scroll jitter from toggling the pill back and forth.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((s) => (s ? y > 24 : y > 80));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const pill = scrolled && !open;

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[120] px-3 md:px-5">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex items-center justify-between gap-4 border backdrop-blur-xl backdrop-saturate-150 will-change-[max-width,transform]",
            "transition-[max-width,margin,padding,height,border-radius,background-color,border-color,box-shadow] duration-700 ease-[var(--ease-expo)]",
            pill
              ? "mt-3 h-16 max-w-[1080px] rounded-full border-white/60 bg-shell/85 pr-2 pl-4 shadow-[0_18px_50px_-18px_rgba(58,29,24,0.35),inset_0_1px_0_rgba(255,255,255,0.7)] md:mt-4 md:pl-5"
              : "mt-0 h-[var(--header-h)] max-w-[1440px] rounded-none border-transparent bg-transparent px-[calc(var(--gutter)-0.75rem)] shadow-none md:px-[calc(var(--gutter)-1.25rem)]"
          )}
        >
          <Logo tone={open ? "light" : "dark"} onClick={() => setOpen(false)} />

          <nav aria-label="Primary" className={cn("hidden items-center gap-1 lg:flex", open && "invisible")}>
            {headerNav.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors",
                    active ? "font-semibold text-cocoa" : "text-cocoa hover:text-vermilion"
                  )}
                >
                  {n.label}
                  {active && <motion.span layoutId="nav-dot" className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-vermilion" />}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <a
              href={telLink()}
              className={cn("hidden items-center gap-2 text-sm font-medium", !pill && "xl:flex", open ? "text-shell/80" : "text-cocoa/80 hover:text-cocoa")}
            >
              <Phone className="text-vermilion" /> {site.phoneDisplay}
            </a>
            <span className="hidden md:block">
              <Magnetic>
                <Link href="/contact" className={cn("btn !min-h-12 !pl-5", open ? "btn-light" : "btn-primary")} data-cursor="Book">
                  Book appointment
                  <span className="btn-ico">
                    <ArrowUpRight />
                  </span>
                </Link>
              </Magnetic>
            </span>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "relative grid h-12 w-12 place-items-center rounded-full border transition-colors duration-500",
                open ? "border-shell/30 text-shell" : "border-cocoa/15 text-cocoa hover:border-cocoa/40"
              )}
            >
              <span className="relative block h-3 w-5">
                <span className={cn("absolute left-0 h-[1.5px] w-5 bg-current transition-all duration-500 ease-[var(--ease-expo)]", open ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 h-[1.5px] bg-current transition-all duration-500 ease-[var(--ease-expo)]", open ? "top-1.5 w-5 -rotate-45" : "top-3 w-3")} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[110] overflow-y-auto bg-night text-shell"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 3.5rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3.5rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3.5rem) 2.25rem)" }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="wrap grid min-h-full grid-cols-1 gap-10 pt-[calc(var(--header-h)+2rem)] pb-28 lg:grid-cols-12 lg:pb-12">
              <nav aria-label="Menu" className="lg:col-span-7">
                <ul className="flex flex-col">
                  {mainNav.map((n, i) => (
                    <li key={n.href} className="overflow-hidden border-b border-shell/10">
                      <motion.div initial={{ y: "110%" }} animate={{ y: 0 }} exit={{ y: "110%" }} transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.05 }}>
                        <Link
                          href={n.href}
                          onMouseEnter={() => setPreview(n.image)}
                          onFocus={() => setPreview(n.image)}
                          className="group flex items-baseline gap-4 py-3 md:py-4"
                        >
                          <span className="w-8 font-accent text-sm text-ember/80 italic">0{i + 1}</span>
                          <span className="font-display text-[2.1rem] leading-none transition-[color,transform] duration-500 group-hover:translate-x-3 group-hover:text-ember md:text-6xl">
                            {n.label}
                          </span>
                          <ArrowUpRight className="ml-auto text-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.aside
                className="flex flex-col gap-8 lg:col-span-5"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.45 }}
              >
                <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[2rem] lg:block">
                  <AnimatePresence mode="popLayout">
                    <motion.div key={preview} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                      <Image src={preview} alt="" fill sizes="40vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-night/60 to-transparent" />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
                  {branches.map((b) => (
                    <div key={b.slug} className="text-sm">
                      <p className="eyebrow mb-2 text-ember">{b.city}</p>
                      <p className="text-shell/70">{b.street}</p>
                      <a href={telLink(b.phone)} className="mt-2 inline-block text-shell link-underline">
                        {b.phoneDisplay}
                      </a>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={whatsappLink("Hi Madhaav Aesthetic, I'd like to book a consultation.")} target="_blank" rel="noopener" className="btn btn-primary">
                    <WhatsApp /> WhatsApp us
                  </a>
                  <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-ghost text-shell">
                    <Instagram /> Instagram
                  </a>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
