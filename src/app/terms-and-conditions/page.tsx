import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms & Conditions | Madhaav Aesthetic",
  description: "Terms for booking, treatments and payments at Madhaav Aesthetic & Cure Vibe Clinics.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return (
    <LegalPage title="Terms & Conditions" path="/terms-and-conditions" updated="18 November 2026">
      <p>
        These terms apply to this website and to services provided by {site.legalName} (&quot;we&quot;, &quot;us&quot;) at our clinics in Berhampur (Odisha), Thane West
        (Maharashtra) and Bhiwadi (Rajasthan). By booking an appointment or paying us, you agree to them.
      </p>
      <h2>Our services</h2>
      <p>
        We provide dermatology, hair restoration and aesthetic consultations, procedures and related skin and hair-care products, delivered in person at our clinics. Every
        treatment is preceded by a consultation; the doctor decides whether a treatment is suitable for you.
      </p>
      <h2>Appointments</h2>
      <ul>
        <li>Online bookings are requests until confirmed by the clinic. We may move or cancel a slot if a doctor is unavailable and will offer you another time.</li>
        <li>Please arrive on time. Late arrival may shorten or reschedule your session.</li>
        <li>You agree to share an accurate medical history, current medicines and allergies. Treatments may be refused if it is unsafe to proceed.</li>
      </ul>
      <h2>Prices and payments</h2>
      <ul>
        <li>Prices are in Indian Rupees and include GST unless stated otherwise. The price for your treatment is confirmed at the clinic after consultation.</li>
        <li>You can pay by cash, UPI, card, bank transfer or online through our payment partner Razorpay. Online payments are processed securely by Razorpay; we do not see or store your card details.</li>
        <li>A GST tax invoice and payment receipt are issued for every payment.</li>
        <li>Packages are valid for the period stated at purchase and are personal to the patient.</li>
      </ul>
      <h2>Cancellations and refunds</h2>
      <p>
        See our <Link href="/refund-policy">Cancellation &amp; Refund Policy</Link>.
      </p>
      <h2>Results</h2>
      <p>
        Results of medical and aesthetic treatments vary between individuals and are not guaranteed. Please read our <Link href="/medical-disclaimer">Medical Disclaimer</Link>.
      </p>
      <h2>Your information</h2>
      <p>
        We handle personal and health information as described in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India. Disputes are subject to the courts at Berhampur, Odisha.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms: call {site.phoneDisplay} or visit any of our clinics (<Link href="/contact">addresses</Link>).
      </p>
    </LegalPage>
  );
}
