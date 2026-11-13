"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { branches } from "@/lib/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { ArrowUpRight, Star } from "@/components/ui/Icons";

const rows = [
  ...branches.map((b) => ({
    href: `/${b.citySlug}`,
    city: b.city === "Brahmapur" ? "Berhampur" : b.city,
    state: b.region,
    line: `${b.street}, ${b.locality}`,
    rating: `${b.rating.value}★ · ${b.rating.count} reviews`,
    image: b.image,
  })),
  { href: "/new-delhi", city: "New Delhi", state: "Delhi NCR", line: "Seen at our Bhiwadi clinic · about 1 hr via NH-48", rating: "WhatsApp consults", image: "/images/bhiwadi-clinic-reception.jpg" },
];

export function Clinics() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22 });
  const sy = useSpring(y, { stiffness: 180, damping: 22 });

  return (
    <section
      className="relative bg-cream py-28 md:py-40"
      aria-labelledby="clinics-title"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
    >
      <div className="wrap">
        <SectionHead eyebrow="Clinic locations" title={<span id="clinics-title">Our clinics in Berhampur, Thane West and Bhiwadi</span>} lead="Open every day, 10 am – 1 pm and 4 pm – 8 pm. Patients from Delhi NCR visit our Bhiwadi clinic." />
        <ul className="mt-16 border-t border-cocoa/15" onPointerLeave={() => setActive(null)}>
          {rows.map((r, i) => (
            <li key={r.href} className="border-b border-cocoa/15">
              <Link
                href={r.href}
                onPointerEnter={() => setActive(i)}
                data-cursor="Visit"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 md:grid-cols-12 md:gap-6 md:py-9"
              >
                <span className="font-accent text-sm text-vermilion italic md:col-span-1">0{i + 1}</span>
                <span className="md:col-span-6">
                  <span className="block font-hero text-[clamp(2rem,6vw,5rem)] leading-[0.95] text-cocoa transition-[color,transform] duration-700 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:text-vermilion">
                    {r.city}
                  </span>
                  <span className="mt-2 block text-sm text-cocoa/70 md:hidden">{r.line}</span>
                </span>
                <span className="hidden text-sm text-cocoa/65 md:col-span-4 md:block">
                  <span className="eyebrow block text-cocoa">{r.state}</span>
                  <span className="mt-2 block">{r.line}</span>
                  <span className="mt-2 flex items-center gap-1.5 text-cocoa/80">
                    <Star className="text-ember" /> {r.rating}
                  </span>
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-cocoa/15 text-xl transition-all duration-500 group-hover:rotate-45 group-hover:border-vermilion group-hover:bg-vermilion group-hover:text-shell md:col-span-1 md:justify-self-end">
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <motion.div className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block" style={{ x: sx, y: sy }} aria-hidden>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              className="relative -mt-40 ml-8 h-64 w-52 overflow-hidden rounded-[999px_999px_18px_18px] shadow-2xl"
              initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <Image src={rows[active].image} alt="" fill sizes="210px" className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
