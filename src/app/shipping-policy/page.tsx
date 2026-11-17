import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Service Delivery Policy | Madhaav Aesthetic",
  description: "How Madhaav Aesthetic delivers its services and products.",
  path: "/shipping-policy",
});

export default function Page() {
  return (
    <LegalPage title="Service Delivery Policy" path="/shipping-policy" updated="18 November 2026">
      <p>{site.legalName} provides medical and aesthetic services in person at our clinics. We do not ship physical goods.</p>
      <h2>Services</h2>
      <ul>
        <li>Consultations and treatments are delivered at the clinic you choose, on the date and time confirmed by the clinic.</li>
        <li>Appointment confirmations are sent by SMS, WhatsApp or email, with your booking reference.</li>
        <li>Packages are delivered as scheduled sessions within the validity stated at purchase.</li>
      </ul>
      <h2>Products</h2>
      <p>Products bought from us are handed over at the clinic. We do not offer home delivery or courier shipping.</p>
      <h2>Questions</h2>
      <p>
        Call {site.phoneDisplay} or visit a clinic (<Link href="/contact">addresses</Link>).
      </p>
    </LegalPage>
  );
}
