import { cn } from "@/lib/utils";

/** Flowing hair strands echoing the flame-like hair in the Madhaav logo. Paths carry data-strand for GSAP DrawSVG. */
export const STRAND_PATHS = [
  "M40 760 C 180 600, 140 420, 300 300 S 520 120, 640 40",
  "M90 780 C 240 640, 220 470, 360 360 S 560 200, 700 110",
  "M150 800 C 290 680, 300 520, 430 420 S 620 280, 760 190",
  "M210 820 C 340 720, 380 580, 500 480 S 680 360, 820 280",
  "M270 840 C 390 760, 450 640, 560 550 S 730 440, 870 370",
  "M330 860 C 440 800, 520 700, 620 620 S 780 520, 910 460",
  "M10 700 C 120 560, 60 380, 210 270 S 400 90, 520 10",
];

export function Strands({ className, strokeWidth = 1.4, id = "strand-grad" }: { className?: string; strokeWidth?: number; id?: string }) {
  return (
    <svg viewBox="0 0 920 880" fill="none" className={cn("pointer-events-none", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="880" x2="920" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#A61E22" />
          <stop offset="0.45" stopColor="#E23B2A" />
          <stop offset="1" stopColor="#F58A2A" />
        </linearGradient>
      </defs>
      {STRAND_PATHS.map((d, i) => (
        <path key={i} data-strand d={d} stroke={`url(#${id})`} strokeWidth={strokeWidth + (i % 3) * 0.6} strokeLinecap="round" opacity={0.35 + (i % 4) * 0.15} />
      ))}
    </svg>
  );
}

/** The follicle mark from the logo: a hair rising from a bulb beneath the skin line. */
export function Follicle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden>
      <path d="M8 74 H112" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 6 C 64 30, 66 50, 64 72 C 63 80, 57 80, 56 72 C 54 50, 56 30, 60 6 Z" fill="#A61E22" />
      <path d="M44 74 C 44 92, 76 92, 76 74" stroke="#A61E22" strokeWidth="5" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="88" r="3" fill="currentColor" />
      <circle cx="90" cy="88" r="3" fill="currentColor" />
      <circle cx="22" cy="98" r="2.2" fill="currentColor" />
      <circle cx="98" cy="98" r="2.2" fill="currentColor" />
    </svg>
  );
}

/** Wheat sprig (growth) from the logo. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 60" fill="none" className={className} aria-hidden>
      <path d="M4 34 C 50 30, 100 28, 156 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${30 + i * 24} ${31 - i * 0.6})`}>
          <path d="M0 0 C 6 -16, 18 -18, 22 -14 C 16 -6, 8 -2, 0 0 Z" fill="currentColor" />
          <path d="M0 0 C 6 14, 18 16, 22 12 C 16 4, 8 2, 0 0 Z" fill="currentColor" />
        </g>
      ))}
      <path d="M4 34 C 10 24, 20 24, 24 30 C 18 36, 10 38, 4 34 Z" fill="currentColor" />
    </svg>
  );
}
