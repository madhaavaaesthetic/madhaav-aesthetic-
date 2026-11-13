import { cn } from "@/lib/utils";

type Bald = { temple: number; frontRx: number; frontRy: number; crown: number; top?: [number, number, number] };

const STAGES: Record<number, Bald> = {
  1: { temple: 0, frontRx: 0, frontRy: 0, crown: 0 },
  2: { temple: 6, frontRx: 9, frontRy: 5, crown: 0 },
  3: { temple: 10, frontRx: 15, frontRy: 9, crown: 0 },
  4: { temple: 12, frontRx: 21, frontRy: 17, crown: 8 },
  5: { temple: 14, frontRx: 25, frontRy: 23, crown: 14 },
  6: { temple: 14, frontRx: 27, frontRy: 26, crown: 17, top: [44, 26, 34] },
  7: { temple: 16, frontRx: 30, frontRy: 30, crown: 20, top: [48, 31, 41] },
};

/** Top-down head showing Norwood stage 1–7 hair loss pattern (front of head at the top). */
export function NorwoodHead({ stage, className, active }: { stage: number; className?: string; active?: boolean }) {
  const s = STAGES[stage] ?? STAGES[1];
  const id = `nw-${stage}-${active ? "a" : "n"}`;
  return (
    <svg viewBox="0 0 100 124" className={cn("h-auto w-full", className)} role="img" aria-label={`Norwood stage ${stage}`}>
      <defs>
        <clipPath id={id}>
          <ellipse cx="50" cy="64" rx="38" ry="52" />
        </clipPath>
      </defs>
      <ellipse cx="11" cy="66" rx="4" ry="9" fill="#e8bfa8" />
      <ellipse cx="89" cy="66" rx="4" ry="9" fill="#e8bfa8" />
      <ellipse cx="50" cy="64" rx="38" ry="52" fill="#f1cdb8" />
      <g clipPath={`url(#${id})`}>
        <ellipse cx="50" cy="64" rx="38" ry="52" fill={active ? "#3a1d18" : "#5a3328"} />
        {s.temple > 0 && (
          <>
            <ellipse cx="27" cy="16" rx={s.temple} ry={s.temple * 1.4} fill="#f1cdb8" />
            <ellipse cx="73" cy="16" rx={s.temple} ry={s.temple * 1.4} fill="#f1cdb8" />
          </>
        )}
        {s.frontRx > 0 && <ellipse cx="50" cy="12" rx={s.frontRx} ry={s.frontRy} fill="#f1cdb8" />}
        {s.crown > 0 && <circle cx="50" cy="80" r={s.crown} fill="#f1cdb8" />}
        {s.top && <ellipse cx="50" cy={s.top[0]} rx={s.top[1]} ry={s.top[2]} fill="#f1cdb8" />}
      </g>
      <ellipse cx="50" cy="64" rx="38" ry="52" fill="none" stroke={active ? "#e23b2a" : "#c99a84"} strokeWidth={active ? 2.5 : 1.2} />
      <path d="M46 8 L50 2 L54 8" fill="none" stroke="#c99a84" strokeWidth="1.2" />
    </svg>
  );
}

export const GRAFT_TABLE: Record<number, { min: number; max: number; note: string }> = {
  1: { min: 0, max: 0, note: "No transplant usually needed. Medical therapy and regrowth treatments protect what you have." },
  2: { min: 800, max: 1500, note: "Temple recession. Often treated medically first; a small transplant can refine the hairline." },
  3: { min: 1500, max: 2200, note: "Classic receding hairline, the most common transplant stage." },
  4: { min: 2200, max: 3000, note: "Frontal loss with early crown thinning." },
  5: { min: 3000, max: 4000, note: "Front and crown thinning separated by a narrowing bridge." },
  6: { min: 4000, max: 5000, note: "Front and crown connected. Usually planned around donor capacity, sometimes over two sessions." },
  7: { min: 5000, max: 6500, note: "Advanced loss. Restoration focuses on framing the face; SMP can add the look of density." },
};
