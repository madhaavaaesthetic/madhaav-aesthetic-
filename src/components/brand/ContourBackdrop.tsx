import { cn } from "@/lib/utils";

/**
 * Soft concentric contour lines over a warm radial wash — the quiet, premium backdrop used behind the home hero
 * and page headers. The lines are one cached SVG file that slowly drifts (CSS only, compositor-friendly).
 */
export function ContourBackdrop({ className, intensity = "full" }: { className?: string; intensity?: "full" | "soft" }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="contour-wash absolute inset-0" />
      {/* eslint-disable-next-line @next/next/no-img-element -- decorative static SVG, no optimisation needed */}
      <img
        src="/images/contours.svg"
        alt=""
        width={1000}
        height={1000}
        decoding="async"
        className={cn(
          "contour-lines absolute top-[46%] left-1/2 h-[max(118vh,118vw)] w-[max(118vh,118vw)] max-w-none",
          intensity === "soft" ? "opacity-55" : "opacity-100"
        )}
      />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-shell/70 to-transparent" />
    </div>
  );
}
