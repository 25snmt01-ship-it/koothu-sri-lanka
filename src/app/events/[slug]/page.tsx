import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, eventBySlug } from "@/content/events";
import { traditionBySlug } from "@/content/traditions";
import { regionBySlug } from "@/content/regions";
import { formatDate } from "@/lib/site";
import { SectionLabel } from "@/components/ui";
import { Share } from "@/components/Share";

export function generateStaticParams() { return events.map((e) => ({ slug: e.slug })); }

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params; const e = eventBySlug(slug);
  return e ? { title: e.name, description: e.description } : {};
}

export default async function Page({ params }: PageProps<"/events/[slug]">) {
  const { slug } = await params; const e = eventBySlug(slug);
  if (!e) notFound();
  const t = traditionBySlug(e.traditionSlug);
  const ld = { "@context": "https://schema.org", "@type": "Event", name: e.name, startDate: e.start, endDate: e.end, eventStatus: e.status === "Cancelled" ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled", location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", addressLocality: e.district, addressCountry: "LK" } }, description: e.description, organizer: { "@type": "Organization", name: e.organizer } };
  const rows: [string, string][] = [
    ["Date and time", formatDate(e.start, true)], ["Venue", `${e.venue}, ${e.district}`], ["Region", regionBySlug(e.region)?.name ?? ""],
    ["Directions", e.directions], ["Organiser", e.organizer], ["Performers", e.performers], ["Entrance", e.fee], ["Contact", e.contact], ["Status", e.status],
  ];
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Link href="/events" className="label text-terracotta">&larr; All events</Link>
      <SectionLabel>{t?.name}</SectionLabel>
      <h1 className="font-serif text-4xl md:text-6xl text-burgundy mt-3">{e.name}</h1>
      <p className="mt-8 text-lg leading-relaxed max-w-3xl">{e.description}</p>
      <dl className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-2 border-t border-cream pt-8">
        {rows.map(([k, v]) => <div key={k}><dt className="label text-terracotta text-[.65rem]">{k}</dt><dd className="mt-1">{v}</dd></div>)}
      </dl>
      {t && <p className="mt-10">About the tradition: <Link href={`/traditions/${t.slug}`} className="underline text-burgundy">{t.name}</Link></p>}
      <div className="mt-10 border-t border-cream pt-6"><Share title={e.name} path={`/events/${e.slug}`} /></div>
    </div>
  );
}
