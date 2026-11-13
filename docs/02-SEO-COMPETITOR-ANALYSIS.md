# Competitor & keyword analysis

Eight competitor sites were crawled (homepages and main hair-transplant pages) in November 2026. This document records what makes them rank, where they are weak, and the keyword map the Madhaav site uses.

## 1. What each competitor does

| Competitor | Market | What helps them rank | Weaknesses we exploit |
|---|---|---|---|
| thehairrevive.in | Thane (Naupada) | City in H1 copy; "0% interest EMI"; FUE + Sapphire + beard + mustache transplant terms | No meta description; three conflicting phone numbers (NAP mismatch); thin service copy; no FAQ; generic image alt text; no location URLs |
| dermamdclinics.com | Thane (Hiranandani, Naupada) | H1 "Dermatologist Led Skin & Hair Treatments in Thane"; doctor credentials (MD Derm, MRCP); HIFU, LHR, medifacial pages; review counts | Flat URLs, no locality pages for Hiranandani or Naupada; muddled heading levels |
| hairdoc.in | Thane West, Pune, PCMC, Sambhajinagar | **City pages** (`/thane/`, `/shivajinagar-pune/`); concern pages (alopecia areata, female pattern, dandruff, grey hair); question H2s ("What happens during your first visit?"); FAQ; tricho-scan positioning | Inconsistent slugs and trailing slashes; blog link is `#`; card names don't match URLs |
| caraclinics.com | Mumbai (Santacruz) | **City in every slug** (`/treatment/sapphire-fue-hair-transplant-mumbai/`); "hair transplant in Mumbai" repeated in H1/H2s; cost FAQ with per-graft pricing; before/after; doctor profiles; 304 reviews | Several slugs drop the city; `javascript:void(0)` CTAs; empty counters; inconsistent pricing |
| kiboclinics.com | Mumbai (Khar) | **Hair graft calculator** (linkable tool); question FAQs ("Is hair transplant painful?", "How long is recovery?"); "Good vs bad hair transplant"; media logos | H1 lacks city; no city in URLs; slug mismatches |
| metamorphosis-clinic.com | Mumbai + Delhi (GK, Safdarjung) | Title "Dermatologist in Mumbai And Delhi"; wide treatment list; "near me" phrases | No branch pages (Powai, Andheri, GK only in dropdowns); conflicting URLs; unsupported "100%" claims |
| drbatras.com | National | **Hierarchical URLs** `/treatments/{category}/{condition}`; condition depth (40+ hair loss types); evaluation tests; research and media | No city targeting on main site; unexplained "91% success" claim |
| muskclinic.com | Ahmedabad | Title "Best Hair Transplant in Ahmedabad"; every H2 ends "in Ahmedabad, India"; `/procedure/hair-transplant-in-[city]/` city pages; results pages by graft count; 1,088 reviews | Inconsistent location suffixes; `?page_id=` URLs; duplicate menus |

### Patterns that rank (we copy and do better)

