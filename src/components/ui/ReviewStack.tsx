"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Stars } from "@/components/ui/Icons";

/*
 * Stacked, skewed review cards that fan out on hover (adapted from a stacked "testimonial cards" pattern).
 * Styled as real Google reviews in the site's dark glass, with no social-media branding or invented engagement numbers.
 * Mouse: hover a card to bring it forward; the cards in front slide away. Touch: first tap brings a card forward, second opens it.
 */

export interface StackReview {
  name: string;
  clinic: string;
  stars: number;
  date: string;
  text: string;
  href: string;
}

const BASE = [
  // back
  "[grid-area:stack] hover:-translate-y-10 before:absolute before:inset-0 before:rounded-2xl before:bg-night/55 before:content-[''] before:transition-opacity before:duration-500 hover:before:opacity-0 grayscale-[70%] hover:grayscale-0",
  // middle
  "[grid-area:stack] translate-x-8 translate-y-6 sm:translate-x-16 sm:translate-y-10 hover:-translate-y-1 before:absolute before:inset-0 before:rounded-2xl before:bg-night/45 before:content-[''] before:transition-opacity before:duration-500 hover:before:opacity-0 grayscale-[60%] hover:grayscale-0",
  // front
  "[grid-area:stack] translate-x-16 translate-y-12 sm:translate-x-32 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10",
];

function GoogleMark() {
  return <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white text-[0.8rem] font-bold text-[#4285F4] shadow-sm sm:size-8">G</span>;
}

function ReviewCard({ r, className, active, onHover, onLeave, onTap }: { r: StackReview; className: string; active: boolean; onHover: () => void; onLeave: () => void; onTap: () => void }) {
  const click = (e: React.MouseEvent) => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (touch && !active) {
      e.preventDefault();
      onTap();
    }
  };
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noopener"
      onClick={click}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-label={`Google review by ${r.name}, ${r.stars} stars: ${r.text.slice(0, 80)}…`}
      className={cn(
        "relative flex min-h-[170px] w-[270px] -skew-y-[6deg] cursor-pointer select-none flex-col rounded-2xl border border-shell/15 bg-[rgba(38,20,16,0.86)] px-4 py-4 text-shell shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500 hover:border-shell/30 sm:min-h-[200px] sm:w-[400px] sm:px-5 sm:py-5",
        active && "ring-2 ring-ember/60",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full grad-ember text-sm font-semibold sm:size-11 sm:text-base">{r.name.charAt(0).toUpperCase()}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold sm:text-base">{r.name}</span>
          <span className="block text-[0.7rem] text-shell/65 sm:text-xs">Google review · {r.clinic}</span>
        </span>
        <GoogleMark />
      </div>
      <div className="mt-3 flex items-center gap-2 text-[0.7rem] text-shell/60 sm:text-xs">
        <Stars n={r.stars} className="text-[0.7rem] text-ember sm:text-xs" />
        <span>{new Date(r.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
      </div>
      <p className="mt-2.5 line-clamp-4 text-[0.82rem] leading-relaxed text-shell/88 sm:text-[0.95rem]">“{r.text}”</p>
      <span className="mt-auto pt-3 text-[0.7rem] font-semibold text-ember sm:text-xs">Read on Google ↗</span>
    </a>
  );
}

export function ReviewStack({ reviews }: { reviews: StackReview[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const focus = hovered ?? active;

  // Bringing a back card forward pushes the cards in front of it down and aside, so it is fully readable.
  const spread = (i: number) => {
    if (focus === 0 && i === 1) return "!translate-x-14 !translate-y-20 sm:!translate-x-24 sm:!translate-y-32";
    if (focus === 0 && i === 2) return "!translate-x-24 !translate-y-28 sm:!translate-x-40 sm:!translate-y-44";
    if (focus === 1 && i === 2) return "!translate-x-24 !translate-y-24 sm:!translate-x-40 sm:!translate-y-40";
    return "";
  };

  return (
    <div className="grid place-items-center pb-14 [grid-template-areas:'stack'] sm:pb-24">
      {reviews.slice(0, 3).map((r, i) => (
        <ReviewCard
          key={r.name + r.date}
          r={r}
          className={cn(BASE[i], spread(i))}
          active={active === i}
          onHover={() => setHovered(i)}
          onLeave={() => setHovered(null)}
          onTap={() => setActive(i)}
        />
      ))}
    </div>
  );
}
