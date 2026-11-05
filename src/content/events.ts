import type { EventItem } from "@/lib/types";

/**
 * Verified listings only. Events reach the site through the community
 * announcement form and are added here once confirmed.
 */
export const events: EventItem[] = [];

export const eventBySlug = (slug: string) => events.find((e) => e.slug === slug);
