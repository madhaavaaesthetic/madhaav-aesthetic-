import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { GraftCalculator } from "@/components/tools/GraftCalculator";
import { Faq } from "@/components/ui/Faq";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqLd, pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const faqs = [
  { q: "How many grafts do I need for a hair transplant?", a: "It depends on your Norwood stage, the density you want and your donor supply. Roughly: Norwood 2 needs 800–1,500 grafts, Norwood 3 1,500–2,200, Norwood 4 2,200–3,000, Norwood 5 3,000–4,000, and Norwood 6–7 4,000 or more, often over two sessions." },
  { q: "How many hairs are in one graft?", a: "A graft (follicular unit) usually holds one to four hairs, about 2.1–2.3 hairs on average in Indian patients." },
  { q: "Is the calculator result my final quote?", a: "No. It is an indicative estimate. Your exact graft count and cost are confirmed after a scalp and donor examination." },
];

export const metadata: Metadata = pageMeta({
  title: "Hair Graft Calculator – How Many Grafts Do I Need? | Madhaav Aesthetic",
  description: "Free hair transplant graft calculator. Choose your Norwood stage and density goal to estimate grafts, hairs and sessions, then get a personal quote on WhatsApp.",
  path: "/tools/hair-graft-calculator",
  keywords: ["hair graft calculator", "how many grafts do I need", "norwood scale grafts", "hair transplant graft estimate", "hair transplant cost calculator"],
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: "Hair graft calculator", path: "/tools/hair-graft-calculator" }]} eyebrow="Free tool" title="Hair graft calculator" lead={<p>Three quick choices for an instant estimate of grafts, hairs and sessions.</p>} />
      <section className="pb-16">
        <div className="wrap">
          <GraftCalculator />
        </div>
      </section>
      <section className="bg-shell py-16">
        <div className="wrap max-w-4xl">
          <h2 className="font-display text-title text-cocoa">About graft estimates</h2>
          <div className="mt-8">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <JsonLd
        data={[
          faqLd(faqs),
          { "@context": "https://schema.org", "@type": "WebApplication", name: "Hair Graft Calculator", url: absoluteUrl("/tools/hair-graft-calculator"), applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } },
        ]}
      />
    </>
  );
}
