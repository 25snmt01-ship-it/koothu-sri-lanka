import type { Region } from "@/lib/types";

export const regions: Region[] = [
  {
    slug: "jaffna",
    name: "Jaffna",
    province: "Northern Province",
    summary:
      "The northern peninsula and long-standing centre of Sri Lankan Tamil cultural life. Kathavarayan Koothu and Vadamodi Koothu are reported here.",
    grid: { col: 2, row: 1 },
  },
  {
    slug: "mannar",
    name: "Mannar",
    province: "Northern Province",
    summary:
      "An island and district on the north-western coast. Vaasagappa and Udukku Vaasagappa are reported here.",
    grid: { col: 1, row: 2 },
  },
  {
    slug: "mullaitivu",
    name: "Mullaitivu",
    province: "Northern Province",
    summary:
      "A district on the north-eastern coast. No Koothu forms are recorded for this region yet. Documented contributions are welcome.",
    grid: { col: 3, row: 2 },
  },
  {
    slug: "vavuniya",
    name: "Vavuniya",
    province: "Northern Province",
    summary:
      "An inland district of the Northern Province. Parai Mela Koothu, Panni Koothu and Magudi Koothu are reported here.",
    grid: { col: 2, row: 3 },
  },
  {
    slug: "batticaloa",
    name: "Batticaloa and the Eastern Province",
    province: "Eastern Province",
    summary:
      "The east coast, where Vadamodi Koothu, Thenmudi Koothu, Magudi Koothu and Parai Mela Koothu are reported.",
    grid: { col: 3, row: 4 },
  },
  {
    slug: "hill-country",
    name: "Hill Country",
    province: "Central highlands",
    summary:
      "The central highlands, home to the Hill Country Tamil community. Kaman Koothu and Parai Mela Koothu are reported here.",
    grid: { col: 2, row: 5 },
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);
