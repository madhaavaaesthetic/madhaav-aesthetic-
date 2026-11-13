import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";
import { Magnetic } from "@/components/motion/Magnetic";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Sprig } from "@/components/brand/Strands";
import { site, telLink, whatsappLink } from "@/lib/site";
import { ArrowUpRight, Phone, WhatsApp } from "@/components/ui/Icons";

export function FinalCta({ title = "Book your consultation today", message = "Hi Madhaav Aesthetic, I'd like to book a consultation." }: { title?: string; message?: string }) {
  return (
    <section className="relative overflow-hidden bg-cream pt-16 pb-20 md:pt-20 md:pb-28">
      <div aria-hidden>
      <Marquee duration={30} className="pointer-events-none opacity-[0.07]" pauseOnHover={false}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} data-text="Book a consultation" className="flex items-center gap-10 pr-10 font-hero text-[16vw] leading-none whitespace-nowrap text-cocoa before:content-[attr(data-text)]">
            <Sprig className="h-[6vw] w-[18vw] text-cocoa" />
          </span>
        ))}
      </Marquee>
      </div>
      <div className="wrap relative -mt-[10vw] text-center">
        <SplitReveal as="h2" className="mx-auto max-w-5xl font-display text-giant text-cocoa">
          {title}
        </SplitReveal>
        <p className="mx-auto mt-6 max-w-xl text-lead text-cocoa/70">
          Tell us your hair or skin problem. A doctor will examine you, explain your options and give you a written price. 0% EMI is available at all three clinics.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Link href="/contact" className="btn btn-primary !min-h-14 !pl-8 text-base" data-cursor="Book">
              Book appointment
              <span className="btn-ico">
                <ArrowUpRight />
              </span>
            </Link>
          </Magnetic>
          <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn btn-ghost !min-h-14 !px-8 text-base text-cocoa">
            <WhatsApp className="text-[#25D366]" /> WhatsApp us
          </a>
          <a href={telLink()} className="btn btn-dark !min-h-14 !px-8 text-base">
            <Phone /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
