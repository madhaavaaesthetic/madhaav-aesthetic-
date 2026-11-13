import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Marquee({
  children,
  duration = 40,
  reverse,
  className,
  pauseOnHover = true,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group relative flex overflow-hidden", className)} style={{ ["--marquee-duration" as string]: `${duration}s` }}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-marquee-rev" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
