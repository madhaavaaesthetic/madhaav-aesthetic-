import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { Calendar, Clock, Scalpel, Scope, Shield, Wallet } from "@/components/ui/Icons";
import { site } from "@/lib/site";

export function WhyBento() {
  return (
    <section className="bg-shell py-16 md:py-24" aria-labelledby="why-title">
      <div className="wrap">
        <SectionHead eyebrow="Why Madhaav" title={<span id="why-title">Why patients choose Madhaav Aesthetic</span>} lead="Doctor-led care, clear pricing and three clinics open every day." />
        <Reveal group stagger={0.08} className="mt-12 grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6 md:gap-5">
          <Tile className="md:col-span-3 md:row-span-2 bg-night text-shell" icon={<Scope />} title="Diagnosis before treatment" dark>
            Every hair plan starts with trichoscopy and, where needed, blood work. Thyroid, iron, vitamin D, PCOS and scalp infections are all checked, so you pay for what will help.
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src="/images/brand-trichoscopy-scan.jpg" alt="Doctor scanning the scalp with a trichoscope" fill sizes="(max-width:768px) 90vw, 45vw" className="object-cover" />
            </div>
          </Tile>
          <Tile className="md:col-span-3 grad-ember text-shell" icon={<Scalpel />} title="Surgeons from Mumbai" dark>
            FUE hair transplants by Dr. Kapil Patil (MBBS, PGDMT), with laser protocols set by Dr. Vinay Chouksey (MS).
          </Tile>
          <Tile className="md:col-span-2 bg-cream" icon={<Wallet />} title="0% EMI options">
            Spread the cost of a transplant or treatment course through {site.emiPartners.join(" & ")} (subject to approval).
          </Tile>
          <Tile className="md:col-span-1 bg-blush" icon={<Clock />} title="Open 7 days">
            10–1 & 4–8, every day.
          </Tile>
          <Tile className="md:col-span-2 bg-cream" icon={<Calendar />} title="Free consult Wednesdays">
            Talk through your concern with no consultation fee on Wednesdays. Call ahead to book.
          </Tile>
          <Tile className="md:col-span-2 bg-blush" icon={<Shield />} title="Registered & transparent">
            Thane clinic listed on India’s Health Facility Registry (HFR ID IN2710050569). Written plans, no hidden add-ons.
          </Tile>
          <Tile className="md:col-span-2 bg-cream" icon={<Scope />} title="Hair, skin & wellness">
            One team for hair fall, transplants, lasers, acne, pigmentation, eczema, psoriasis and gut-skin wellness.
          </Tile>
        </Reveal>
      </div>
    </section>
  );
}

function Tile({ className, icon, title, children, dark }: { className?: string; icon: React.ReactNode; title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-[1.75rem] p-7 md:p-8 ${className}`}>
      <span className={`grid h-12 w-12 place-items-center rounded-full text-2xl transition-transform duration-700 group-hover:rotate-[20deg] ${dark ? "bg-shell/10 text-shell" : "bg-shell text-vermilion"}`}>{icon}</span>
      <h3 className="mt-6 font-display text-[1.7rem] leading-tight">{title}</h3>
      <div className={`mt-3 text-[0.95rem] leading-relaxed ${dark ? "text-shell/75" : "text-cocoa/70"}`}>{children}</div>
    </article>
  );
}
