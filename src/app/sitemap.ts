import type { MetadataRoute } from "next";
import { allRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

const BUILD_DATE = new Date("2026-11-12");

export default function sitemap(): MetadataRoute.Sitemap {
  return allRoutes().map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.lastModified ? new Date(r.lastModified) : BUILD_DATE,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
