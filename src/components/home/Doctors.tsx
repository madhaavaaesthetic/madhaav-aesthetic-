"use client";

import Link from "next/link";
import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { doctors, type Doctor } from "@/data/doctors";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";

export function Doctors() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-24" aria-labelledby="doctors-title">
      <div className="wrap">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHead
            className="lg:col-span-7"
            eyebrow="Your doctors"
            title={<span id="doctors-title">Meet your doctors</span>}
            lead="A trichologist and dermatologist diagnoses your hair or skin problem. Experienced surgeons from Mumbai perform hair transplants and laser treatments."
          />
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image src="/images/doctor-nameplates.jpg" alt="Brass nameplates of Dr. Manu Singh, Dr. Kapil Patil and Dr. Vinay Chouksey at the clinic" fill sizes="(max-width:1024px) 90vw, 30vw" className="object-cover object-top" />
            </div>
            <p className="mt-3 text-xs text-cocoa/70">The nameplates outside our consultation rooms.</p>
          </Reveal>
        </div>

        <Reveal group className="mt-12 grid gap-6 md:grid-cols-3" stagger={0.12}>
          {doctors.map((d) => (
            <DoctorPlate key={d.slug} d={d} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function DoctorPlate({ d }: { d: Doctor }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 160, damping: 18 });
  const sheen = useTransform(mx, [0, 1], ["-40%", "140%"]);

  return (
    <m.div style={{ perspective: 1000 }}>
      <m.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group relative flex h-full flex-col rounded-[1.75rem] bg-shell p-3 ring-1 ring-cocoa/8"
      >
        <div
          className="relative overflow-hidden rounded-[1.2rem] px-6 py-9 text-center shadow-[inset_0_0_0_1px_rgba(90,60,20,0.25),0_18px_30px_-18px_rgba(90,60,20,0.6)]"
          style={{ background: "linear-gradient(135deg,#a97c32 0%,#e9cf8c 28%,#c39a4c 52%,#f3dea2 74%,#9c7230 100%)" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0_1px,transparent_1px_3px)]" />
          <m.div className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40 blur-md" style={{ left: sheen }} />
          <p className="relative text-[1.45rem] font-bold tracking-wide text-[#2a1a0a] uppercase" style={{ fontFamily: "var(--font-serif)" }}>
            {d.name}
          </p>
          <p className="relative mt-1 text-sm font-semibold text-[#3b2810]">{d.credentials}</p>
        </div>
        <div className="flex flex-1 flex-col px-3 pt-6 pb-3" style={{ transform: "translateZ(30px)" }}>
          <p className="eyebrow text-vermilion">{d.role}</p>
          <p className="mt-1 text-sm text-cocoa/70">{d.base}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {d.focus.slice(0, 4).map((f) => (
              <li key={f} className="rounded-full bg-cream px-3 py-1 text-xs text-cocoa/75">
                {f}
              </li>
            ))}
          </ul>
          <Link href={`/doctors/${d.slug}`} className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-cocoa link-underline w-fit">
            View profile <ArrowUpRight />
          </Link>
        </div>
      </m.div>
    </m.div>
  );
}
