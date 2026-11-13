# PRD: Madhaav Aesthetic & Cure Vibe Clinics website

| | |
|---|---|
| Owner | Madhaav Aesthetic & Cure Vibe Clinics (Dr. Mannu Singgh) |
| Canonical domain | https://madhaavaaesthetic.com (linked from the clinic's Instagram bio) |
| Replaces | https://madhaav-aaesthetic.grexa.site (Grexa template) |
| Stack | Next.js 16 (App Router, static generation), Tailwind v4, GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG), Motion 14 (Framer Motion), Lenis |
| Status | v1 build |

## 1. Problem

The current site is a generic Grexa template. It has 12 service names with one-line descriptions, no doctor credentials, no results gallery, no treatment detail pages, no location pages, and no structured data beyond the template's defaults. Competitors in the same markets (Thane: Hair Revive, Derma MD, HairDoc; Mumbai: Cara, Kibo, Metamorphosis; national: Dr Batra's; Ahmedabad: Musk) rank because they publish one page per treatment, put the city in the title, H1 and URL, show doctors and results, and answer cost and pain questions in FAQs.

Madhaav has real assets the current site does not use:

- 4.8★ from 243+ Google reviews and 152 Business Profile photos, many of them real before/after results.
- Three named doctors on the clinic nameplates: Dr. Manu Singh (Trichologist & Dermatologist), Dr. Kapil Patil (MBBS, PGDMT, Hair Transplant Surgeon, Mumbai), Dr. Vinay Chouksey (MS, Laser & Cosmetic Surgeon, Mumbai).
- A broad menu: FUE hair transplant, beard transplant, PRP, GFC, Duta-exosomes, QR678 Neo, micro-pigmentation, laser hair reduction, Hydrafacial, carbon peel, acne, pigmentation/melasma, eczema, psoriasis, fungal infection, tattoo removal, IBS care.
- 0% EMI financing (SaveIN, Bajaj Finserv Health) and open 7 days.

## 2. Goals

1. **Rank locally** for hair-transplant, hair-loss and dermatology searches in four markets: Brahmapur/Berhampur (Odisha), Thane West (Maharashtra), Bhiwadi (Rajasthan) and New Delhi, plus their nearby localities.
2. **Convert** visitors to WhatsApp or phone enquiries. Target: a booking CTA visible on every screen of every page, one tap on mobile.
3. **Look premium.** The site should feel like a high-end aesthetic brand, not a clinic template, with motion on desktop and mobile.
4. **Be readable by AI assistants** (ChatGPT, Claude, Perplexity, Gemini) so the clinic is cited in AI answers: open robots rules, `llms.txt`, clean semantic HTML, complete schema.org data.

### Success metrics (90 days after launch)

- Indexed pages ≥ 90% of sitemap URLs (Google Search Console).
- Top-10 positions for "hair transplant in Berhampur", "hair clinic Berhampur", "dermatologist Berhampur", "PRP treatment Berhampur", "GFC treatment Berhampur".
- Top-20 positions for "hair transplant Thane West", "hair transplant Bhiwadi" and "GFC hair treatment Delhi" style long-tail terms.
- WhatsApp click-through ≥ 4% of sessions.
- Lighthouse mobile: Performance ≥ 85, SEO 100, Accessibility ≥ 95, Best Practices ≥ 95.

## 3. Audience

| Persona | Need | What the site must show |
|---|---|---|
| Men 22–45 with receding hairline or crown thinning | "Will it look natural, does it hurt, what does it cost, can I pay in EMI" | Hairline design, graft estimator, results, EMI, recovery timeline |
| Women with hair fall, PCOS/postpartum shedding | Non-surgical options, privacy | PRP/GFC/exosome/QR678 pages, female-specific FAQs |
| Young adults with acne, scars, pigmentation, melasma | Visible results, cost per session | Skin treatment pages, before/after, sessions |
| Patients with eczema, psoriasis, fungal infection | A doctor who treats chronic skin conditions | Clinical dermatology pages with doctor credentials |
| Families in smaller towns around Berhampur (Gopalpur, Chhatrapur, Aska, Hinjilicut) | "Is it worth travelling" | Area pages with distance and route to the clinic |

