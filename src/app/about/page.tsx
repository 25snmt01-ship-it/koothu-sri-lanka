import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionLabel, ButtonLink } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Traditional Koothu of Sri Lanka is a digital space for exploring, documenting and celebrating the island's living Koothu theatre traditions.",
};

const heritage = [
  { t: "Regional Koothu traditions", d: "Forms reported across the north, the east and the hill country, each linked to the places where it is performed.", href: "/traditions" },
  { t: "Places and regions", d: "A regional guide that connects each part of the island with the traditions found there.", href: "/atlas" },
  { t: "Stories and ideas", d: "Essays, glossaries and guides on performance, music, costume and storytelling.", href: "/journal" },
  { t: "Upcoming performances", d: "Announcements of performances and ceremonies, shared by organisers and communities.", href: "/events" },
  { t: "The heritage archive", d: "Photographs, instruments and recordings, each with a credit and a link to its tradition.", href: "/archive" },
];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="About" title="About Traditional Koothu of Sri Lanka" intro="Discovering, documenting, and celebrating a living theatrical heritage." />

      <section className="mx-auto max-w-7xl px-5 py-24 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel>Who we are</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4 leading-tight">A digital space for a theatre that lives in its communities.</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7 prose-koothu">
          <p>Traditional Koothu of Sri Lanka is a digital space dedicated to exploring the rich theatrical traditions preserved by communities across the island. Through cultural documentation, regional guides, articles and event information, the platform brings the world of traditional Koothu closer to audiences everywhere.</p>
          <p><em>Koothu</em> is a Tamil word for a performance. Here it is used for the traditional Tamil theatre of Sri Lanka, in which story, movement, music and community occasion come together.</p>
        </Reveal>
      </section>

      <section className="on-dark bg-burgundy text-parchment py-24">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <SectionLabel dark>Our purpose</SectionLabel>
            <p className="font-serif text-3xl md:text-4xl mt-5 leading-snug">Our purpose is to make Sri Lanka&rsquo;s traditional Koothu heritage easier to discover, understand and appreciate.</p>
            <p className="mt-8 text-lg text-cream/85 leading-relaxed max-w-2xl">By bringing together information about performance traditions, cultural practices and the communities connected to them, we hope to encourage awareness of these living art forms. Every record states how well it is sourced, so readers can see what is established and what is still being learned.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal><SectionLabel>Explore our heritage</SectionLabel><h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">Five ways in</h2></Reveal>
        <ol className="mt-12 border-t border-burgundy">
          {heritage.map((h, i) => (
            <li key={h.t} className="border-b border-cream">
              <Link href={h.href} className="group grid gap-3 md:grid-cols-12 py-7 items-baseline hover:bg-cream/40 px-2">
                <span className="md:col-span-1 font-serif text-3xl text-gold-dark">0{i + 1}</span>
                <span className="md:col-span-4 font-serif text-2xl text-burgundy group-hover:underline decoration-gold underline-offset-4">{h.t}</span>
                <span className="md:col-span-7 leading-relaxed">{h.d}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-3xl px-5">
          <Reveal>
            <SectionLabel>A living tradition</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4 leading-tight">Koothu is performed, not just preserved.</h2>
            <div className="prose-koothu mt-8">
              <p>Koothu is not only a subject for history books. Its knowledge is carried in performance itself: in how stories are told, how music and movement are combined, and how communities gather to take part. A tradition stays alive when it is practised, taught and watched.</p>
              <p>For that reason this platform pays as much attention to who performs and where, as to what was written about the past. Where a claim has not yet been supported by a published source or a practitioner, we say so rather than fill the gap.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="on-dark proscenium text-parchment text-center py-24">
        <Reveal>
          <SectionLabel dark>Discover and connect</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl mt-4 px-5">Begin with a tradition, a place or a performance.</h2>
          <div className="mt-10 flex flex-wrap gap-4 justify-center px-5">
            <ButtonLink href="/traditions">Explore Traditions</ButtonLink>
            <ButtonLink href="/events" variant="ghost">Discover Events</ButtonLink>
            <ButtonLink href="/journal" variant="ghost">Read Our Journal</ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
