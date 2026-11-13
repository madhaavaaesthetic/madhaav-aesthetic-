export interface PostSection {
  h: string;
  p: string[];
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: "Hair" | "Skin" | "Guides";
  readTime: string;
  image: string;
  imageAlt: string;
  keywords: string[];
  sections: PostSection[];
  related: string[];
}

export const posts: Post[] = [
  {
    slug: "hair-transplant-cost-in-berhampur-odisha",
    title: "Hair transplant cost in Berhampur & Odisha (2026): price per graft, EMI and what's included",
    excerpt: "What a hair transplant costs in Berhampur (Brahmapur) and across Odisha, how many grafts you need, and why travelling to Bhubaneswar or Vizag isn't necessary.",
    date: "2026-11-10",
    category: "Hair",
    readTime: "6 min",
    image: "/images/brand-hair-transplant-planning.jpg",
    imageAlt: "Hair transplant cost consultation in Berhampur, Odisha",
    keywords: ["hair transplant cost in Berhampur", "hair transplant cost in Odisha", "hair transplant in Brahmapur", "best hair transplant in Odisha", "hair transplant price per graft", "hair transplant on EMI", "hair transplant kitne ka hota hai"],
    sections: [
      { h: "Quick answer", p: ["In 2026, a hair transplant in Berhampur typically costs ₹45,000 – ₹1,00,000, depending on how many grafts you need and whether the crown is included. Across India, FUE is usually priced at ₹35–₹70 per graft. At Madhaav Aesthetic you get a written graft count and a fixed quote after a scalp analysis, with 0% EMI available."] },
      { h: "Price by stage of baldness", p: ["Your Norwood stage decides most of the cost, because it decides the number of grafts."], list: ["Norwood 2 (temples): 800–1,500 grafts", "Norwood 3 (receding hairline): 1,500–2,200 grafts", "Norwood 4 (front + early crown): 2,200–3,000 grafts", "Norwood 5 and above: 3,000–4,000+ grafts"] },
      { h: "Why the cheapest quote can cost more", p: ["A very low price often means technicians doing the work instead of a surgeon, a poorly designed hairline or over-harvesting of the donor area. A failed transplant is expensive to repair. Ask who designs the hairline, who extracts the grafts, and what aftercare is included."] },
      { h: "Do you need to travel to Bhubaneswar, Vizag or Kolkata?", p: ["No. Our Berhampur clinic at the BDA Complex, New Bus Stand has its own operation theatre, and FUE procedures are performed by a hair transplant surgeon from Mumbai. Patients come from Gopalpur, Chhatrapur, Aska, Bhanjanagar, Paralakhemundi and Ichchapuram."] },
      { h: "Paying in EMI", p: ["0% EMI is available through our finance partners, subject to approval, so you can spread the cost over several months."] },
    ],
    related: ["hair-transplant", "fue-hair-transplant", "beard-transplant"],
  },
  {
    slug: "best-skin-specialist-thane-west-guide",
    title: "Looking for the best skin specialist in Thane West? 7 things to check first",
    excerpt: "How to choose a dermatologist or skin clinic in Thane (Naupada, Ghodbunder Road, Majiwada) for acne, pigmentation, laser hair removal and Hydrafacial.",
    date: "2026-11-06",
    category: "Skin",
    readTime: "5 min",
    image: "/images/thane-clinic-reception.jpg",
    imageAlt: "Reception of Madhaav Aesthetic skin and hair clinic in Thane West",
    keywords: ["best skin specialist in Thane", "dermatologist in Thane West", "skin clinic near me Thane", "laser hair removal in Thane", "hydrafacial in Thane", "acne treatment Thane"],
    sections: [
      { h: "1. A doctor examines you first", p: ["Acne, pigmentation and hair fall all have several possible causes. A good skin clinic diagnoses before it sells a package."] },
      { h: "2. Settings that suit Indian skin", p: ["Lasers and peels need to be adjusted for medium and darker skin to avoid burns and post-inflammatory darkening. Ask how they choose settings and whether they patch test."] },
      { h: "3. Transparent pricing", p: ["You should get a written quote that covers sessions, products and follow-ups. Typical Thane prices: Hydrafacial ₹3,000–₹8,000, laser hair reduction ₹4,000–₹6,000 per session, carbon peel ₹2,500–₹6,000."] },
      { h: "4. Real, recent reviews", p: ["Read Google reviews from the last six months, not just the star rating. Our Thane West clinic is rated 5.0★ on Google."] },
      { h: "5. Registration and hygiene", p: ["Check that the clinic is properly registered. Madhaav Aesthetic Thane is listed on India's Health Facility Registry (HFR ID IN2710050569)."] },
      { h: "6. Easy to reach", p: ["Our clinic is at Nakhwa Enclave, opposite Naupada Police Station, about 1 km from Thane station. It's easy to reach from Ghodbunder Road, Majiwada, Wagle Estate, Kalwa and Mulund."] },
      { h: "7. Evening and weekend slots", p: ["We are open every day, 10 am – 1 pm and 4 pm – 8 pm, including Sundays."] },
    ],
    related: ["laser-hair-reduction", "hydrafacial", "acne-treatment", "pigmentation-treatment"],
  },
  {
    slug: "hair-fall-treatment-bhiwadi-gurugram-cost",
    title: "Hair fall treatment in Bhiwadi, Gurugram & Delhi NCR: PRP vs GFC cost and results",
    excerpt: "Hard water, pollution and stress drive hair fall across NCR. What PRP and GFC cost in Bhiwadi, how many sessions you need, and what results to expect.",
    date: "2026-11-02",
    category: "Hair",
    readTime: "5 min",
    image: "/images/brand-scalp-injection-therapy.jpg",
    imageAlt: "GFC hair treatment session at the Bhiwadi clinic",
    keywords: ["hair fall treatment in Bhiwadi", "PRP treatment in Bhiwadi", "GFC treatment cost", "hair clinic near Gurugram", "hair fall treatment Delhi NCR", "baal jhadne ka ilaj"],
    sections: [
      { h: "Why hair fall is so common in NCR", p: ["Very hard groundwater, fine-dust pollution, long commutes and stress all add up. Hard water also causes breakage that looks like hair fall. A scalp examination tells the two apart."] },
      { h: "PRP vs GFC: cost and sessions", p: [], list: ["PRP: ₹3,000–₹8,000 per session, usually 4–6 sessions a month apart", "GFC: ₹5,000–₹7,000 per session, usually 3–6 sessions 4–6 weeks apart", "Exosomes: ₹10,000–₹25,000 per session for patients who plateau", "QR678 Neo: ₹6,000–₹15,000 per session, with no blood draw"] },
      { h: "What patients report", p: ["Bhiwadi patients on Google describe reduced hair fall after two GFC sessions and new baby hairs after two PRP sessions. Individual results vary, which is why progress is measured at every visit."] },
      { h: "Getting here from Delhi and Gurugram", p: ["Our Bhiwadi clinic is on Madhav Marg, Bhagat Singh Colony, U.I.T., about an hour from Gurugram and South-West Delhi via NH-48. Wednesdays include a free consultation."] },
    ],
    related: ["gfc-hair-treatment", "prp-hair-treatment", "hair-loss-treatment", "exosome-hair-treatment"],
  },
  {
    slug: "hair-transplant-cost-guide",
    title: "Hair transplant cost in India: what actually decides the price",
    excerpt: "Graft count, technique, the surgeon and aftercare: how a hair transplant quote is built in Berhampur, Thane and Bhiwadi, and the questions to ask before you pay.",
    date: "2026-10-28",
    category: "Hair",
    readTime: "7 min",
    image: "/images/brand-hair-transplant-planning.jpg",
    imageAlt: "Doctor planning a hair transplant on a tablet with a patient",
    keywords: ["hair transplant cost", "hair transplant cost in Berhampur", "hair transplant price Thane", "hair transplant cost Bhiwadi", "cost per graft", "hair transplant EMI"],
    sections: [
      { h: "Why there is no single price", p: ["The most common question we hear is \"how much does a hair transplant cost?\", and the honest answer is that it depends on you. Two people with the same bald patch can need very different numbers of grafts, because hair calibre, curl, colour contrast with the scalp and donor density all change how much coverage each graft gives.", "Most Indian clinics price by the graft (a follicular unit of one to four hairs), sometimes with a package for larger sessions. Rather than compare per-graft rates alone, compare what is included."] },
      { h: "The five things that decide your quote", p: ["When we build a quote after the scalp analysis, these are the variables:"], list: ["Number of grafts: the biggest factor, set by the size of the area and the density you want", "Donor quality: a dense, healthy donor area allows a single session", "Technique: FUE (individual extraction) is the standard; beard or body-hair donors add complexity", "The surgical team: who designs the hairline and who places the grafts", "Aftercare: medicines, clinic washes, PRP/GFC support and review visits"] },
      { h: "Rough graft ranges by stage", p: ["These ranges are a starting point, not a prescription. Your final number is set after the donor examination. You can try our hair graft calculator for a quick estimate."], list: ["Norwood 2 (temple recession): about 800–1,500 grafts", "Norwood 3 (receding hairline): about 1,500–2,200 grafts", "Norwood 4 (front + early crown): about 2,200–3,000 grafts", "Norwood 5 (larger front + crown): about 3,000–4,000 grafts", "Norwood 6–7: 4,000+ grafts, often over two sessions, depending on donor supply"] },
      { h: "Questions to ask before you book", p: ["A low headline price can hide a poor outcome. Before paying anyone, ask:"], list: ["Who will draw my hairline and who will perform the extraction?", "How many grafts per square centimetre will you place at the front?", "Is the post-operative medicine and first wash included?", "How many review visits are included in the first year?", "What happens if I need a touch-up?"] },
      { h: "Paying for it: EMI", p: ["Madhaav Aesthetic offers 0% EMI options through finance partners, subject to approval, so you can spread the cost over months. Ask about this at your consultation in Berhampur, Thane or Bhiwadi."] },
    ],
    related: ["hair-transplant", "fue-hair-transplant", "beard-transplant"],
  },
  {
    slug: "prp-vs-gfc-vs-exosomes",
    title: "PRP vs GFC vs exosomes vs QR678: which hair regrowth therapy suits you?",
    excerpt: "Four non-surgical therapies, one goal: thicker hair. How they differ, how many sessions each needs, and how a trichologist chooses.",
    date: "2026-10-14",
    category: "Hair",
    readTime: "6 min",
    image: "/images/brand-prp-gfc-qr678.jpg",
    imageAlt: "PRP, GFC and QR678 Neo preparations laid out in a clinic",
    keywords: ["PRP vs GFC", "GFC vs PRP which is better", "exosome vs PRP", "QR678 vs PRP", "best treatment for hair fall", "non surgical hair loss treatment"],
    sections: [
      { h: "They all feed the follicle, but differently", p: ["Hair thins when follicles miniaturise: each cycle produces a finer, shorter hair. Regenerative therapies try to slow or reverse that by delivering growth signals to the follicle. Where those signals come from is the main difference between them."] },
      { h: "PRP: platelet-rich plasma", p: ["Your blood is spun to concentrate platelets, which release growth factors when injected into the scalp. It is well established, made from your own blood and cost-effective. A typical course is 4–6 sessions, one month apart."] },
      { h: "GFC: growth factor concentrate", p: ["GFC is also made from your blood, but the platelets are activated before injection and the cells are removed, leaving a cell-free serum with a more concentrated dose of growth factors. It often causes less soreness and may need fewer sessions (typically 3–6)."] },
      { h: "Exosomes", p: ["Exosomes are nano-sized vesicles that carry cell-to-cell signals. Lab-prepared exosome solutions are delivered by micro-needling or injection and need no blood draw. It is a newer therapy with a developing evidence base, so we use it selectively, often for people who have plateaued on PRP or GFC."] },
      { h: "QR678 Neo", p: ["QR678 Neo is a patented peptide and growth-factor formulation developed in India. It needs no blood draw. Courses usually run 6–8 sessions, three to four weeks apart."] },
      { h: "So which one?", p: ["The right choice depends on why your hair is thinning, how long it has been happening, your scalp health and your preferences. That's why every plan at Madhaav starts with trichoscopy and, where needed, blood tests. Sometimes the answer is a combination, and sometimes it is treating dandruff or iron deficiency first."], list: ["Early, active shedding: PRP or GFC", "Needle or blood-draw anxiety: QR678 or exosomes", "Plateau on PRP: GFC or exosomes", "After a transplant: PRP or GFC to support grafts"] },
    ],
    related: ["prp-hair-treatment", "gfc-hair-treatment", "exosome-hair-treatment", "qr678-hair-treatment"],
  },
  {
    slug: "hair-transplant-recovery-timeline",
    title: "Hair transplant recovery, day by day and month by month",
    excerpt: "Scabs, shock loss and the month-four sprouting: an honest timeline of what happens after an FUE hair transplant, and what you can do at each stage.",
    date: "2026-09-30",
    category: "Hair",
    readTime: "6 min",
    image: "/images/hair-transplant-surgery-team.jpg",
    imageAlt: "Hair transplant team in the operation theatre",
    keywords: ["hair transplant recovery", "hair transplant timeline", "shock loss after hair transplant", "when will I see results after hair transplant", "is hair transplant painful"],
    sections: [
      { h: "Day 0: procedure day", p: ["FUE is done under local anaesthesia and most people go home the same evening. Expect tightness in the donor area and mild soreness, managed with prescribed medicines. Sleep with your head raised."] },
      { h: "Days 1–10: crusts and healing", p: ["Tiny crusts form around each graft. Your first gentle wash is usually done at the clinic, then at home as instructed. Mild forehead swelling can appear on days 2–4 and settles on its own. By day 10 most crusts have shed and the donor area has healed to small dots."] },
      { h: "Weeks 2–8: shock loss (don't panic)", p: ["The transplanted hair shafts fall out. This is expected: the follicles stay safely under the skin and enter a resting phase. Some people also shed some native hair around the transplanted zone temporarily."] },
      { h: "Months 3–4: the first sprouts", p: ["New hairs start to come through. They are thin and sometimes wiry at first. This is a good time to support growth with PRP or GFC if your doctor recommends it."] },
      { h: "Months 6–12: density builds", p: ["Hairs thicken and lengthen. Around half of the final density is visible by month 6, and most patients reach their mature result between months 10 and 12. Crown areas can take up to 15 months."] },
      { h: "What helps recovery", p: [], list: ["Follow the wash protocol exactly", "No helmets, tight caps or swimming for two weeks", "Avoid heavy exercise, steam and direct sun for three weeks", "Keep up medical therapy to protect your native hair", "Attend every review visit"] },
    ],
    related: ["hair-transplant", "fue-hair-transplant", "prp-hair-treatment"],
  },
  {
    slug: "monsoon-humidity-hair-fall",
    title: "Why hair fall rises in humid weather, and what to do about it",
    excerpt: "Coastal humidity in Berhampur and Thane fuels oily scalps and fungal dandruff. Here's how to tell seasonal shedding from a real problem.",
    date: "2026-08-10",
    category: "Hair",
    readTime: "5 min",
    image: "/images/brand-stress-hair-fall.jpg",
    imageAlt: "Woman worried about hair fall",
    keywords: ["hair fall in monsoon", "humidity hair fall", "dandruff hair fall", "hair fall treatment Berhampur", "hair fall treatment Thane", "seborrheic dermatitis hair loss"],
    sections: [
      { h: "Humidity and the scalp", p: ["High humidity keeps the scalp damp and oily for longer. That's ideal for Malassezia, a yeast that lives on everyone's scalp but overgrows in warm, wet conditions. The result is itchy, flaky, inflamed skin (seborrhoeic dermatitis), and inflamed follicles shed more."] },
      { h: "Seasonal shedding vs a real problem", p: ["Many people notice more hair fall from June to September. Mild seasonal shedding settles within a few weeks. See a doctor if:"], list: ["Shedding lasts more than 6–8 weeks", "Your parting is widening or your hairline is moving back", "You see round bald patches", "Your scalp is very itchy, red or scaly"] },
      { h: "A simple humid-weather routine", p: [], list: ["Wash 3–4 times a week with an anti-dandruff shampoo as advised", "Dry your scalp fully; don't tie wet hair", "Avoid heavy oils left on overnight in peak humidity", "Change pillowcases twice a week", "Eat enough protein and iron"] },
      { h: "When we step in", p: ["At our Berhampur and Thane clinics, monsoon hair fall is usually treated in two parts: control the scalp inflammation and fungus first, then strengthen the follicles with PRP or GFC if thinning persists."] },
    ],
    related: ["hair-loss-treatment", "gfc-hair-treatment", "fungal-infection-treatment"],
  },
  {
    slug: "hard-water-pollution-hair-damage",
    title: "Hard water, pollution and your hair: a guide for Delhi NCR and Bhiwadi",
    excerpt: "Is it breakage or real hair fall? How hard water and polluted air affect your scalp, and the routine that protects it.",
    date: "2026-07-22",
    category: "Hair",
    readTime: "5 min",
    image: "/images/brand-hair-care-styling.jpg",
    imageAlt: "Hair being brushed and blow-dried",
    keywords: ["hard water hair fall", "pollution hair fall", "hair fall treatment Delhi", "hair fall treatment Bhiwadi", "hard water hair damage"],
    sections: [
      { h: "What hard water does", p: ["Hard water carries calcium and magnesium that settle on the hair shaft as a film. Hair feels rough, tangles easily and snaps when combed. Much of what looks like hair fall in hard-water areas is actually breakage mid-shaft, not shedding from the root."] },
      { h: "What pollution does", p: ["Fine particulate matter and pollutants settle on the scalp and generate oxidative stress, which can inflame follicles and worsen existing shedding, especially when combined with genetic thinning, stress or deficiencies."] },
      { h: "Breakage vs shedding: a quick check", p: ["Look at the fallen hairs. A shed hair has a small white bulb at one end. A broken hair has no bulb and is often shorter. Lots of short, bulb-less pieces point to breakage."] },
      { h: "Protective routine", p: [], list: ["Use a chelating or clarifying shampoo once a week", "Finish with a conditioner on every wash", "Consider a shower filter", "Cover your hair on long two-wheeler commutes", "Wash after heavy pollution exposure"] },
      { h: "When it's more than water", p: ["If you see shed hairs with bulbs, a widening parting or a receding hairline, the cause is internal. Our Bhiwadi clinic, which is also the nearest for Delhi NCR patients, starts with trichoscopy to find it."] },
    ],
    related: ["hair-loss-treatment", "female-hair-loss-treatment", "prp-hair-treatment"],
  },
  {
    slug: "pigmentation-melasma-care",
    title: "Pigmentation and uneven skin tone: read this before you try another cream",
    excerpt: "Tan, sun spots, acne marks and melasma behave differently. Why aggressive treatment can backfire, and how dermatologists treat pigmentation safely.",
    date: "2026-08-09",
    category: "Skin",
    readTime: "6 min",
    image: "/images/brand-skin-consultation.jpg",
    imageAlt: "Dermatologist consulting a patient about her skin",
    keywords: ["pigmentation treatment", "melasma treatment", "dark spots treatment", "uneven skin tone", "pigmentation treatment Berhampur", "melasma treatment Thane"],
    sections: [
      { h: "Not all pigmentation is the same", p: ["Tan fades on its own. Post-acne marks fade over months. Sun spots persist. Melasma, the brown patches on the cheeks, forehead and upper lip that are often linked to hormones, is stubborn and easily worsened by heat and harsh treatment. Knowing which one you have changes everything."] },
      { h: "Why aggressive treatment backfires", p: ["Strong peels, harsh scrubs, unsupervised bleaching creams or high-energy lasers can inflame the skin. In Indian skin, inflammation often triggers more pigment (post-inflammatory hyperpigmentation), leaving you worse off."] },
      { h: "How we treat it", p: [], list: ["Identify the type and depth with a clinical examination and Wood's lamp", "Prime the skin with prescription medical skincare", "Add gentle peels or low-energy laser toning in a series", "Maintain with sunscreen and maintenance creams"] },
      { h: "Sunscreen is treatment", p: ["Daily broad-spectrum SPF 50, reapplied when outdoors, is the single most important step. Visible light also drives melasma, so tinted sunscreens help."] },
    ],
    related: ["pigmentation-treatment", "chemical-peel", "carbon-peel"],
  },
  {
    slug: "sensitive-allergy-prone-skin",
    title: "Managing sensitive or allergy-prone skin",
    excerpt: "Stinging, redness and rashes after new products: what sensitive skin really is, and a dermatologist's approach to calming it.",
    date: "2026-08-10",
    category: "Skin",
    readTime: "4 min",
    image: "/images/brand-skincare-routine.jpg",
    imageAlt: "Gentle skincare products and routine",
    keywords: ["sensitive skin treatment", "skin allergy treatment", "contact dermatitis", "dermatologist Berhampur", "skin specialist"],
    sections: [
      { h: "What \"sensitive skin\" usually means", p: ["Sensitive skin is a symptom, not a diagnosis. Stinging, burning, redness or rashes can come from a weakened skin barrier, rosacea, eczema or a true contact allergy to an ingredient such as fragrance, a preservative or hair dye."] },
      { h: "Barrier first", p: [], list: ["Use a gentle, non-foaming cleanser", "Moisturise twice daily with a fragrance-free product", "Introduce one new product at a time and patch test it behind the ear for 3 days", "Avoid scrubs and multiple actives at once"] },
      { h: "When to see a dermatologist", p: ["If rashes keep returning, spread, ooze, or appear after hair dye or jewellery, a consultation helps. Patch testing can identify the allergen, and short, correct treatment calms flares without steroid overuse."] },
    ],
    related: ["eczema-treatment", "fungal-infection-treatment", "hydrafacial"],
  },
  {
    slug: "laser-hair-removal-guide",
    title: "Laser hair reduction: sessions, safety for Indian skin and myths",
    excerpt: "How many sessions you really need, whether laser is safe for darker skin, and how to prepare. A practical guide.",
    date: "2026-07-05",
    category: "Skin",
    readTime: "5 min",
    image: "/images/brand-laser-hair-reduction.jpg",
    imageAlt: "Laser hair reduction session on the legs",
    keywords: ["laser hair removal", "laser hair reduction sessions", "is laser hair removal permanent", "laser hair removal for dark skin", "laser hair removal Bhiwadi", "laser hair removal Thane"],
    sections: [
      { h: "How laser works", p: ["Laser light is absorbed by pigment in the hair and turns into heat at the root, which disables the follicle's ability to regrow. Only hairs in the active growth phase respond, which is why you need a series of sessions."] },
      { h: "How many sessions?", p: ["Most people need 6–8 sessions: 4–6 weeks apart for the face and 6–8 weeks for the body. Hormonal hair (for example with PCOS) may need more, plus occasional maintenance."] },
      { h: "Is it safe for Indian skin?", p: ["Yes, when the right wavelength, energy and cooling are used. At Madhaav, settings are chosen for your skin type and a patch test is done before the first session."] },
      { h: "Myths", p: [], list: ["\"It's permanent after one session.\" No, it takes a course.", "\"It causes cancer.\" No, laser hair reduction uses non-ionising light.", "\"You can wax between sessions.\" No, only shave, so the root stays in place.", "\"It doesn't work on dark skin.\" It does, with appropriate settings."] },
      { h: "Preparation", p: [], list: ["Shave the area the day before", "No waxing, threading or bleaching for 4 weeks", "Avoid tanning for 2 weeks", "Tell us about medicines and recent sun exposure"] },
    ],
    related: ["laser-hair-reduction", "pigmentation-treatment"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
