/**
 * Search demand per treatment, written the way Indian patients actually type:
 * short-tail head terms, long-tail questions, and Hinglish phrasing.
 * Cost ranges are typical Indian market ranges (2026) used to answer "cost/price" searches.
 */
export interface TreatmentSearch {
  short: string[];
  long: string[];
  hinglish: string[];
  cost: { range: string; unit: string; factors: string[] };
}

export const search: Record<string, TreatmentSearch> = {
  "hair-transplant": {
    short: ["hair transplant", "hair transplant clinic", "hair transplant near me", "best hair transplant", "hair transplant cost", "hair transplant price", "hair transplant doctor", "baldness treatment"],
    long: ["best hair transplant clinic near me", "hair transplant cost per graft", "hair transplant cost for 2000 grafts", "hair transplant cost for 3000 grafts", "is hair transplant permanent", "is hair transplant painful", "hair transplant side effects", "hair transplant results after 6 months", "hair transplant on EMI", "front hairline transplant cost", "crown hair transplant"],
    hinglish: ["hair transplant kitne ka hota hai", "hair transplant ka kharcha", "ganjapan ka ilaj", "baal lagwane ka kharcha", "hair transplant ke baad kya kare"],
    cost: { range: "₹45,000 – ₹1,00,000", unit: "per procedure", factors: ["Number of grafts needed", "Donor hair quality", "Front-only or front + crown", "Medicines and PRP support included"] },
  },
  "fue-hair-transplant": {
    short: ["FUE hair transplant", "FUE transplant", "FUE hair transplant cost", "FUE clinic near me", "stitchless hair transplant"],
    long: ["FUE vs FUT which is better", "FUE hair transplant cost per graft", "FUE hair transplant recovery time", "how many grafts in one FUE session", "FUE hair transplant scar"],
    hinglish: ["FUE hair transplant kitne ka hai", "bina tanke hair transplant"],
    cost: { range: "₹35 – ₹70 per graft", unit: "per graft", factors: ["Graft count", "Punch technique", "Shaven or unshaven", "Session length"] },
  },
  "beard-transplant": {
    short: ["beard transplant", "beard transplant cost", "moustache transplant", "patchy beard treatment", "beard hair transplant near me"],
    long: ["beard transplant cost for patchy beard", "is beard transplant permanent", "beard transplant results after 3 months", "moustache transplant price", "beard transplant side effects"],
    hinglish: ["dadhi ugane ka tarika", "beard transplant kitne ka hota hai", "daadi kam aati hai to kya kare"],
    cost: { range: "₹40,000 – ₹1,20,000", unit: "per procedure", factors: ["Patches only or full beard", "Moustache included", "Number of grafts"] },
  },
  "hair-loss-treatment": {
    short: ["hair fall treatment", "hair loss treatment", "hair fall doctor near me", "trichologist near me", "hair regrowth treatment", "hair thinning treatment", "best hair clinic near me"],
    long: ["how to stop hair fall permanently", "best treatment for hair fall for men", "hair fall treatment cost", "hair fall due to dandruff treatment", "hair fall after typhoid or covid", "male pattern baldness treatment without surgery"],
    hinglish: ["baal jhadne ka ilaj", "baal jhadna kaise roke", "hair fall rokne ka tarika", "baal ugane ka ilaj", "ganjapan ka ilaj bina operation"],
    cost: { range: "₹2,000 – ₹6,000 per month (medical plan); in-clinic sessions extra", unit: "per month", factors: ["Cause found on diagnosis", "Medicines vs in-clinic therapy", "Number of sessions"] },
  },
  "female-hair-loss-treatment": {
    short: ["hair fall treatment for women", "female hair loss treatment", "PCOS hair loss treatment", "hair thinning in women", "postpartum hair loss treatment"],
    long: ["why is my hair falling so much female", "widening hair parting treatment", "hair fall after delivery treatment", "thyroid hair loss treatment for women", "best hair fall treatment for ladies"],
    hinglish: ["ladkiyon ke baal jhadne ka ilaj", "delivery ke baad baal jhadna", "PCOD me baal jhadna"],
    cost: { range: "₹2,000 – ₹6,000 per month (medical plan); sessions extra", unit: "per month", factors: ["Hormonal work-up", "Medical vs regenerative therapy", "Sessions required"] },
  },
  "prp-hair-treatment": {
    short: ["PRP hair treatment", "PRP treatment for hair", "PRP near me", "PRP hair treatment cost", "PRP therapy"],
    long: ["how many PRP sessions for hair", "PRP hair treatment side effects", "PRP hair treatment results before and after timeline", "is PRP good for hair fall", "PRP vs GFC which is better", "PRP for hair cost per session"],
    hinglish: ["PRP treatment kitne ka hota hai", "PRP se baal wapas aate hain kya", "PRP ke side effects"],
    cost: { range: "₹3,000 – ₹8,000", unit: "per session", factors: ["Single or double spin", "Micro-needling add-on", "Package of 4–6 sessions"] },
  },
  "gfc-hair-treatment": {
    short: ["GFC hair treatment", "GFC treatment", "GFC hair treatment cost", "GFC near me", "growth factor concentrate"],
    long: ["GFC vs PRP which is better", "how many GFC sessions for hair", "GFC hair treatment side effects", "GFC treatment results after 3 sessions", "GFC treatment price per session"],
    hinglish: ["GFC treatment kitne ka hota hai", "GFC se baal ugte hain kya"],
    cost: { range: "₹5,000 – ₹7,000", unit: "per session", factors: ["Kit used", "Area treated", "Package pricing"] },
  },
  "exosome-hair-treatment": {
    short: ["exosome hair treatment", "exosome therapy for hair", "Duta exosomes", "exosome hair treatment cost", "Dutexome", "Dutexome treatment"],
    long: ["exosome vs PRP for hair loss", "how many exosome sessions for hair", "exosome hair treatment side effects", "is exosome therapy good for hair fall", "c.prof 231 Dutexome", "exosomes with dutasteride for hair loss", "dutasteride mesotherapy for hair"],
    hinglish: ["exosome treatment kitne ka hai"],
    cost: { range: "₹10,000 – ₹25,000", unit: "per session", factors: ["Exosome product", "Area treated", "Combined with micro-needling"] },
  },
  "qr678-hair-treatment": {
    short: ["QR678 treatment", "QR678 Neo", "QR678 cost", "QR678 near me"],
    long: ["QR678 vs PRP which is better", "QR678 treatment side effects", "how many sessions of QR678", "QR678 hair treatment results"],
    hinglish: ["QR678 kitne ka hai"],
    cost: { range: "₹6,000 – ₹15,000", unit: "per session", factors: ["Area treated", "Number of vials", "Package pricing"] },
  },
  "alopecia-areata-treatment": {
    short: ["alopecia areata treatment", "patchy hair loss treatment", "bald patch treatment", "spot baldness treatment"],
    long: ["can alopecia areata be cured permanently", "alopecia areata treatment cost", "bald patch on beard treatment", "alopecia areata injection"],
    hinglish: ["sir me gol ganjapan ka ilaj", "baal me gol daag", "dadhi me ganjapan"],
    cost: { range: "₹1,500 – ₹5,000", unit: "per session", factors: ["Number of patches", "Injection vs topical", "Sessions required"] },
  },
  "scalp-micropigmentation": {
    short: ["scalp micropigmentation", "SMP", "hair tattoo", "SMP cost"],
    long: ["scalp micropigmentation cost", "is scalp micropigmentation permanent", "SMP vs hair transplant"],
    hinglish: ["sir pe tattoo baal jaisa"],
    cost: { range: "₹30,000 – ₹1,00,000", unit: "per course", factors: ["Area covered", "Sessions", "Scar camouflage"] },
  },
  "laser-hair-reduction": {
    short: ["laser hair removal", "laser hair reduction", "laser hair removal near me", "laser hair removal cost", "full body laser hair removal"],
    long: ["laser hair removal cost for full body", "laser hair removal for face cost", "underarm laser hair removal cost", "is laser hair removal permanent", "laser hair removal side effects", "how many sessions for laser hair removal"],
    hinglish: ["laser se baal hatane ka kharcha", "chehre ke baal hatane ka tarika", "permanent hair removal kitne ka hai"],
    cost: { range: "₹4,000 – ₹6,000", unit: "per session", factors: ["Area size", "Number of sessions", "Hair thickness and skin type"] },
  },
  hydrafacial: {
    short: ["hydrafacial", "hydrafacial near me", "hydrafacial cost", "hydrafacial price", "medifacial"],
    long: ["hydrafacial price per session", "hydrafacial benefits", "hydrafacial vs normal facial", "how often should you get a hydrafacial", "hydrafacial for acne"],
    hinglish: ["hydrafacial kitne ka hota hai", "glowing skin facial"],
    cost: { range: "₹3,000 – ₹8,000", unit: "per session", factors: ["Boosters added", "Face only or face + neck", "Package of sessions"] },
  },
  "carbon-peel": {
    short: ["carbon peel", "carbon laser facial", "laser toning", "carbon peel cost", "hollywood peel"],
    long: ["carbon peel price", "carbon peel for open pores", "carbon peel for tan removal", "carbon peel side effects"],
    hinglish: ["carbon facial kitne ka hai"],
    cost: { range: "₹2,500 – ₹6,000", unit: "per session", factors: ["Face only or face + neck", "Package of sessions"] },
  },
  "chemical-peel": {
    short: ["chemical peel", "chemical peel cost", "glycolic peel", "salicylic peel", "peel for pigmentation"],
    long: ["chemical peel for acne marks", "chemical peel side effects", "best chemical peel for Indian skin"],
    hinglish: ["chemical peel kitne ka hai", "chehre ke daag hatane ka tarika"],
    cost: { range: "₹1,500 – ₹5,000", unit: "per session", factors: ["Type of peel", "Strength", "Area"] },
  },
  "acne-treatment": {
    short: ["acne treatment", "pimple treatment", "acne scar treatment", "pimple doctor near me", "acne clinic"],
    long: ["how to remove pimples permanently", "acne scar removal cost", "hormonal acne treatment", "back acne treatment", "best treatment for pimples on face"],
    hinglish: ["pimple ka ilaj", "muhase ka ilaj", "chehre ke daag dhabbe hatane ka tarika"],
    cost: { range: "₹1,500 – ₹5,000", unit: "per session (peel / procedure)", factors: ["Acne grade", "Medicines", "Scar procedures"] },
  },
  "pigmentation-treatment": {
    short: ["pigmentation treatment", "melasma treatment", "dark spots treatment", "tan removal", "hyperpigmentation treatment", "Cosmelan peel", "Cosmelan treatment"],
    long: ["how to remove melasma permanently", "pigmentation treatment cost", "best treatment for dark spots on face", "laser for pigmentation cost", "Cosmelan peel for melasma", "Cosmelan peel cost", "is Cosmelan safe for Indian skin", "Cosmelan peel near me"],
    hinglish: ["jhaiyan ka ilaj", "chehre ke kale daag", "melasma ka ilaj"],
    cost: { range: "₹2,500 – ₹8,000", unit: "per session", factors: ["Type and depth of pigment", "Peel or laser", "Sessions required"] },
  },
  "tattoo-removal": {
    short: ["tattoo removal", "laser tattoo removal", "tattoo removal cost", "tattoo removal near me"],
    long: ["how many sessions to remove a tattoo", "tattoo removal price per session", "is laser tattoo removal painful"],
    hinglish: ["tattoo hatane ka kharcha", "tattoo kaise hataye"],
    cost: { range: "₹2,000 – ₹8,000", unit: "per session", factors: ["Tattoo size", "Ink colours", "Number of sessions"] },
  },
  "eczema-treatment": {
    short: ["eczema treatment", "skin allergy treatment", "itchy skin treatment", "dermatitis treatment", "skin doctor near me"],
    long: ["eczema treatment for adults", "eczema on hands treatment", "skin allergy doctor near me"],
    hinglish: ["khujli ka ilaj", "skin allergy ka ilaj", "eczema ka ilaj"],
    cost: { range: "Consultation-based; medicines typically ₹500 – ₹3,000 per month", unit: "per month", factors: ["Severity", "Patch testing", "Duration of treatment"] },
  },
  "psoriasis-treatment": {
    short: ["psoriasis treatment", "scalp psoriasis treatment", "psoriasis doctor", "psoriasis specialist near me"],
    long: ["can psoriasis be cured permanently", "psoriasis on scalp treatment", "psoriasis on hands and feet treatment"],
    hinglish: ["soriasis ka ilaj", "psoriasis ka ilaj"],
    cost: { range: "Consultation-based; medicines typically ₹800 – ₹4,000 per month", unit: "per month", factors: ["Extent of disease", "Topical vs systemic therapy", "Monitoring tests"] },
  },
  "fungal-infection-treatment": {
    short: ["fungal infection treatment", "ringworm treatment", "daad treatment", "jock itch treatment", "nail fungus treatment"],
    long: ["ringworm not going away", "fungal infection keeps coming back", "best treatment for fungal infection on skin"],
    hinglish: ["daad khaj khujli ka ilaj", "daad ka pakka ilaj", "fungal infection ka ilaj"],
    cost: { range: "Consultation-based; medicines typically ₹500 – ₹2,500 per month", unit: "per month", factors: ["Area involved", "Oral vs topical", "Treatment duration"] },
  },
  "ibs-treatment": {
    short: ["IBS treatment", "irritable bowel syndrome treatment", "bloating treatment", "gut health doctor"],
    long: ["IBS diet plan India", "IBS treatment without medicine", "IBS doctor near me"],
    hinglish: ["pet ki gas ka ilaj", "IBS ka ilaj"],
    cost: { range: "Consultation-based", unit: "per visit", factors: ["Tests needed", "Medicines", "Follow-ups"] },
  },
};

export const searchFor = (slug: string) => search[slug];

/** City-level phrases people type, with the city name filled in. */
export const cityQueries = (city: string) => [
  `best hair transplant in ${city}`,
  `hair transplant cost in ${city}`,
  `best dermatologist in ${city}`,
  `skin specialist in ${city}`,
  `hair fall treatment in ${city}`,
  `PRP treatment in ${city}`,
  `GFC treatment in ${city}`,
  `laser hair removal in ${city}`,
  `hydrafacial in ${city}`,
  `hair clinic near me ${city}`,
  `skin clinic near me ${city}`,
  `best hair doctor in ${city}`,
];