## 4. Scope

### 4.1 Pages

| Route | Purpose |
|---|---|
| `/` | Brand home: hero, statement, stats, treatments, hair-transplant journey, growth timeline, doctors, reviews, locations, tools, FAQ, CTA |
| `/treatments` | All treatments, filterable by Hair / Skin / Clinical / Wellness |
| `/treatments/[treatment]` | One page per treatment (20) with overview, candidates, procedure steps, timeline, aftercare, FAQs, related |
| `/locations` | All markets grouped by state |
| `/locations/[state]` | State hub (Odisha, Maharashtra, Rajasthan, Delhi) |
| `/[city]` | City hub (berhampur, thane, bhiwadi, new-delhi) |
| `/[city]/[treatment]` | Treatment in city (20 × 4 = 80) |
| `/[city]/[area]` | Locality hub (≈ 45 areas) |
| `/[city]/[area]/[treatment]` | Core treatment in locality (≈ 45 × 6 = 270) |
| `/doctors`, `/doctors/[doctor]` | E-E-A-T: credentials, specialities, linked treatments |
| `/results` | Illustrated "what to expect" growth timelines per treatment. No patient photos (NMC compliance, see §5) |
| `/tools/hair-graft-calculator` | Norwood stage → graft and session estimate → WhatsApp quote |
| `/tools/hair-loss-test` | 6-question self-assessment → suggested treatments |
| `/blog`, `/blog/[post]` | Educational articles targeting question keywords |
| `/about`, `/contact`, `/privacy-policy`, `/medical-disclaimer` | Trust and legal |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest` | Crawlers and AI |

### 4.2 Features

- **Booking:** a contact form that composes a WhatsApp message (name, phone, concern, city, preferred time). It needs no backend, so it is instant and spam-free. Click-to-call and a floating WhatsApp button on every page.
- **Hair graft calculator:** an interactive Norwood stage picker that estimates grafts and sessions. The output links to WhatsApp with the estimate pre-filled.
- **Hair loss self-test:** a quiz that suggests a treatment path.
- **Results timelines:** an animated month-by-month growth timeline per treatment, illustrated with SVG instead of patient photos.
- **Programmatic local SEO:** one data file per market. Pages, metadata, schema, internal links and sitemap are generated from it.

### 4.3 Motion and UX

- Preloader with the logo's hair strands drawing in, shown once per session.
- Lenis smooth scroll synced to GSAP ScrollTrigger.
- SplitText headline reveals, scroll-scrubbed word highlighting, a pinned horizontal treatment rail on desktop (vertical stack on mobile), parallax arch images, magnetic buttons, a custom cursor on fine-pointer devices, a marquee, count-up stats, an SVG follicle line that grows with scroll, and page transitions.
- `prefers-reduced-motion` disables scrubbing, pinning, the cursor and the preloader. Content is fully visible without JavaScript.
- Mobile first: 16px gutters, thumb-reach CTA bar, no horizontal overflow, tap targets ≥ 44px.

### 4.4 Visual identity (derived from the logo)

| Token | Hex | Use |
|---|---|---|
| Ember | `#F26A21` | Primary brand orange (top of logo gradient) |
| Vermilion | `#E23B2A` | Accent, CTAs (bottom of logo gradient) |
| Crimson | `#A61E22` | Follicle mark, hover states |
| Cocoa | `#3A1D18` | Text, dark sections ("AESTHETIC" wordmark) |
| Night | `#1C0E0B` | Darkest sections |
| Cream | `#F6EEE7` | Page background (logo background) |
| Shell | `#FBF7F3` | Cards |
| Sand | `#E8D6C6` | Borders, dividers |

Type: **Flaviotte** (display serif, headlines), **Harmond** Extra Bold Expanded and Semi Bold Condensed Italic (hero statements, numerals, accents), **Instrument Sans** (body, UI).

