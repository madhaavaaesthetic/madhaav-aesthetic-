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
        <Reveal group stagger={0.07} className="grid grid-cols-4 gap-3 sm:grid-cols-7 lg:col-span-6">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <Link key={n} href={`/tools/hair-graft-calculator?stage=${n}`} className="group rounded-2xl bg-shell/10 p-2.5 text-center ring-1 ring-shell/15 backdrop-blur transition hover:-translate-y-1 hover:bg-shell/20">
              <NorwoodHead stage={n} />
              <span className="mt-1 block text-[0.7rem] font-semibold tracking-wider uppercase">NW {n}</span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
