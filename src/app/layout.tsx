import type { Metadata, Viewport } from "next";
import "./globals.css";
import { dmSans, playfair } from "@/lib/fonts";
import { SITE_URL, site } from "@/lib/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ActionBar } from "@/components/layout/ActionBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { JsonLd } from "@/components/ui/JsonLd";
import { BASE_OTHER_META, organizationLd, websiteLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Best Hair Transplant & Skin Clinic in Berhampur, Thane & Bhiwadi | Madhaav Aesthetic",
    template: "%s",
  },
  description: site.description,
  applicationName: site.shortName,
  authors: [{ name: "Madhaav Aesthetic & Cure Vibe Clinics" }],
  creator: site.name,
  publisher: site.name,
  category: "Health & Medical",
  formatDetection: { telephone: true, address: true, email: false },
  alternates: { canonical: SITE_URL },
  openGraph: { siteName: site.name, locale: "en_IN", type: "website" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  other: BASE_OTHER_META,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6EEE7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body>
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[400] focus:rounded-full focus:bg-cocoa focus:px-5 focus:py-3 focus:text-shell">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <ActionBar />
        <JsonLd data={[organizationLd(), websiteLd()]} />
      </body>
    </html>
  );
}
