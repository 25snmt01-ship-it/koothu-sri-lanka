export const SITE = {
  name: "Traditional Koothu of Sri Lanka",
  tagline: "Explore a Living Theatrical Heritage",
  description:
    "Discover the rich heritage of Sri Lankan traditional Koothu through regional traditions, cultural histories, performances, articles and events.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const NAV = [
  { href: "/traditions", label: "Traditions" },
  { href: "/atlas", label: "Atlas" },
  { href: "/events", label: "Events" },
  { href: "/journal", label: "Journal" },
  { href: "/archive", label: "Archive" },
  { href: "/contribute", label: "Contribute" },
  { href: "/about", label: "About" },
];

export function formatDate(iso: string, withTime = false) {
  const d = new Date(iso);
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit", hour12: false } : {}),
    timeZone: "Asia/Colombo",
  });
}

export const VERIFICATION_LABEL = {
  "community-reported": "Community-reported",
  "terminology-note": "Terminology note",
  verified: "Verified",
} as const;