1. **City in title, H1, URL and the first 100 words** (Cara, Musk, Derma MD). We do this on every `/[city]/…` page.
2. **One page per treatment and per concern** (Dr Batra's, HairDoc, Kibo). We ship 20 treatment pages, each with 6+ FAQs.
3. **Question-led H2s and FAQs** on cost, pain, recovery, results and sessions (Kibo, Cara, HairDoc). These become FAQPage schema and target featured snippets and AI answers.
4. **Interactive tools** (Kibo's graft calculator, Dr Batra's evaluation tests). We ship a graft calculator and a hair-loss self-test.
5. **E-E-A-T**: named doctors with degrees, review counts, before/after results (all of them). We have three doctors and 4.8★ from 243+ reviews. **We deliberately do not use before/after images** because NMC guidelines restrict them. Competitors that do are exposed to regulatory risk. We earn the same trust with credentials, process transparency and growth timelines.
6. **EMI / affordability** (Hair Revive, Cara). Madhaav offers 0% EMI.

### Gaps nobody fills (our edge)

- **Locality pages.** None of the eight has crawlable pages for Hiranandani Estate, Ghodbunder Road, Gopalpur, Dharuhera or Lajpat Nagar. We generate them with real distance and route context.
- **Consistent NAP and full schema.** Competitors have NAP conflicts and missing meta descriptions. We generate both from one data source.
- **AI crawler access.** None publishes `llms.txt`. We do, and we allow GPTBot, ClaudeBot, PerplexityBot, Google-Extended and the rest.
- **Regional-language terms.** The Berhampur signboard uses Odia ("କେଶ ପ୍ରତିରୋପଣ", "କେଶ ଝଡ଼ିବା ଚିକିତ୍ସା"). We add Odia and Hindi search phrases on the relevant city pages.

## 2. Keyword map

### 2.1 Head terms (short form) × modifiers

Each treatment is combined with each city modifier, and each produces a page.

| Treatment cluster | Short-form terms |
|---|---|
| Hair transplant | hair transplant, hair transplant clinic, FUE hair transplant, hair transplant cost, hair transplant surgeon, hairline transplant |
| Beard | beard transplant, beard hair transplant, moustache transplant |
| Hair loss (non-surgical) | hair loss treatment, hair fall treatment, baldness treatment, hair regrowth treatment, hair density treatment, trichologist |
| PRP | PRP hair treatment, PRP therapy for hair, platelet rich plasma hair |
| GFC | GFC hair treatment, GFC therapy, growth factor concentrate |
| Exosomes | exosome hair treatment, exosome therapy for hair loss |
| QR678 | QR678 treatment, QR678 Neo hair treatment |
| Micro-pigmentation | scalp micropigmentation, SMP for bald |
| Alopecia | alopecia areata treatment, patchy hair loss treatment |
| Laser hair reduction | laser hair removal, laser hair reduction, full body laser hair removal |
| Hydrafacial | hydrafacial, hydrafacial cost, medifacial |
| Carbon peel | carbon peel, carbon laser facial, laser toning |
| Chemical peel | chemical peel, glycolic peel |
| Acne | acne treatment, pimple treatment, acne scar treatment |
| Pigmentation | pigmentation treatment, melasma treatment, dark spots treatment, hyperpigmentation treatment |
| Tattoo removal | laser tattoo removal |
| Eczema / psoriasis / fungal | eczema treatment, psoriasis treatment, fungal infection treatment, ringworm treatment |
| Dermatologist | dermatologist, skin specialist, skin clinic, skin doctor |
| IBS | IBS treatment, irritable bowel syndrome treatment |

**Modifiers:** `in {city}`, `near me`, `best … in {city}`, `{city} cost`, `price in {city}`, `clinic in {city}`, `doctor in {city}`, `for men`, `for women`, `with EMI`.

### 2.2 Long-tail (question) terms used as H2s and FAQs

- how much does a hair transplant cost in {city}
- is hair transplant painful / how long does a hair transplant take
- how many grafts do I need for norwood {2–6}
- FUE vs FUT, which is better
- PRP vs GFC, which is better for hair fall
- how many sessions of PRP / GFC are needed
- when will I see results after a hair transplant
- does a hair transplant look natural
- can women get a hair transplant
- is QR678 better than PRP
- can alopecia areata be cured
- how many sessions of laser hair removal are needed
- is laser hair removal permanent
- hydrafacial vs carbon peel
- how to remove pigmentation and melasma permanently
- why does hair fall increase in the monsoon / humid weather
- hard water hair fall treatment (Delhi, Bhiwadi)
- 0% EMI hair transplant

### 2.3 Location targeting

| City hub | Spellings and variants used | State | Localities (each gets a page) |
|---|---|---|---|
| `/berhampur` | Berhampur, Brahmapur, Behrampur, Berhampur Odisha, Ganjam | Odisha | Gandhi Nagar, Gate Bazar, Bada Bazar, Ambapua, Lanjipalli, Gosaninuagaon, Bhapur Bazar, Kamapalli, Giri Road, Courtpeta, Ankushpur, Haladiapadar, Gopalpur, Chhatrapur, Hinjilicut, Aska, Digapahandi, Purushottampur, Khallikote, Bhanjanagar, Paralakhemundi, Ichchapuram |
| `/thane` | Thane, Thane West, Thane Mumbai | Maharashtra | Ghodbunder Road, Hiranandani Estate, Majiwada, Manpada, Kasarvadavali, Vasant Vihar, Pokhran Road, Naupada, Panchpakhadi, Wagle Estate, Kolshet Road, Kalwa, Mumbra, Bhiwandi, Kalyan, Dombivli, Mulund, Mira Road |
| `/bhiwadi` | Bhiwadi, Bhiwari, Bhiwadi Rajasthan, Alwar, Khairthal-Tijara | Rajasthan | Alwar Bypass Road, UIT Sectors, RIICO Industrial Area, Bhiwadi Phase 3, Tapukara, Chopanki, Khushkhera, Tijara, Neemrana, Dharuhera, Rewari, Gurugram |
| `/new-delhi` | New Delhi, Delhi, South Delhi, Delhi NCR | Delhi | Lajpat Nagar, South Extension, Greater Kailash, Defence Colony, Hauz Khas, Saket, Malviya Nagar, Vasant Kunj, Karol Bagh, Rajouri Garden, Janakpuri, Dwarka, Connaught Place, Rohini, Pitampura, Laxmi Nagar, Noida |

Regional terms: Odia for Berhampur ("କେଶ ପ୍ରତିରୋପଣ" hair transplant, "କେଶ ଝଡ଼ିବା ଚିକିତ୍ସା" hair fall treatment, "ଚର୍ମ ରୋଗ ଚିକିତ୍ସା" skin disease treatment) and Hindi for Thane, Bhiwadi and Delhi ("हेयर ट्रांसप्लांट", "बाल झड़ने का इलाज", "त्वचा विशेषज्ञ").

### 2.4 Title and meta templates

| Page | Title template (≤ 60 chars where possible) | H1 |
|---|---|---|
| Treatment in city | `{Treatment} in {City} – Cost, Results & Doctors \| Madhaav` | `{Treatment} in {City}` |
| City hub | `Hair Transplant & Skin Clinic in {City} \| Madhaav Aesthetic` | `Hair & skin clinic in {City}` |
| Locality | `Hair Transplant & Dermatologist near {Area}, {City} \| Madhaav` | `Hair & skin care near {Area}` |
| Locality × treatment | `{Treatment} near {Area}, {City} \| Madhaav Aesthetic` | `{Treatment} near {Area}` |
| Treatment (national) | `{Treatment}: Procedure, Cost, Results & FAQs \| Madhaav` | `{Treatment}` |

Meta descriptions are 140–160 characters and include the city, the 4.8★ rating and an action ("Book on WhatsApp").

### 2.5 Avoiding thin and duplicate content at scale

About 400 programmatic pages could look like doorway pages. The safeguards:

1. Each city has its own data: climate and water notes (coastal humidity in Berhampur and Thane, hard water and pollution in Delhi and Bhiwadi), how to reach the clinic, landmarks, spellings and local-language terms.
2. Each treatment has its own long-form content (procedure, timeline, aftercare, FAQs), which is mixed with the city context.
3. Sentence variants are chosen deterministically by a hash of the page slug, so sibling pages read differently.
4. Locality × treatment pages exist only for the six core treatments (hair transplant, PRP, GFC, hair loss treatment, laser hair reduction, Hydrafacial). Every other treatment links up to the city-level page.
5. Every page has a self-referencing canonical URL, breadcrumbs and links up, down and sideways (city ↔ treatment ↔ locality).

## 3. Technical SEO checklist

- [x] Static HTML for every page (SSG), with content present without JavaScript
- [x] `metadata` per page: title, description, canonical, Open Graph, Twitter, robots
- [x] JSON-LD: `MedicalClinic` (+ `LocalBusiness`) with `aggregateRating`, `Physician` ×3, `MedicalProcedure`/`MedicalTherapy` per treatment, `FAQPage`, `BreadcrumbList`, `WebSite`, `Article` for posts
- [x] `sitemap.xml` with every generated URL and `robots.txt` allowing all major search and AI crawlers
- [x] `llms.txt` and `llms-full.txt`
- [x] Dynamic Open Graph images per page (`next/og`)
- [x] Descriptive image file names and alt text; `next/image` with AVIF/WebP
- [x] One H1 per page; logical H2/H3; question-form H2s
- [x] Internal-link mesh: footer lists every city and core treatment; every page links to related treatments and nearby localities
- [x] `geo` meta and `areaServed` for each market
- [x] Core Web Vitals: fonts preloaded and `display: swap`, heavy animation code client-only, images lazy-loaded below the fold

## 4. Revision (12 Nov 2026): customer-intent keyword strategy

The client asked for maximum rankings with full freedom on wording. Changes:

- **"Best" modifiers** on every money page: titles and H1s read "Best {Treatment} in {City}", "Best hair transplant & skin clinic in {City}" and "Best {Treatment} near {Area}". These match the most common local query shape and are what Musk Clinic and Cara Clinics rank with.
- **Cost intent:** every treatment page now has a "How much does X cost in {place}?" section with a typical Indian price range, the factors that move the price, and a 0% EMI note. Cost FAQs (FAQPage schema) target "X cost in {city}" and "X price" searches. Ranges live in `src/data/keywords.ts`.
- **Per-treatment keyword sets** in `src/data/keywords.ts`:
  - short-tail, e.g. "hair transplant near me", "PRP treatment cost"
  - long-tail questions, e.g. "hair transplant cost for 2000 grafts", "how many PRP sessions for hair"
  - Hinglish, e.g. "baal jhadne ka ilaj", "ganjapan ka ilaj", "hair transplant kitne ka hota hai", "daad ka pakka ilaj", "jhaiyan ka ilaj"

  These feed meta keywords, "People also search for" blocks, and city-specific variants.
- **Exact-match internal links:** each city hub has a "Popular searches in {City}" block ("best hair transplant in Berhampur", "PRP treatment in Thane"…) linking to the matching city × treatment page, repeated for alias spellings (Brahmapur, Thane West, Bhiwari).
- **Real Google reviews:** 29 verbatim reviews (`src/data/reviews.ts`) appear on the home page, city hubs and treatment pages (filtered by treatment and city) and are marked up as `Review` inside each clinic's `MedicalClinic` schema. They add fresh, keyword-rich user language ("GFC sessions", "hair fall kaafi kam ho gaya", "alopecia", "melasma").
- **High-intent articles:** "Hair transplant cost in Berhampur & Odisha", "Best skin specialist in Thane West", and "Hair fall treatment in Bhiwadi, Gurugram & Delhi NCR: PRP vs GFC cost".
