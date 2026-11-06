export type RegionSlug =
  | "jaffna"
  | "vavuniya"
  | "mannar"
  | "mullaitivu"
  | "batticaloa"
  | "hill-country";

/** How much evidence stands behind a record. No record is "verified" until a source is cited. */
export type Verification = "community-reported" | "terminology-note" | "verified";

export type Theme = "Style or school" | "Named story" | "Drum and music led";

export interface Region {
  slug: RegionSlug;
  name: string;
  province: string;
  summary: string;
  /** Position on the schematic (not geographic) atlas grid. */
  grid: { col: number; row: number };
}

export interface TraditionSection {
  title: string;
  paragraphs: string[];
  /** true only when a cited source supports the text. */
  verified: boolean;
}

export interface Tradition {
  slug: string;
  name: string;
  variants?: string[];
  regions: RegionSlug[];
  tagline: string;
  summary: string;
  theme: Theme;
  verification: Verification;
  /** Documented historical period, if any. Undefined means "not yet documented". */
  period?: string;
  sections: TraditionSection[];
  /** Plain-language research gaps, shown openly on the page. */
  gaps: string[];
  related: string[];
}

export interface SourceRef {
  id: string;
  label: string;
}

export interface EventItem {
  slug: string;
  name: string;
  traditionSlug: string;
  start: string; // ISO date-time, local Sri Lanka time
  end?: string;
  venue: string;
  district: string;
  region: RegionSlug;
  directions: string;
  organizer: string;
  performers: string;
  description: string;
  fee: string;
  contact: string;
  status: "Scheduled" | "Cancelled" | "Completed" | "Postponed";
}

export type ArticleCategory =
  | "Theatre History"
  | "Research Articles"
  | "Cultural Studies"
  | "Traditional Performance Methods"
  | "Artist Interviews"
  | "Educational Resources"
  | "Cultural News"
  | "Performance Reviews";

export interface Article {
  slug: string;
  title: string;
  dek: string;
  category: ArticleCategory;
  author: string;
  date: string;
  readingMinutes: number;
  traditions: string[];
  body: { h?: string; p: string[] }[];
  references: string[];
  kind: "Editorial note" | "Community contribution" | "Peer-reviewed";
}

export type MediaKind =
  | "Performance photography"
  | "Historical documentation"
  | "Costumes"
  | "Traditional instruments"
  | "Artist photographs"
  | "Recorded performances"
  | "Event photographs";

export interface MediaItem {
  id: string;
  kind: MediaKind;
  title: string;
  caption: string;
  traditionSlug?: string;
  region?: RegionSlug;
  /** "contributed" items await confirmation of the photographer. */
  status: "licensed" | "contributed";
  credit: string;
  /** Path under /public, for example "/photos/vadamodi-1.jpg". */
  src: string;
  /** Describes the photograph for people using screen readers. */
  alt: string;
  /** Use as the main picture for its tradition (cards, page header). Only one per tradition. */
  cover?: boolean;
}
