import Link from "next/link";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { CardStack, type StackItem } from "@/components/ui/CardStack";
import { ArrowUpRight, Calendar, Check, Clock, Scope, Shield, Wallet, WhatsApp } from "@/components/ui/Icons";
import { whatsappLink } from "@/lib/site";
import type { ReactNode } from "react";

const STEPS: { title: string; text: string; icon: ReactNode }[] = [
  { title: "Book your slot", text: "Book online in a minute, call, or message us on WhatsApp. Consultations are free on Wednesdays.", icon: <Calendar /> },
  { title: "Scalp & skin check", text: "The doctor examines your scalp or skin (trichoscopy / skin analysis) and asks about your health, medicines and family history.", icon: <Scope /> },
  { title: "Find the cause", text: "Blood tests are suggested only when needed, such as thyroid, iron, vitamin D or hormones for PCOS, so you treat the real cause.", icon: <Shield /> },
  { title: "Your plan & written price", text: "You get a clear plan, the number of sessions and a written quote, with 0% EMI options. There is no pressure to start the same day.", icon: <Wallet /> },
  { title: "Treatment & follow-ups", text: "Sessions are booked at your convenience, and progress is reviewed at follow-up visits so the plan can be adjusted.", icon: <Clock /> },
];

/** What a first visit looks like, step by step, as a fanning card stack. */
export function FirstVisit() {
  const items: StackItem[] = STEPS.map((s, i) => ({
    key: s.title,
    label: `Step ${i + 1}: ${s.title}`,
    content: (
      <>
        <div className="flex items-center justify-between">
          <span className="font-hero text-3xl text-vermilion tabular-nums sm:text-4xl">{String(i + 1).padStart(2, "0")}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-vermilion">{s.icon}</span>
        </div>
        <p className="mt-3 font-display text-[1.35rem] leading-tight sm:text-2xl">{s.title}</p>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-cocoa/75 sm:text-[0.95rem]">{s.text}</p>
      </>
    ),
  }));

  return (
    <section className="relative bg-cream py-16 md:py-24" aria-labelledby="visit-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHead
            eyebrow="Your first visit"
            title={<span id="visit-title">What happens at your first visit</span>}
            lead="A calm, unhurried consultation with a doctor. You leave knowing the cause of the problem, your options and the price."
          />
          <Reveal delay={0.1}>
            <ul className="mt-8 space-y-3 text-cocoa/80">
              {["Takes about 30–45 minutes", "Bring any old reports and a list of your medicines", "Free consultation every Wednesday (call ahead)", "Open every day, 10 am–1 pm & 4–8 pm"].map((x) => (
                <li key={x} className="flex gap-3">
                  <Check className="mt-1 shrink-0 text-vermilion" /> {x}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-dark" data-cursor="Book">
                Book a consultation <ArrowUpRight />
              </Link>
              <a href={whatsappLink("Hi Madhaav Aesthetic, I'd like to book my first consultation.")} target="_blank" rel="noopener" className="btn btn-ghost text-cocoa">
                <WhatsApp className="text-[#1f9d55]" /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal className="flex justify-center lg:col-span-7 lg:pl-8">
          <CardStack items={items} />
        </Reveal>
      </div>
    </section>
  );
}