> **Licence risk:** Harmond is "free for personal use"; its Agreement.txt forbids commercial use. A commercial licence must be bought from dirtylinestudio.com before launch, or Harmond swapped for an open-licence alternative. Flaviotte's licence should also be confirmed.

## 5. Content rules

- Medical claims are factual and non-absolute: no "100% results" or "guaranteed". Every treatment page carries a short disclaimer that results vary.
- "Best" appears only inside search-intent phrases ("best hair transplant clinic in Berhampur" as a question or heading). It is not presented as an award.
- Doctor names: the brand spelling is "Dr. Mannu Singgh"; the nameplate reads "Dr. Manu Singh". The site uses the brand spelling and lists the other as an alternate name in schema so both are searchable.
- **NMC compliance (client instruction):** the National Medical Commission's professional-conduct guidelines restrict advertising by registered medical practitioners. The site uses **no before/after images, no post-procedure or "result" photos of patients, and no identifiable patients.** Outcomes are explained with timelines and illustrations. There are no self-laudatory claims ("best", "No. 1", "guaranteed").
- Google reviews appear only as each branch's verified rating and review count, with a link to read them on Google. No review excerpts or patient testimonials are reproduced on the site, because NMC guidance discourages testimonial-style advertising.
- Images come from the clinic's own Google Business Profile: clinic interior, signage, operation theatre and doctor nameplates.

## 6. Open items for the client

1. **Branches (resolved from the Google Business Profiles the client shared).**
   - Berhampur: Rm No. 36, BDA Complex, New Bus Stand, Aurobinda Nagar, Brahmapur 760004 · 091160 04333 · 4.8★ (243)
   - Thane West: Shop No. 5, Nakhwa Enclave, opp. Naupada Police Station, Vishnu Nagar, Thane West 400602 · 097697 65901 · 5.0★ (14) · HFR ID IN2710050569
   - Bhiwadi: First Floor, D-11, Madhav Marg, Bhagat Singh Colony, U.I.T., Bhiwadi 301019 · 091160 04222 · 4.9★ (43)
   - New Delhi: no clinic. City pages are honest that Delhi patients are seen at Bhiwadi (about 1 hour via NH-48) and that WhatsApp consultations are available. No LocalBusiness schema is published for Delhi. When a Delhi clinic opens, add it to `branches` in `src/lib/site.ts` and set `clinic.verified = true`.
2. **Bhiwadi, Rajasthan** is confirmed as the Rajasthan target. Bhiwandi (Maharashtra) is also covered as a Thane locality.
3. **Phone numbers.** Each branch uses its Business Profile number. 9116004333 is the brand-wide WhatsApp. The older signboard numbers (9337339712, 9777922377) are listed as alternates only. Confirm whether they are still active.
4. **Videos.** Google's signed-out view exposes one video per profile: an FUE extraction clip (Berhampur, used on transplant pages) and the "Pocket-Free Wednesday" promo (Bhiwadi, used on the Bhiwadi and contact pages). Thane has no videos. For the full video library, the client can export the originals from the Business Profile dashboard and drop them into `public/videos`.
5. **Homoeopathy.** The Bhiwadi promo mentions a homoeopath. Confirm whether homoeopathy is a service; it is not listed on the site yet.
6. **Pricing.** No prices are published, so the calculator shows grafts and sessions and asks for a quote on WhatsApp.
7. **Fonts.** Harmond commercial licence (see 4.4).
8. **Promotions.** "Free Wednesday consultation" is shown because it appears in the clinic's own Business Profile video. Promotional offers can also fall under NMC advertising rules, so the client should confirm.
9. **Stock photos.** Several Business Profile images look like stock photography (model portraits, posed procedures). They are used only as atmospheric imagery. Confirm the clinic holds licences for them, or replace them with clinic photography.

## 7. Out of scope (v1)

Online payments, patient login, CMS, multilingual pages (Odia/Hindi keywords are included in copy), and a real booking calendar.
