# Implementation plan

Built in this order. Each phase leaves the site buildable.

## Phase 0: Foundation
- Next.js 16 App Router with TypeScript and Tailwind v4. Cache Components are off (the site is fully static, so classic SSG with `generateStaticParams` and `dynamicParams = false` is used).
- Fonts: Flaviotte and Harmond self-hosted via `next/font/local`; Instrument Sans via `next/font/google`.
- Design tokens in `globals.css` (`@theme`): colours from the logo, type scale, radii, easing curves.
- `src/lib/site.ts`: the single source of truth for NAP, hours, phones, rating, socials and domain.

## Phase 1: Data layer (`src/data`)
- `treatments.ts`: 20 treatments with category, keywords, long-form content, steps, timeline, aftercare, FAQs, related treatments and images.
- `locations.ts`: 4 states, 4 city hubs and about 70 localities with distances, routes, landmarks, climate notes, language terms and a clinic `verified` flag.
- `doctors.ts`, `reviews.ts`, `results.ts`, `posts.ts`, `faqs.ts`.
- `src/lib/seo.ts`: title/description builders, canonical URLs, JSON-LD builders, deterministic variant picker.

## Phase 2: Motion system (`src/components/motion`)
- `SmoothScroll`: Lenis driven by the GSAP ticker; ScrollTrigger updated from Lenis.
- `Preloader`: logo strands drawn with DrawSVG plus a counter, shown once per session.
- `SplitReveal`: SplitText line and word reveal on scroll.
- `ScrubText`: scroll-scrubbed word highlighting.
- `Parallax`, `Magnetic`, `Cursor`, `Marquee`, `CountUp`, `RevealImage` (clip-path arch reveal).
- `PageTransition`: Motion `AnimatePresence` curtain wipe in `template.tsx`.
- Everything checks `prefers-reduced-motion` and fine-pointer media queries.

## Phase 3: Layout
- Header: transparent over the hero, then a condensed glass bar; full-screen menu with staggered links and a treatment preview.
- Floating action bar on mobile (Call · WhatsApp · Book); floating WhatsApp button on desktop.
- Footer: giant wordmark, NAP, hours, link mesh (all cities, core treatments, tools) and a map link.

## Phase 4: Home page sections
Hero → Statement (scrub) → Stats → Treatment rail (pinned horizontal) → Transplant journey (sticky steps + growing follicle line) → Growth timeline (SVG, no patient photos, per NMC) → Doctors → Why Madhaav (bento) → Reviews (dual marquee) → Locations (hover list) → Tools CTA → FAQ → Final CTA.

## Phase 5: Templates
- Treatment detail, treatment index with filters.
- City hub, city × treatment, locality hub, locality × treatment. One shared `LocalTreatmentPage` component fed by data.
- Locations index and state hubs.
- Doctors, results, about, contact, blog, legal, 404.

## Phase 6: Tools
- Hair graft calculator (Norwood I–VII picker with SVG heads, density slider, output with WhatsApp handoff).
- Hair loss self-test (stepper with Motion transitions, scoring, recommended treatments).

## Phase 7: SEO infrastructure
- `generateMetadata` on every route; `metadataBase`; Open Graph images via `opengraph-image.tsx`.
- JSON-LD on every page.
- `sitemap.ts`, `robots.ts` (all AI bots allowed), `llms.txt` and `llms-full.txt` route handlers, `manifest.ts`.

## Phase 8: QA
- `next build` passes with every route prerendered.
- Playwright screenshots at 390px, 768px and 1440px; check for horizontal overflow, console errors and the reduced-motion path.
- Lighthouse pass on home, one treatment page and one city × treatment page.

## Deploy
Vercel or Cloudflare (OpenNext). Set `NEXT_PUBLIC_SITE_URL=https://madhaavaesthetic.com`. After deploy: submit the sitemap in Search Console and Bing Webmaster Tools, update the Google Business Profile website link, and create Business Profiles for each verified branch.
