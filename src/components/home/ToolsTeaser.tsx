import Image from "next/image";
import Link from "next/link";
import { NorwoodHead } from "@/components/brand/NorwoodHead";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { ArrowRight } from "@/components/ui/Icons";

export function ToolsTeaser() {
  return (
    <section className="relative overflow-hidden grad-ember py-16 text-shell md:py-20" aria-labelledby="tools-title">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="eyebrow text-shell/80">Free tools</p>
          <SplitReveal as="h2" id="tools-title" className="mt-5 font-display text-title">
            How many grafts would you need?
          </SplitReveal>
          <p className="mt-6 max-w-lg text-lead text-shell/85">
            Pick your Norwood stage and density goal to get an instant graft and session estimate, then send it to us on WhatsApp for a personal quote. Not sure what’s causing your hair fall? Take the 60-second self-test.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/tools/hair-graft-calculator" className="btn btn-light" data-cursor="Try it">
              Hair graft calculator <ArrowRight />
            </Link>
            <Link href="/tools/hair-loss-test" className="btn btn-ghost text-shell">
              Hair loss self-test
            </Link>
          </div>
        </div>
        <Reveal className="lg:col-span-6">
          {/* Photo card: graft planning on a tablet, with the Norwood stage picker on a frosted strip at its foot. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-40px_rgba(58,10,8,0.6)] ring-1 ring-shell/20 sm:aspect-[5/4] lg:aspect-[6/5]">
            <Image
              src="/images/brand-hair-transplant-planning.jpg"
              alt="Doctor planning the number of hair transplant grafts on a tablet with a patient"
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/25 to-transparent" />
            <span className="glass absolute top-4 left-4 rounded-full px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.14em] text-cocoa uppercase md:top-5 md:left-5">
              Free · instant estimate
            </span>
            <div className="absolute inset-x-3 bottom-3 rounded-[1.5rem] bg-white/12 p-3 ring-1 ring-white/25 backdrop-blur-md md:inset-x-5 md:bottom-5 md:p-4">
              <p className="px-1 text-[0.7rem] font-semibold tracking-[0.16em] text-shell/85 uppercase">Pick your stage</p>
              <div className="mt-2.5 grid grid-cols-7 gap-1.5 md:gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <Link
                    key={n}
                    href={`/tools/hair-graft-calculator?stage=${n}`}
                    className="group rounded-xl bg-shell/12 p-1 text-center ring-1 ring-shell/20 transition hover:-translate-y-1 hover:bg-shell/25 md:p-1.5"
                  >
                    <NorwoodHead stage={n} />
                    <span className="mt-0.5 block text-[0.58rem] font-semibold tracking-wider text-shell uppercase md:text-[0.66rem]">NW {n}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
