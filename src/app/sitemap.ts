import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { traditions } from "@/content/traditions";
import { events } from "@/content/events";
import { articles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "/traditions", "/atlas", "/events", "/journal", "/archive", "/contribute", "/about"];
  return [
    ...fixed.map((p) => ({ url: `${SITE.url}${p}` })),
    ...traditions.map((t) => ({ url: `${SITE.url}/traditions/${t.slug}` })),
    ...events.map((e) => ({ url: `${SITE.url}/events/${e.slug}` })),
    ...articles.map((a) => ({ url: `${SITE.url}/journal/${a.slug}` })),
  ];
}
