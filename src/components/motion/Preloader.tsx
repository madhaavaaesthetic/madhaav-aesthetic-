"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { preload } from "react-dom";
import { gsap } from "@/lib/gsap";

const KEY = "madhaav-intro-seen";
/** Source time (s) where the intro starts: the first colourful frame, saved as preloader-start.webp. */
const START_AT = 0.9;
/** Source time (s) at which the logo reveal in preloader.mp4 is complete. */
const LOGO_COMPLETE_AT = 5.6;
const PLAYBACK_RATE = 1.5;
const START_FRAME = "/videos/preloader-start.webp";

const markLoaded = () => {
  document.documentElement.dataset.loaded = "1";
  window.dispatchEvent(new Event("madhaav:loaded"));
};

/**
 * Intro animation, shown only when a visitor first lands on the home page.
 * A still of the opening frame paints immediately (so it is the page's LCP), then the video continues from that exact frame.
 */
export function Preloader() {
  const pathname = usePathname();
  const [active] = useState(pathname === "/");
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);

  if (active) preload(START_FRAME, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    if (!active) {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      markLoaded();
      return;
    }
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.__lenis?.stop();

    let exited = false;
    const finish = () => {
      window.__lenis?.start();
      markLoaded();
      setDone(true);
    };
    const exit = (fast = false) => {
      if (exited) return;
      exited = true;
      const tl = gsap.timeline({ onComplete: finish });
      if (fast) {
        tl.to(el, { autoAlpha: 0, duration: 0.35, ease: "power2.out" });
        return;
      }
      tl.to(el.querySelectorAll("[data-intro-media]"), { scale: 0.94, autoAlpha: 0, duration: 0.55, ease: "power3.in" })
        .to(el.querySelector("[data-counter]"), { autoAlpha: 0, duration: 0.3 }, 0)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, 0.3);
    };

    if (seen || reduce) {
      exit(true);
      return;
    }

    v.playbackRate = PLAYBACK_RATE;
    const counter = el.querySelector<HTMLElement>("[data-counter]");
    const span = LOGO_COMPLETE_AT - START_AT;
    const onTime = () => {
      const p = Math.max(0, Math.min(1, (v.currentTime - START_AT) / span));
      if (counter) counter.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (v.currentTime >= LOGO_COMPLETE_AT) exit();
    };
    const onPlaying = () => gsap.to(v, { autoAlpha: 1, duration: 0.2 });
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("playing", onPlaying, { once: true });
    v.addEventListener("ended", () => exit());
    v.addEventListener("error", () => exit(true));
    const started = v.play();
    if (started) started.catch(() => window.setTimeout(() => exit(), 700));
    const failsafe = window.setTimeout(() => exit(), 5500);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      window.clearTimeout(failsafe);
    };
  }, [active]);

  if (!active || done) return null;

  return (
    <div ref={root} className="preloader fixed inset-0 z-[300] bg-[#F5ECE4]" style={{ clipPath: "inset(0% 0% 0% 0%)" }} aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element -- must paint before hydration as the LCP image */}
      <img
        data-intro-media
        src={START_FRAME}
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 h-full w-full object-cover portrait:object-contain"
      />
      <video
        ref={video}
        data-intro-media
        className="absolute inset-0 h-full w-full max-w-none object-cover opacity-0 portrait:object-contain"
        muted
        playsInline
        preload="none"
      >
        <source src={`/videos/preloader.webm#t=${START_AT}`} type="video/webm" />
        <source src={`/videos/preloader.mp4#t=${START_AT}`} type="video/mp4" />
      </video>
      <div className="absolute right-0 bottom-8 left-0 wrap flex items-end justify-between text-cocoa">
        <span className="eyebrow opacity-80">Timeless beauty, expertly delivered</span>
        <span data-counter className="font-hero text-4xl tabular-nums md:text-6xl">
          000
        </span>
      </div>
    </div>
  );
}
