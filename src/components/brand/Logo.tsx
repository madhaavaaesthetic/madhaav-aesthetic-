import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, tone = "dark", onClick }: { className?: string; tone?: "dark" | "light"; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className={cn("group flex items-center gap-2.5", className)}>
      <span className="relative block h-10 w-10 shrink-0 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:rotate-[-8deg] md:h-11 md:w-11">
        <Image src="/images/logo-mark.png" alt="" fill sizes="44px" loading="eager" className="object-contain" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[1.45rem] md:text-[1.6rem]", tone === "dark" ? "text-cocoa" : "text-shell")}>
          Madh<span className="text-grad">aa</span>v
        </span>
        <span className={cn("mt-0.5 text-[0.6rem] font-semibold tracking-[0.4em] uppercase", tone === "dark" ? "text-cocoa/85" : "text-shell/80")}>
          Aesthetic
        </span>
      </span>
    </Link>
  );
}
