"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { preload } from "react-dom";
import { gsap } from "@/lib/gsap";

/** Source time (s) where the intro starts: the first colourful frame, saved as preloader-start.webp. */
const START_AT = 0.9;
/** The intro video's full length (s): the site opens only after the whole animation has played. */
const VIDEO_END = 8;
/** If the video cannot start playing within this time (very slow network / blocked autoplay), open the site anyway. */
const START_TIMEOUT = 10000;
const START_FRAME = "/videos/preloader-start.webp";

const markLoaded = () => {
  document.documentElement.dataset.loaded = "1";
  window.dispatchEvent(new Event("madhaav:loaded"));
};

/**
 * Intro animation, shown whenever a visitor lands on the home page; it always plays to the end before the site appears.
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
      markLoaded();
      return;
    }
    const el = root.current;
    const v = video.current;
    if (!el || !v) return;
    // JavaScript is in control now: switch off the CSS no-JS backstop so it can never cut the intro short.
    el.style.animation = "none";
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

    if (reduce) {
      exit(true);
      return;
    }

    v.playbackRate = 1;
    const counter = el.querySelector<HTMLElement>("[data-counter]");
    const span = VIDEO_END - START_AT;
    const onTime = () => {
      const p = Math.max(0, Math.min(1, (v.currentTime - START_AT) / span));
      if (counter) counter.textContent = String(Math.round(p * 100)).padStart(3, "0");
    };
    // Only give up if playback never starts; once playing, nothing cuts the animation short.
    const startTimer = window.setTimeout(() => exit(), START_TIMEOUT);
    let endTimer = 0;
    const onPlaying = () => {
      gsap.to(v, { autoAlpha: 1, duration: 0.2 });
      window.clearTimeout(startTimer);
      // Backstop in case "ended" never fires: the remaining running time plus a little slack.
      window.clearTimeout(endTimer);
      endTimer = window.setTimeout(() => exit(), (VIDEO_END - v.currentTime) * 1000 + 2500);
    };
    const onEnded = () => {
      if (counter) counter.textContent = "100";
      exit();
    };
    const onError = () => exit(true);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("ended", onEnded);
    v.addEventListener("error", onError);
    const started = v.play();
    if (started) started.catch(() => window.setTimeout(() => exit(), 1200)); // autoplay blocked: show the still briefly

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("error", onError);
      window.clearTimeout(startTimer);
      window.clearTimeout(endTimer);
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
        preload="auto"
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
