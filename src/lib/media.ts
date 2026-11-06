import { media } from "@/content/media";

export const coverFor = (slug: string) =>
  media.find((m) => m.traditionSlug === slug && m.cover) ?? media.find((m) => m.traditionSlug === slug);
export const mediaFor = (slug: string) => media.filter((m) => m.traditionSlug === slug);
