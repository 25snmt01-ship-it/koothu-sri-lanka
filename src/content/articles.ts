import type { Article } from "@/lib/types";

/** Editorial notes. No interviews or citations are invented. */
export const articles: Article[] = [
  {
    slug: "how-to-read-this-archive",
    title: "How to Read This Archive",
    dek: "What the labels “community-reported”, “terminology note” and “verified” mean on every page.",
    category: "Educational Resources",
    author: "Editorial team",
    date: "2026-11-06",
    readingMinutes: 3,
    traditions: [],
    kind: "Editorial note",
    body: [
      {
        p: [
          "Koothu is practised in different places by different communities, and information about them is scattered. This archive brings together the traditions that have been reported and says plainly how well each one is documented.",
          "Every tradition carries a label. A community-reported record means the name and region have been shared by people connected to the tradition but have not yet been checked against published sources. A terminology note means the meaning of a Tamil word is explained, with the wider description still awaiting sources. A verified record cites at least one named source.",
        ],
      },
      {
        h: "What you will not find here",
        p: [
          "Invented histories, unattributed quotations and filler are avoided. Where research is missing, the page says so and lists what is still needed.",
        ],
      },
    ],
    references: [],
  },
  {
    slug: "reading-the-names",
    title: "Reading the Names: A Short Glossary",
    dek: "Plain-English notes on the Tamil words that appear in Koothu titles.",
    category: "Educational Resources",
    author: "Editorial team",
    date: "2026-11-06",
    readingMinutes: 4,
    traditions: ["vadamodi-koothu", "thenmudi-koothu", "parai-mela-koothu", "udukku-vaasagappa", "kaman-koothu"],
    kind: "Editorial note",
    body: [
      {
        p: [
          "Many Koothu titles are built from ordinary Tamil words. Knowing them helps a first-time visitor, though a word's meaning alone never describes a performance.",
        ],
      },
      {
        h: "Words used in titles",
        p: [
          "Koothu: a Tamil word for a performance, commonly used for traditional folk theatre.",
          "Vadam and Then: north and south. Together with modi (style), they give Vadamodi and Thenmudi.",
          "Parai: a frame drum. Mela: an ensemble.",
          "Udukku: a small hourglass-shaped drum.",
          "Kaman: the Tamil name for Kama, the deity of love.",
        ],
      },
      {
        h: "A caution on spelling",
        p: [
          "Tamil names are romanised in several ways. Thenmudi is also written Thenmodi, and Vaasagappa may appear with different vowels. Search recognises the listed variants.",
        ],
      },
    ],
    references: [],
  },
  {
    slug: "call-for-contributions",
    title: "A Call for Contributions",
    dek: "How performers, researchers and organisers can help fill the gaps.",
    category: "Cultural News",
    author: "Editorial team",
    date: "2026-11-06",
    readingMinutes: 2,
    traditions: [],
    kind: "Editorial note",
    body: [
      {
        p: [
          "This archive grows through documentation. If you perform, research or organise Koothu, you can announce events, submit articles, share cultural information, offer photographs you have the right to share, or correct an entry.",
          "Community contributions are labelled as such and are kept apart from verified research.",
        ],
      },
    ],
    references: [],
  },
];

export const articleBySlug = (slug: string) => articles.find((a) => a.slug === slug);
