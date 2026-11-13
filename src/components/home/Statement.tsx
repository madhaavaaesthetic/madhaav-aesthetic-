import { ScrubText } from "@/components/motion/ScrubText";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { branches, site } from "@/lib/site";
import { treatments } from "@/data/treatments";

/** Our approach, set as a quiet centred statement whose words light up as you scroll, with a few honest numbers below. */
export function Statement() {
  return (
    <section className="relative bg-shell py-24 md:py-36">
      <div className="wrap mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-medium text-cocoa/75 shadow-[0_8px_24px_-14px_rgba(58,29,24,0.4)]">Our approach</span>
        </Reveal>
        <ScrubText
          className="mt-8 font-display text-[clamp(1.8rem,3.9vw,3.6rem)] leading-[1.14] text-balance text-cocoa"
          text="Most hair fall and skin problems have a cause that can be found. Our doctors check your scalp and skin first, explain the problem in simple words, and only then suggest a treatment, with a clear price and no pressure."
          highlight={["cause", "explain", "price"]}
        />
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-10 border-t border-cocoa/10 pt-12 md:grid-cols-4">
          <Stat value={site.rating.value} decimals={1} suffix="★" label="Average Google rating" />
          <Stat value={site.rating.count} suffix="+" label="Google reviews" />
          <Stat value={branches.length} label="Clinics in 3 states" />
          <Stat value={treatments.length} label="Hair & skin treatments" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, decimals, suffix }: { value: number; label: string; decimals?: number; suffix?: string }) {
  return (
    <div>
      <CountUp value={value} decimals={decimals} suffix={suffix} className="font-hero text-[clamp(2.4rem,4.4vw,3.8rem)] leading-none text-cocoa" />
      <p className="mt-2 text-sm text-cocoa/70">{label}</p>
    </div>
  );
}
