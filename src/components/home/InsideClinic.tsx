import Image from "next/image";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { VideoCard } from "@/components/ui/VideoCard";
import { ParallaxImage } from "@/components/motion/ParallaxImage";

const photos = [
  { src: "/images/thane-clinic-reception.jpg", alt: "Reception at the Madhaav Aesthetic clinic in Thane West", label: "Thane West · Reception" },
  { src: "/images/bhiwadi-laser-room.jpg", alt: "Laser treatment room at the Bhiwadi clinic", label: "Bhiwadi · Laser suite" },
  { src: "/images/clinic-reception.jpg", alt: "Reception at the Berhampur clinic", label: "Berhampur · Front desk" },
  { src: "/images/bhiwadi-patient-lounge.jpg", alt: "Patient lounge at the Bhiwadi clinic", label: "Bhiwadi · Lounge" },
];

export function InsideClinic() {
  return (
    <section className="relative overflow-hidden bg-night py-16 text-shell md:py-24" aria-labelledby="inside-title">
      <div className="wrap">
        <SectionHead tone="dark" eyebrow="Inside Madhaav" title={<span id="inside-title">Inside our clinics</span>} lead="Real photos and videos from our clinics in Berhampur, Thane West and Bhiwadi." />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-5">
          <Reveal className="col-span-2 md:col-span-7">
            <ParallaxImage src="/images/thane-clinic-storefront-naupada.jpg" alt="Madhaav Aesthetic & Cure Vibe Clinic storefront in Naupada, Thane West" className="aspect-[4/3] rounded-[1.75rem]" sizes="(max-width:768px) 95vw, 58vw" />
            <p className="mt-3 text-sm text-shell/60">Thane West · Nakhwa Enclave, opposite Naupada Police Station</p>
          </Reveal>
          <Reveal className="col-span-1 md:col-span-2 md:self-end" delay={0.1}>
            <VideoCard src="/videos/fue-extraction-berhampur.mp4" poster="/videos/fue-extraction-berhampur.webp" title="Berhampur OT" caption="FUE extraction" />
          </Reveal>
          <Reveal className="col-span-1 md:col-span-3 md:self-end" delay={0.2}>
            <div className="relative aspect-[3/4] overflow-hidden rounded-[999px_999px_1.5rem_1.5rem]">
              <Image src="/images/bhiwadi-clinic-storefront.jpg" alt="Madhaav Aesthetic clinic entrance in Bhiwadi" fill sizes="(max-width:768px) 48vw, 24vw" className="object-cover" />
            </div>
            <p className="mt-3 text-sm text-shell/60">Bhiwadi · Madhav Marg, U.I.T.</p>
          </Reveal>

          <Reveal className="col-span-2 md:col-span-5" delay={0.05}>
            <VideoCard
              src="/videos/free-wednesday-consultation.mp4"
              poster="/videos/free-wednesday-consultation.webp"
              title="Pocket-free Wednesday"
              caption="Free consultations on Wednesdays (Bhiwadi)"
              aspect="aspect-video"
              sound
            />
          </Reveal>
          <Reveal group stagger={0.08} className="col-span-2 grid grid-cols-2 gap-4 md:col-span-7 md:grid-cols-4 md:gap-5">
            {photos.map((p) => (
              <figure key={p.src}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width:768px) 46vw, 15vw" className="object-cover transition-transform duration-[1.2s] hover:scale-110" />
                </div>
                <figcaption className="mt-2 text-xs text-shell/65">{p.label}</figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
