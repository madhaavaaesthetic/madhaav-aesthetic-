import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { BookingWidget } from "@/components/sections/BookingWidget";
import { ClinicCard } from "@/components/sections/LocalBlock";
import { VideoCard } from "@/components/ui/VideoCard";
import { Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { cities } from "@/data/locations";
import { branches, site, telLink } from "@/lib/site";
import { clinicLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book an Appointment Online – Hair & Skin Clinic in Berhampur, Thane, Bhiwadi | Madhaav",
  description: `Book a hair or skin consultation on WhatsApp or call ${site.phoneDisplay}. Clinics in Berhampur, Thane West and Bhiwadi, open daily 10–1 & 4–8. Free consultation Wednesdays.`,
  path: "/contact",
  keywords: ["book hair transplant consultation", "hair clinic contact", "dermatologist appointment", "Madhaav Aesthetic phone number"],
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Online booking"
        title="Book your appointment in 1 minute"
        lead={
          <p>
            Choose your clinic, pick a date and time, and you&apos;re done. You&apos;ll get a confirmation by email and a call from our team. Prefer to talk? Call{" "}
            <a href={telLink()} className="text-vermilion link-underline">{site.phoneDisplay}</a>. Open every day, 10 am – 1 pm and 4 pm – 8 pm.
          </p>
        }
      />
      <section className="pb-16">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <BookingWidget />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <VideoCard src="/videos/free-wednesday-consultation.mp4" poster="/videos/free-wednesday-consultation.webp" title="Pocket-free Wednesday" caption="Free consultations every Wednesday. Call ahead to confirm." aspect="aspect-video" sound />
            <div className="mt-5 rounded-[1.75rem] bg-night p-8 text-shell">
              <p className="eyebrow text-ember">Call a clinic directly</p>
              <ul className="mt-5 space-y-4">
                {branches.map((b) => (
                  <li key={b.slug} className="flex items-center justify-between gap-4 border-b border-shell/10 pb-4 last:border-0 last:pb-0">
                    <span className="text-shell/70">{b.label}</span>
                    <a href={telLink(b.phone)} className="font-semibold link-underline">{b.phoneDisplay}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-shell py-16">
        <div className="wrap">
          <h2 className="font-display text-title text-cocoa">Visit us</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cities
              .filter((c) => c.clinic.verified)
              .map((c) => (
                <ClinicCard key={c.slug} city={c} />
              ))}
          </div>
        </div>
      </section>
      <JsonLd data={branches.map(clinicLd)} />
    </>
  );
}
