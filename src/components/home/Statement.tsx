import Image from "next/image";
import { ScrubText } from "@/components/motion/ScrubText";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/motion/Reveal";
import { Follicle } from "@/components/brand/Strands";
import { branches, site } from "@/lib/site";
import { treatments } from "@/data/treatments";

export function Statement() {
  return (
    <section className="relative overflow-hidden bg-night py-16 text-shell md:py-24">
      <div aria-hidden className="glow -right-40 bottom-0 h-[420px] w-[520px] opacity-40" />
      <div aria-hidden className="glow -left-32 top-10 h-[320px] w-[360px] opacity-25" />
      <div className="wrap relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <Reveal>
            <Follicle className="h-16 w-16 text-shell/60" />
            <p className="eyebrow mt-6 text-ember">Our approach</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 hidden overflow-hidden rounded-[999px_999px_18px_18px] lg:block">
            <div className="relative aspect-[3/4]">
              <Image src="/images/brand-trichoscopy-scan.jpg" alt="Trichoscopy scalp scan during a hair consultation" fill sizes="22vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <ScrubText
            className="font-display text-[clamp(1.9rem,4.4vw,4.2rem)] leading-[1.08] text-balance"
            text="Most hair fall and skin problems have a cause that can be found. Our doctors check your scalp and skin first, explain the problem in simple words, and only then suggest a treatment, with a clear price and no pressure."
            highlight={["cause", "explain", "price"]}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            <Stat value={site.rating.value} decimals={1} suffix="★" label="Average Google rating" />
            <Stat value={site.rating.count} suffix="+" label="Google reviews across clinics" />
            <Stat value={branches.length} label="Clinics in 3 states" />
            <Stat value={treatments.length} label="Hair & skin treatments" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label, decimals, suffix }: { value: number; label: string; decimals?: number; suffix?: string }) {
  return (
    <div className="glass-dark rounded-[1.5rem] p-5 md:p-6">
      <CountUp value={value} decimals={decimals} suffix={suffix} className="font-hero text-[clamp(2.6rem,5vw,4.5rem)] leading-none text-shell" />
      <p className="mt-3 text-sm text-shell/60">{label}</p>
    </div>
  );
}
