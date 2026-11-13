import type { ReactNode } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-4xl", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <p className={cn("eyebrow mb-5 flex items-center gap-3", tone === "dark" ? "text-ember" : "text-vermilion", align === "center" && "justify-center")}>
            <span className="h-px w-8 bg-current" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitReveal as={as} className={cn("font-display text-title text-balance", tone === "dark" ? "text-shell" : "text-cocoa")}>
        {title}
      </SplitReveal>
      {lead && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 text-lead text-pretty", tone === "dark" ? "text-shell/70" : "text-cocoa/70", align === "center" && "mx-auto max-w-2xl")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}
