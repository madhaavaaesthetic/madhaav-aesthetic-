import Link from "next/link";
import { Marquee } from "@/components/motion/Marquee";

/** Treatment names drifting under the hero; the band itself fades from the hero wash into the page colour. */
export function TreatmentMarquee({ items }: { items: { slug: string; shortName: string }[] }) {
  return (
    <div className="relative z-10 -mt-16 bg-gradient-to-b from-transparent via-shell/85 to-shell pt-14 pb-4">
      <div className="border-y border-cocoa/10 bg-white/40 py-5 backdrop-blur-md">
        <Marquee duration={60}>
          {items.map((t) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} className="group flex items-center gap-8 px-8">
              <span className="font-display text-[1.9rem] whitespace-nowrap text-cocoa/85 transition-colors group-hover:text-vermilion md:text-[2.4rem]">{t.shortName}</span>
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-ember/70" />
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
