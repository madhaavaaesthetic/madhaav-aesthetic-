import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { breadcrumbLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items, className }: { items: { name: string; path: string }[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[0.8rem] text-cocoa/70", className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((it, i) => (
            <li key={it.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-ember/70" />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-cocoa">{it.name}</span>
              ) : (
                <Link href={it.path} className="link-underline hover:text-cocoa">
                  {it.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
