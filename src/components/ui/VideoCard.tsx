"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Play } from "./Icons";

/** Lazy, muted, looping video that only loads and plays while on screen. */
export function VideoCard({
  src,
  poster,
  title,
  caption,
  className,
  aspect = "aspect-[9/16]",
  sound,
}: {
  src: string;
  poster: string;
  title: string;
  caption?: string;
  className?: string;
  aspect?: string;
  sound?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          if (!reduce) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <figure className={cn("relative overflow-hidden rounded-[1.75rem] bg-night", aspect, className)}>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="none"
        aria-label={title}
        src={active ? src : undefined}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/75 via-transparent to-night/10" />
      {sound && (
        <button
          type="button"
          onClick={() => {
            setMuted((m) => !m);
            ref.current?.play().catch(() => {});
          }}
          className="glass absolute top-4 right-4 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-cocoa"
        >
          <Play /> {muted ? "Play with sound" : "Mute"}
        </button>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-shell">
        <p className="eyebrow text-ember">{title}</p>
        {caption && <p className="mt-1.5 text-sm text-shell/80">{caption}</p>}
      </figcaption>
    </figure>
  );
}
