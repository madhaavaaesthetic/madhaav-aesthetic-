import Link from "next/link";
import { branches, site, telLink, whatsappLink } from "@/lib/site";
import { cities } from "@/data/locations";
import { coreTreatments, treatments } from "@/data/treatments";
import { Strands } from "@/components/brand/Strands";
import { ArrowUpRight, Instagram, Pin, Star, WhatsApp } from "@/components/ui/Icons";

export function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-night text-shell">
      <Strands className="absolute -top-40 -right-40 h-[780px] w-[780px] opacity-25" id="foot-grad" />
      <div className="wrap relative pt-16 pb-28 md:pt-20 md:pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-ember">Book a consultation</p>
            <p className="mt-5 font-display text-title text-shell">
              Book your hair or
              <br />
              <span className="font-accent italic text-ember">skin consultation</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappLink("Hi Madhaav Aesthetic, I'd like to book a consultation.")} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsApp /> WhatsApp {site.phoneDisplay}
              </a>
              <Link href="/contact" className="btn btn-ghost text-shell">
                All contact options <ArrowUpRight />
              </Link>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-shell/70">
              <Star className="text-ember" /> {site.rating.value} average across {site.rating.count} Google reviews
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {branches.map((b) => (
              <address key={b.slug} className="not-italic text-sm leading-relaxed">
                <p className="eyebrow mb-3 text-ember">{b.label}</p>
                <p className="text-shell/75">
                  {b.street}, {b.locality}, {b.city}, {b.region} {b.postalCode}
                </p>
                <a href={telLink(b.phone)} className="mt-3 block text-shell link-underline w-fit">
                  {b.phoneDisplay}
                </a>
                <a href={b.directionsUrl} target="_blank" rel="noopener" className="mt-2 inline-flex items-center gap-1.5 text-shell/70 underline decoration-shell/30 underline-offset-4 hover:text-ember">
                  <Pin /> Directions
                </a>
                <p className="mt-3 text-shell/65">Mon–Sun · 10–1 & 4–8</p>
              </address>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-10 border-t border-shell/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <FooterCol title="Hair">
            {treatments.filter((t) => t.category.startsWith("hair")).map((t) => (
              <FooterLink key={t.slug} href={`/treatments/${t.slug}`}>{t.shortName}</FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Skin">
            {treatments.filter((t) => !t.category.startsWith("hair")).map((t) => (
              <FooterLink key={t.slug} href={`/treatments/${t.slug}`}>{t.shortName}</FooterLink>
            ))}
          </FooterCol>
          <FooterCol title="Locations">
            {cities.map((c) => (
              <FooterLink key={c.slug} href={`/${c.slug}`}>{c.displayName}, {c.state}</FooterLink>
            ))}
            <FooterLink href="/locations">All areas we serve</FooterLink>
          </FooterCol>
          <FooterCol title="Explore">
            <FooterLink href="/doctors">Our doctors</FooterLink>
            <FooterLink href="/tools/hair-graft-calculator">Hair graft calculator</FooterLink>
            <FooterLink href="/tools/hair-loss-test">Hair loss self-test</FooterLink>
            <FooterLink href="/results">What results to expect</FooterLink>
            <FooterLink href="/blog">Journal</FooterLink>
            <FooterLink href="/about">About Madhaav</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/site-map">Sitemap: all pages</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-14 border-t border-shell/10 pt-10">
          <p className="eyebrow mb-5 text-shell/65">Popular searches</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[0.82rem] text-shell/65">
            {cities.flatMap((c) =>
              coreTreatments.slice(0, 5).map((t) => (
                <li key={`${c.slug}-${t.slug}`}>
                  <Link href={`/${c.slug}/${t.slug}`} className="hover:text-ember">
                    {t.shortName} in {c.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        <Wordmark />

        <div className="mt-8 flex flex-col gap-4 border-t border-shell/10 pt-6 text-xs text-shell/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. Information on this site is educational and does not replace a medical consultation. Individual results vary.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy-policy" className="hover:text-shell">Privacy</Link>
            <Link href="/medical-disclaimer" className="hover:text-shell">Medical disclaimer</Link>
            <Link href="/site-map" className="hover:text-shell">Sitemap</Link>
            <a href={site.instagram} target="_blank" rel="noopener" aria-label="Instagram" className="text-lg hover:text-ember">
              <Instagram />
            </a>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3 border-t border-shell/10 pt-6 text-xs tracking-wide text-shell/65">
          <span>Designed and developed by</span>
          {/* eslint-disable-next-line @next/next/no-img-element -- tiny static credit mark */}
          <img src="/images/crayora-logo-white.webp" alt="Crayora" width={149} height={48} loading="lazy" decoding="async" className="crayora-glow h-7 w-auto md:h-8" />
        </div>
      </div>
    </footer>
  );
}

/** Brand wordmark drawn as SVG and stretched to the container width, so it is never clipped. */
function Wordmark() {
  return (
    <svg viewBox="0 52 845 176" className="mt-16 block h-auto w-full select-none opacity-90" role="img" aria-label="Madhaav">
      <defs>
        <linearGradient id="wordmark-grad" x1="0" y1="0" x2="845" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F58A2A" />
          <stop offset="0.5" stopColor="#E23B2A" />
          <stop offset="1" stopColor="#A61E22" />
        </linearGradient>
      </defs>
      <text x="0" y="217" textLength="841" lengthAdjust="spacingAndGlyphs" fill="url(#wordmark-grad)" style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 200 }}>
        Madhaav
      </text>
    </svg>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4 text-ember">{title}</p>
      <ul className="space-y-2 text-sm text-shell/70">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-underline hover:text-shell">
        {children}
      </Link>
    </li>
  );
}
