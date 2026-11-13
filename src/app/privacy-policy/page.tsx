import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({ title: "Privacy Policy | Madhaav Aesthetic", description: "How Madhaav Aesthetic & Cure Vibe Clinics handles your personal and health information.", path: "/privacy-policy" });

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy" updated="12 November 2026">
      <p>This policy explains how {site.legalName} (&quot;we&quot;, &quot;us&quot;) handles information when you use this website or contact our clinics.</p>
      <h2>What we collect</h2>
      <ul>
        <li>Details you choose to share when you message us on WhatsApp, call us or visit a clinic, such as your name, phone number and health concern.</li>
        <li>Anonymous technical data (browser type, pages visited) collected by our hosting provider for security and performance.</li>
      </ul>
      <p>
        When you book online, your name, mobile number, optional email, chosen clinic, date and time, treatment of interest and any notes are sent securely by email to
        our clinic team, and a confirmation is emailed to you if you gave an address. You must tick the consent box before booking. We do not keep these details in a
        separate database on this website.
      </p>
      <h2>Cookies</h2>
      <p>
        This website uses only essential browser storage, plus Google Maps if you allow it. See our <Link href="/cookie-policy">Cookie Policy</Link> for details and to change
        your choice.
      </p>
      <h2>How we use it</h2>
      <ul>
        <li>To respond to your enquiry and schedule appointments.</li>
        <li>To provide medical care, maintain clinical records as required by law, and follow up on treatment.</li>
      </ul>
      <h2>Sharing</h2>
      <p>We do not sell your data. Information is shared only with the clinicians involved in your care, finance partners if you apply for EMI (with your consent), or where required by law. We follow the Digital Personal Data Protection Act, 2023.</p>
      <h2>Patient images</h2>
      <p>We do not publish patient photographs or before-and-after images on this website.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete the information we hold about you by calling {site.phoneDisplay}.</p>
    </LegalPage>
  );
}
