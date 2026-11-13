import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Section background tones: a CSS paint for the band, and a fill for the incoming waves. */
const TONES = {
  shell: { paint: "#fbf7f3", fill: "#fbf7f3" },
  cream: { paint: "#f6eee7", fill: "#f6eee7" },
  night: { paint: "#1c0e0b", fill: "#1c0e0b" },
  // The tools teaser's diagonal ember gradient, as it runs along a section's top or bottom edge.
  ember: { paint: "linear-gradient(90deg, #f47e28 0%, #ef5f25 50%, #d9382a 100%)", fill: "ember" },
} as const;
type Tone = keyof typeof TONES;

/*
 * Three layered, softly blurred waves in the incoming colour (rising opacity) over a soft vertical blend:
 * a change of background flows in on an organic, irregular edge instead of a straight line.
 */
const WAVES = [
  { d: "M0 92 C 140 40, 260 128, 420 86 S 700 22, 860 74 S 1120 132, 1280 70 S 1480 30, 1600 66 V 240 H 0 Z", o: 0.35 },
  { d: "M0 132 C 180 96, 300 176, 470 136 S 760 82, 930 128 S 1180 186, 1340 128 S 1520 98, 1600 120 V 240 H 0 Z", o: 0.65 },
  { d: "M0 178 C 160 150, 330 212, 520 176 S 820 134, 1000 172 S 1250 222, 1420 180 S 1560 160, 1600 170 V 240 H 0 Z", o: 1 },
];

const topMask: CSSProperties = {
  maskImage: "linear-gradient(to bottom, #000 15%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to bottom, #000 15%, transparent 100%)",
};

export function SectionFade({ from, to, className }: { from: Tone; to: Tone; className?: string }) {
  const gradId = `fade-ember-from-${from}`;
  const strong = from !== to && (["night", "ember"] as Tone[]).some((t) => t === from || t === to);
  return (
    <div aria-hidden className={cn("relative overflow-hidden", strong ? "h-36 md:h-56" : "h-20 md:h-28", className)} style={{ background: TONES[to].paint }}>
      <div className="absolute inset-0" style={{ background: TONES[from].paint, ...topMask }} />
      <svg viewBox="0 0 1600 240" preserveAspectRatio="none" className="absolute inset-0 h-full w-full blur-[6px] md:blur-[10px]">
        {to === "ember" && (
          <defs>
            <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#f47e28" />
              <stop offset="0.5" stopColor="#ef5f25" />
              <stop offset="1" stopColor="#d9382a" />
            </linearGradient>
          </defs>
        )}
        {WAVES.map((w) => (
          <path key={w.o} d={w.d} fill={to === "ember" ? `url(#${gradId})` : TONES[to].fill} opacity={w.o} />
        ))}
      </svg>
      {/* hide the blurred bottom edge so the next section starts cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-3" style={{ background: TONES[to].paint }} />
    </div>
  );
}
