import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/sections/LegalPage";
import { CookieSettingsLink } from "@/components/layout/CookieConsent";
import { pageMeta } from "@/lib/seo";
import { site, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Cookie Policy | Madhaav Aesthetic",
  description: "Which cookies and browser storage the Madhaav Aesthetic website uses, why, and how to change your choice.",
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy" updated="14 November 2026">
      <p>
        This policy explains how the {site.legalName} website uses cookies and similar browser storage. We keep this to a minimum: the site does not use advertising
        cookies, tracking pixels or third-party analytics.
      </p>

      <h2>What are cookies?</h2>
      <p>
        Cookies and browser storage (such as local storage and session storage) are small pieces of information saved by your browser. Some are needed for a website to
        work; others are set by outside services, such as embedded maps.
      </p>

      <h2>Essential storage (always on)</h2>
      <ul>
        <li>
          <strong>Your cookie choice</strong> (<code>madhaav-cookie-consent</code>, local storage): remembers whether you allowed Google Maps, so we do not ask again on every
          page.
        </li>
        <li>
          <strong>Intro seen</strong> (<code>madhaav-intro-seen</code>, session storage): makes the opening animation play only once per browser tab. It is deleted when
          you close the tab.
        </li>
      </ul>
      <p>These are stored only in your browser. They contain no personal information and are never sent to us.</p>

      <h2>Optional: Google Maps</h2>
      <p>
        Our clinic pages can show an embedded Google Map. When a map loads, Google may set its own cookies and receive information such as your IP address, as
        described in{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">
          Google&apos;s privacy policy
        </a>
        . We load maps only if you choose &quot;Accept all&quot; or switch Google Maps on in cookie settings. Without consent you can still open any clinic in Google Maps
        with the &quot;Open in Google Maps&quot; link.
      </p>

      <h2>Booking and contact forms</h2>
      <p>
        The online booking form does not use cookies. The details you enter are sent securely to our clinic team by email so we can confirm your appointment. See our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link> for how we handle that information.
      </p>

      <h2>Changing your choice</h2>
      <p>
        You can change your choice at any time with{" "}
        <CookieSettingsLink className="font-semibold text-vermilion underline underline-offset-2" />. You can also clear or block cookies and site data in your browser
        settings; the website will still work, although maps will not load.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Call <a href={telLink()}>{site.phoneDisplay}</a> or{" "}
        <a href={whatsappLink("Hi Madhaav Aesthetic, I have a question about your cookie policy.")} target="_blank" rel="noopener">
          message us on WhatsApp
        </a>
        .
      </p>
    </LegalPage>
  );
}
