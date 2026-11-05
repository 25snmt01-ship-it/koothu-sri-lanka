import type { Tradition, TraditionSection } from "@/lib/types";

const provenance = (name: string): TraditionSection => ({
  title: "About this record",
  verified: false,
  paragraphs: [
    `The regional associations for ${name} come from community reports. They are still being checked against published scholarship and fieldwork, so please treat them as provisional.`,
  ],
});

const gapList = [
  "Historical background and documented origins",
  "Stories, characters and typical performance structure",
  "Costume and make-up conventions",
  "Musical accompaniment and instruments",
  "Ceremonial or seasonal context",
  "Named performers, troupes and communities",
  "Photographs, recordings and publication references",
];

export const traditions: Tradition[] = [
  {
    slug: "kathavarayan-koothu",
    name: "Kathavarayan Koothu",
    regions: ["jaffna"],
    tagline: "A performance tradition named for the story of Kathavarayan.",
    summary:
      "Kathavarayan Koothu takes its name from Kathavarayan, a figure whose story is known in Tamil narrative traditions. It is reported in Jaffna.",
    theme: "Named story",
    verification: "community-reported",
    sections: [
      provenance("Kathavarayan Koothu"),
      {
        title: "About the name",
        verified: false,
        paragraphs: [
          "The title points to a narrative centred on Kathavarayan. How the story is staged in Sri Lanka, and how it differs from versions told elsewhere, still needs to be documented with named sources.",
        ],
      },
    ],
    gaps: gapList,
    related: ["vadamodi-koothu", "kaman-koothu"],
  },
  {
    slug: "vadamodi-koothu",
    name: "Vadamodi Koothu",
    regions: ["jaffna", "batticaloa"],
    tagline: "Often described as the “northern style” of Tamil koothu.",
    summary:
      "In Tamil, vadam means north and modi means style. It is reported in both Jaffna and the Batticaloa and Eastern Province region.",
    theme: "Style or school",
    verification: "terminology-note",
    sections: [
      provenance("Vadamodi Koothu"),
      {
        title: "Meaning of the name",
        verified: false,
        paragraphs: [
          "Vadamodi is commonly translated as “northern style”. It is usually discussed alongside Thenmudi (“southern style”). The precise features that distinguish the two, and where each is practised, should be confirmed with published studies and with practitioners before being stated as fact.",
        ],
      },
    ],
    gaps: gapList,
    related: ["thenmudi-koothu", "kathavarayan-koothu"],
  },
  {
    slug: "thenmudi-koothu",
    name: "Thenmudi Koothu",
    variants: ["Thenmodi Koothu"],
    regions: ["batticaloa"],
    tagline: "Often described as the “southern style” of Tamil koothu.",
    summary:
      "In Tamil, then means south. It is reported in Batticaloa and the Eastern Province. Romanised spellings vary, and “Thenmodi” also appears.",
    theme: "Style or school",
    verification: "terminology-note",
    sections: [
      provenance("Thenmudi Koothu"),
      {
        title: "Spelling and meaning",
        verified: false,
        paragraphs: [
          "Romanisation of Tamil is not standardised, so this tradition appears under more than one spelling. One spelling is used as the main title, and variants are listed so that searches succeed.",
        ],
      },
    ],
    gaps: gapList,
    related: ["vadamodi-koothu", "magudi-koothu"],
  },
  {
    slug: "parai-mela-koothu",
    name: "Parai Mela Koothu",
    regions: ["vavuniya", "batticaloa", "hill-country"],
    tagline: "A performance tradition linked to the parai drum.",
    summary:
      "The parai is a frame drum used in many Tamil community settings, and mela refers to an ensemble. It is reported in Vavuniya, the Eastern Province and the Hill Country.",
    theme: "Drum and music led",
    verification: "community-reported",
    sections: [
      provenance("Parai Mela Koothu"),
      {
        title: "Documenting the parai tradition",
        verified: false,
        paragraphs: [
          "Parai Mela Koothu is a priority for documentation. Whether it is rare, endangered or tied to a single community is not claimed here: those questions need careful research rather than assumption.",
          "Because it is reported in three regions, it appears as one record shown in each of them.",
        ],
      },
    ],
    gaps: gapList,
    related: ["udukku-vaasagappa", "kaman-koothu"],
  },
  {
    slug: "panni-koothu",
    name: "Panni Koothu",
    regions: ["vavuniya"],
    tagline: "A performance form reported in Vavuniya.",
    summary:
      "Panni Koothu is reported in Vavuniya. The meaning of the title in this performance context has not yet been confirmed.",
    theme: "Named story",
    verification: "community-reported",
    sections: [
      provenance("Panni Koothu"),
      {
        title: "About the name",
        verified: false,
        paragraphs: [
          "In everyday Tamil, panni can mean a pig or boar. Whether that is the sense intended here is not known, so no interpretation is offered until a source or practitioner confirms it.",
        ],
      },
    ],
    gaps: gapList,
    related: ["magudi-koothu", "parai-mela-koothu"],
  },
  {
    slug: "magudi-koothu",
    name: "Magudi Koothu",
    regions: ["vavuniya", "batticaloa"],
    tagline: "A form reported in both Vavuniya and the Eastern Province.",
    summary:
      "Magudi Koothu is reported in both Vavuniya and Batticaloa. It appears here as a single record linked to both regions.",
    theme: "Named story",
    verification: "community-reported",
    sections: [
      provenance("Magudi Koothu"),
      {
        title: "About the name",
        verified: false,
        paragraphs: [
          "The meaning and origin of the title, and whether the two regional associations describe the same practice, are open questions awaiting documentation.",
        ],
      },
    ],
    gaps: gapList,
    related: ["panni-koothu", "thenmudi-koothu"],
  },
  {
    slug: "vaasagappa",
    name: "Vaasagappa",
    regions: ["mannar"],
    tagline: "A performance form reported in Mannar.",
    summary:
      "Vaasagappa is reported in Mannar. Romanised spellings may vary, and the form's relationship to other Koothu traditions is yet to be documented.",
    theme: "Named story",
    verification: "community-reported",
    sections: [provenance("Vaasagappa")],
    gaps: gapList,
    related: ["udukku-vaasagappa"],
  },
  {
    slug: "udukku-vaasagappa",
    name: "Udukku Vaasagappa",
    regions: ["mannar"],
    tagline: "A Mannar form whose title mentions the udukku.",
    summary:
      "The udukku is a small hourglass-shaped drum used in Tamil music. Whether it defines this form, and how this form differs from Vaasagappa, still needs documentation.",
    theme: "Drum and music led",
    verification: "community-reported",
    sections: [provenance("Udukku Vaasagappa")],
    gaps: gapList,
    related: ["vaasagappa", "parai-mela-koothu"],
  },
  {
    slug: "kaman-koothu",
    name: "Kaman Koothu",
    regions: ["hill-country"],
    tagline: "A Hill Country tradition named after Kaman.",
    summary:
      "Kaman is the Tamil name for Kama, the deity of love. It is reported in the Hill Country. Its stories and occasions need to be documented with sources.",
    theme: "Named story",
    verification: "community-reported",
    sections: [provenance("Kaman Koothu")],
    gaps: gapList,
    related: ["parai-mela-koothu", "kathavarayan-koothu"],
  },
];

export const traditionBySlug = (slug: string) => traditions.find((t) => t.slug === slug);
export const traditionsInRegion = (region: string) =>
  traditions.filter((t) => t.regions.includes(region as never));
