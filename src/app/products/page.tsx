import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Madhaav Aesthetic Products – Doctor-Recommended Hair & Skin Care (Coming Soon)",
  description:
    "Madhaav Aesthetic's own range of doctor-recommended hair care, scalp care and skin care products is coming soon. Message us on WhatsApp to be told first when it launches.",
  path: "/products",
  keywords: [
    "Madhaav Aesthetic products",
    "Madhaav hair care products",
    "Madhaav skin care products",
    "doctor recommended hair care products",
    "dermatologist recommended skin care",
    "hair fall shampoo and serum",
    "anti hair fall products",
    "scalp care products",
    "skin care products for pigmentation",
    "buy hair and skin care products online India",
    "trichologist recommended products",
    "Madhaav products coming soon",
  ],
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", path: "/products" }]}
        eyebrow="Madhaav products"
        title="Our products are coming soon"
        lead={
          <p>
            We are creating a range of doctor-recommended hair care, scalp care and skin care, chosen by the same doctors who treat you at our clinics. Message us on
            WhatsApp and we will tell you first when it launches.
          </p>
        }
        image="/images/brand-skincare-routine.jpg"
        imageAlt="Madhaav Aesthetic hair and skin care products, coming soon"
        waMessage="Hi Madhaav Aesthetic, please let me know when your products launch."
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/products#webpage`,
          url: `${SITE_URL}/products`,
          name: "Madhaav Aesthetic Products (Coming Soon)",
          description: "Doctor-recommended hair care, scalp care and skin care products from Madhaav Aesthetic, coming soon.",
          isPartOf: { "@type": "WebSite", name: site.name, url: SITE_URL },
          publisher: { "@type": "MedicalOrganization", name: site.legalName, url: SITE_URL },
        }}
      />
    </>
  );
}
