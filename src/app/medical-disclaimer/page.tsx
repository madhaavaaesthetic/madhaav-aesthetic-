import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({ title: "Medical Disclaimer | Madhaav Aesthetic", description: "Information on this website is educational and does not replace a consultation with a doctor.", path: "/medical-disclaimer" });

export default function Page() {
  return (
    <LegalPage title="Medical Disclaimer" path="/medical-disclaimer" updated="12 November 2026">
      <p>The content on this website, including treatment descriptions, timelines, the hair graft calculator and the hair loss self-test, is for general education only. It is not medical advice and does not create a doctor–patient relationship.</p>
      <h2>Individual results vary</h2>
      <p>Outcomes of hair, skin and aesthetic treatments depend on many factors, including diagnosis, age, genetics, health, lifestyle and adherence to aftercare. Timelines and estimates shown on this site are typical ranges, not guarantees.</p>
      <h2>Consult a doctor</h2>
      <p>Always seek an in-person evaluation before starting any treatment. If you have a medical emergency, contact your nearest hospital immediately.</p>
      <h2>Reviews and ratings</h2>
      <p>Patient reviews shown on this website are reproduced from our public Google Business Profiles (Google-translated where written in Odia or Hindi). They describe individual experiences and are not a guarantee of results.</p>
    </LegalPage>
  );
}
