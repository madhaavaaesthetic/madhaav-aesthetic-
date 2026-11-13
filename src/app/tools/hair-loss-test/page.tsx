import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { HairLossTest } from "@/components/tools/HairLossTest";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Hair Loss Self-Test – What's Causing My Hair Fall? | Madhaav Aesthetic",
  description: "A free 60-second hair loss self-assessment: pattern baldness, shedding, alopecia areata, scalp problems or hormonal thinning. Get suggested next steps from our trichologist.",
  path: "/tools/hair-loss-test",
  keywords: ["hair loss test", "hair fall quiz", "why is my hair falling", "hair loss causes", "hair evaluation test", "alopecia test"],
});

export default function Page() {
  return (
    <>
      <PageHero crumbs={[{ name: "Hair loss self-test", path: "/tools/hair-loss-test" }]} eyebrow="60-second self-test" title="What's behind your hair fall?" lead={<p>Six questions designed by our trichologist. Not a diagnosis, but a good place to start.</p>} />
      <section className="pb-16 md:pb-20">
        <div className="wrap">
          <HairLossTest />
        </div>
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: "Hair Loss Self-Test", url: absoluteUrl("/tools/hair-loss-test"), applicationCategory: "HealthApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" } }} />
    </>
  );
}
