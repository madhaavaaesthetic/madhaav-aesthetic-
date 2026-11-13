# Madhaav Aesthetic & Cure Vibe Clinics: website

An animated, SEO-first website for Madhaav Aesthetic's hair transplant and skin clinics in Berhampur (Odisha), Thane West (Maharashtra) and Bhiwadi (Rajasthan), with programmatic local pages for New Delhi/NCR.

Built with Next.js 16 (App Router, fully static), Tailwind CSS v4, GSAP 3.15 (ScrollTrigger, SplitText, DrawSVG), Motion (Framer Motion) and Lenis.

Planning documents are in [`docs/`](docs): the PRD, the competitor and keyword analysis, and the implementation plan.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # prerenders 588 static pages + 2 booking API routes
npm start
```

Set `NEXT_PUBLIC_SITE_URL` (default `https://madhaavaaesthetic.com`). The optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` add Search Console and Bing verification meta tags.

## Online booking

Patients book a clinic, date and 30-minute slot at `/contact`. The form is also embedded on every city page and pre-filled from `?clinic=&treatment=` links.

- `POST /api/booking` validates the request and emails a booking alert to `BOOKING_ADMIN_EMAIL` (support@madhaavaaesthetic.com) and every address listed in `BOOKING_NOTIFY_EMAILS` (set privately in `.env.local` and the hosting panel). If the patient gave an email address, they get a branded confirmation. Both emails include a calendar invite.
- Email is sent through the Hostinger Email API (`src/lib/mailer.ts`), using `HOSTINGER_MAIL_TOKEN` and `HOSTINGER_MAILBOX_ID`. These are server-only: set them in `.env.local` locally and in the hosting panel in production. See `.env.example`.
- Availability: each alert's subject carries a slot tag such as `[MDH-SLOT:berhampur:2026-11-16:19:30]`. `GET /api/booking/slots` searches the inbox for these tags and marks a slot full once it has `BOOKING_SLOT_CAPACITY` bookings (default 2). **Deleting or trashing an alert email frees that slot.**
- Email delivery takes up to about a minute, so the clinic should still confirm each booking by phone or WhatsApp. The alert email has one-tap buttons for both.

## Keywords

`src/lib/page-keywords.ts` assigns each keyword in the master list to its target page. Every page renders its keywords as a "Related searches" block and in its meta keywords. `docs/keywords-master-list.csv` and `docs/04-KEYWORD-MASTER-LIST.md` are generated from the same module, so they always match the site.

## Where content lives

| What | File |
|---|---|
| Phones, branches, addresses, ratings, hours | `src/lib/site.ts` |
| Treatments (copy, steps, timelines, FAQs) | `src/data/treatments-hair.ts`, `src/data/treatments-skin.ts` |
| Cities, localities, local FAQs | `src/data/locations.ts` |
| Doctors | `src/data/doctors.ts` |
| Blog articles | `src/data/posts.ts` |
| Programmatic copy templates (titles, intros, FAQs) | `src/lib/local-content.ts` |
| Meta tags and JSON-LD schema | `src/lib/seo.ts` |

Adding a treatment, city or locality to the data files automatically creates its pages, sitemap entries, internal links, meta tags and schema.

## Generated URLs

- `/treatments/[treatment]`: 22 treatments
- `/[city]`: berhampur, thane, bhiwadi, new-delhi
- `/[city]/[treatment]`: every treatment in every city
- `/[city]/[area]`: about 60 localities and towns
- `/[city]/[area]/[treatment]`: the 6 core treatments in every locality
- `/sitemap.xml`, `/robots.txt` (all search and AI crawlers allowed), `/llms.txt`, `/llms-full.txt`

## Compliance

There are no before/after or patient result photos, no review excerpts or testimonials, and no "best", "guaranteed" or "100%" claims, in line with NMC guidance. Outcomes are shown as illustrated timelines.

## Before launch

1. Fonts are Playfair Display + DM Sans (Google Fonts, open licence); nothing to buy.
2. Confirm licences for the stock-style images taken from the Business Profiles (files prefixed `brand-`, plus `hero-prp-hairline`, `man-healthy-hairline` and similar).
3. Confirm whether the older numbers 93373 39712 and 97779 22377 are still active.
4. After deploying, submit `/sitemap.xml` to Google Search Console and Bing, and point all three Google Business Profiles to the new domain (each branch to its own page, e.g. `/thane`).
