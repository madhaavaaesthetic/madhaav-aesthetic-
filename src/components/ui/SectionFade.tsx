import { cn } from "@/lib/utils";

const COLORS = { shell: "#fbf7f3", cream: "#f6eee7", night: "#1c0e0b" } as const;
type Tone = keyof typeof COLORS;

/*
 * Three layered, softly blurred waves in the incoming colour (rising opacity) over a vertical gradient:
 * the change of background flows in on an organic, irregular edge instead of a straight line.
 */
const WAVES = [
  { d: "M0 92 C 140 40, 260 128, 420 86 S 700 22, 860 74 S 1120 132, 1280 70 S 1480 30, 1600 66 V 240 H 0 Z", o: 0.35 },
  { d: "M0 132 C 180 96, 300 176, 470 136 S 760 82, 930 128 S 1180 186, 1340 128 S 1520 98, 1600 120 V 240 H 0 Z", o: 0.65 },
  { d: "M0 178 C 160 150, 330 212, 520 176 S 820 134, 1000 172 S 1250 222, 1420 180 S 1560 160, 1600 170 V 240 H 0 Z", o: 1 },
];

export function SectionFade({ from, to, className }: { from: Tone; to: Tone; className?: string }) {
  const dark = from === "night" || to === "night";
  // Waves rise from the colour of the section below; flip them when fading out of a section above.
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", dark ? "h-36 md:h-56" : "h-20 md:h-28", className)}
      style={{ background: `linear-gradient(to bottom, ${COLORS[from]} 15%, ${COLORS[to]} 100%)` }}
    >
      <svg viewBox="0 0 1600 240" preserveAspectRatio="none" className="absolute inset-0 h-full w-full blur-[6px] md:blur-[10px]">
        {WAVES.map((w) => (
          <path key={w.o} d={w.d} fill={COLORS[to]} opacity={w.o} />
        ))}
      </svg>
      {/* hide the blurred bottom edge so the next section starts cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-3" style={{ background: COLORS[to] }} />
    </div>
  );
}
