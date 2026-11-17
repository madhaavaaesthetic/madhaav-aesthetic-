import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Cancellation & Refund Policy | Madhaav Aesthetic",
  description: "How to reschedule or cancel appointments and how refunds work at Madhaav Aesthetic & Cure Vibe Clinics.",
  path: "/refund-policy",
});

export default function Page() {
  return (
    <LegalPage title="Cancellation & Refund Policy" path="/refund-policy" updated="18 November 2026">
      <p>We want rescheduling and refunds to be simple and fair. This policy applies to payments made at our clinics and online.</p>
      <h2>Rescheduling and cancelling appointments</h2>
      <ul>
        <li>You can reschedule or cancel an appointment free of charge up to 24 hours before it, by calling or messaging the clinic.</li>
        <li>For cancellations with less than 24 hours&apos; notice, or missed appointments, an advance paid for that session may be adjusted against a future visit instead of refunded.</li>
      </ul>
      <h2>Consultations</h2>
      <p>Consultation fees are not refundable once the consultation has taken place.</p>
      <h2>Treatments and packages</h2>
      <ul>
        <li>If the doctor decides a treatment is not suitable for you, any amount paid for it is refunded in full.</li>
        <li>
          Unused sessions of a package can be refunded on request. Sessions already taken are charged at the single-session price, and the balance is refunded.
        </li>
        <li>Instead of a refund, you may choose to keep the amount as credit with the clinic for future treatments.</li>
      </ul>
      <h2>Products</h2>
      <p>Skin and hair-care products can be returned within 7 days if unopened and in original packaging. Opened products cannot be returned for hygiene reasons.</p>
      <h2>How refunds are paid</h2>
      <ul>
        <li>Approved refunds are issued with a credit note.</li>
        <li>Online payments are refunded to the original payment method through Razorpay within 5–7 working days of approval (your bank may take a few days more).</li>
        <li>Cash, UPI and card payments made at the clinic are refunded by the same method or bank transfer within 7 working days.</li>
      </ul>
      <h2>How to request</h2>
      <p>
        Call {site.phoneDisplay} or speak to the reception at your clinic (<Link href="/contact">addresses</Link>) with your invoice number.
      </p>
    </LegalPage>
  );
}
