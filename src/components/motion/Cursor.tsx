"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { m, useMotionValue, useSpring, useTransform, useVelocity, AnimatePresence } from "motion/react";

const QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** A small ember leaf (from the logo's sprig) + trailing ring. Grows over links; shows a label over elements with data-cursor="Label". */
export function Cursor() {
  const enabled = useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
  const [label, setLabel] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const ry = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });
  // The leaf sways with horizontal movement, like it is being carried by the pointer.
  const vx = useVelocity(x);
  const sway = useSpring(useTransform(vx, [-1600, 0, 1600], [-28, 0, 28], { clamp: true }), { stiffness: 180, damping: 18 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor || null);
      setHover(!!t?.closest("a, button, [role='button'], input, select, textarea, label"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const size = label ? 96 : hover ? 56 : 34;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <m.div
        className="absolute top-0 left-0 rounded-full"
        style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          backgroundColor: label ? "rgba(226,59,42,0.94)" : "rgba(226,59,42,0)",
          borderColor: label ? "rgba(226,59,42,0)" : hover ? "rgba(226,59,42,0.9)" : "rgba(58,29,24,0.35)",
          scale: down ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      >
        <div className="absolute inset-0 rounded-full border" style={{ borderColor: "inherit" }} />
        <AnimatePresence>
          {label && (
            <m.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="absolute inset-0 grid place-items-center text-center text-[11px] font-semibold tracking-[0.14em] uppercase text-shell"
            >
              {label}
            </m.span>
          )}
        </AnimatePresence>
      </m.div>
      {/* Leaf pointer: its tip is the hotspot. */}
      <m.div className="absolute top-0 left-0" style={{ x, y, rotate: sway, transformOrigin: "0 0" }} animate={{ opacity: label ? 0 : 1, scale: down ? 0.82 : hover ? 1.22 : 1 }} transition={{ type: "spring", stiffness: 380, damping: 24 }}>
        <svg width="20" height="20" viewBox="0 0 24 24" className="-translate-x-[2px] -translate-y-[2px] drop-shadow-[0_2px_3px_rgba(58,29,24,0.35)]">
          <defs>
            <linearGradient id="cursor-leaf" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f58a2a" />
              <stop offset="0.55" stopColor="#e23b2a" />
              <stop offset="1" stopColor="#a61e22" />
            </linearGradient>
          </defs>
          <path d="M2 2 C 13 1.5, 21.5 7.5, 20.5 20.5 C 7.5 21.5, 1.5 13, 2 2 Z" fill="url(#cursor-leaf)" />
          <path d="M3.6 3.6 Q 11 10.5, 19.2 19.2" stroke="rgba(255,255,255,0.7)" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M20.3 20.3 L 22.6 22.6" stroke="#a61e22" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </m.div>
    </div>
  );
}
