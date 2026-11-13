"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const KEY = "madhaav-intro-seen";
/** Source-time (seconds) at which the logo reveal in preloader.mp4 is complete. */
const LOGO_COMPLETE_AT = 5.6;
const PLAYBACK_RATE = 1.5;

export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);
  const [play, setPlay] = useState(false);

  useEffect(() => {
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
      document.documentElement.dataset.loaded = "1";
      window.dispatchEvent(new Event("madhaav:loaded"));
      setDone(true);
    };
    const exit = (fast = false) => {
      if (exited) return;
      exited = true;
      const tl = gsap.timeline({ onComplete: finish });
      if (fast) {
        tl.to(el, { autoAlpha: 0, duration: 0.45, ease: "power2.out" });
        return;
      }
      tl.to(v, { scale: 0.92, autoAlpha: 0, duration: 0.6, ease: "power3.in" })
        .to(el.querySelector("[data-counter]"), { autoAlpha: 0, duration: 0.3 }, 0)
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, 0.35);
    };

    if (seen || reduce) {
      exit(true);
      return;
    }

    setPlay(true);
    v.playbackRate = PLAYBACK_RATE;
    const counter = el.querySelector<HTMLElement>("[data-counter]");
    const onTime = () => {
      const p = Math.min(1, v.currentTime / LOGO_COMPLETE_AT);
      if (counter) counter.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (v.currentTime >= LOGO_COMPLETE_AT) exit();
    };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", () => exit());
    v.addEventListener("error", () => exit(true));
    const started = v.play();
    if (started) started.catch(() => window.setTimeout(() => exit(), 900));
    const failsafe = window.setTimeout(() => exit(), 5200);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      window.clearTimeout(failsafe);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[300] grid place-items-center bg-[#F5ECE4]"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      aria-hidden
    >
      <video
        ref={video}
        className="absolute inset-0 h-full w-full max-w-none object-cover portrait:object-contain"
        muted
        playsInline
        preload="none"
        poster="/videos/preloader-poster.jpg"
        autoPlay={play}
      >
        <source src="/videos/preloader.webm" type="video/webm" />
        <source src="/videos/preloader.mp4" type="video/mp4" />
      </video>
      <div className="absolute right-0 bottom-8 left-0 wrap flex items-end justify-between text-cocoa">
        <span className="eyebrow opacity-60">Timeless beauty, expertly delivered</span>
        <span data-counter className="font-hero text-4xl tabular-nums md:text-6xl">000</span>
      </div>
    </div>
  );
}
