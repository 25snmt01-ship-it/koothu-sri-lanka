import type { MediaItem } from "@/lib/types";

/**
 * Licensed photographs. To add one:
 *   1. Put the file in public/photos/ (JPG or WebP, ideally under 2000px wide).
 *   2. Add an entry below. Every photograph needs a credit, alt text and permission to publish.
 *   3. Set cover: true on one photograph per tradition to use it on cards and page headers.
 *
 * Example:
 * {
 *   id: "vadamodi-1",
 *   kind: "Performance photography",
 *   title: "Vadamodi Koothu performance",
 *   caption: "A short, factual caption.",
 *   alt: "Describe what is visible in the photograph.",
 *   traditionSlug: "vadamodi-koothu",
 *   status: "licensed",
 *   credit: "Photographer name",
 *   src: "/photos/vadamodi-1.jpg",
 *   cover: true,
 * },
 */
export const media: MediaItem[] = [];
