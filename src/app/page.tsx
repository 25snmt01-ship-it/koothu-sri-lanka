import Link from "next/link";
import { traditions } from "@/content/traditions";
import { regions } from "@/content/regions";
import { events } from "@/content/events";
import { articles } from "@/content/articles";
import { Reveal } from "@/components/Reveal";
import { TraditionCard } from "@/components/TraditionCard";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { TraditionPhoto } from "@/components/TraditionPhoto";
import { formatDate } from "@/lib/site";

export default function Home() {
  const upcoming = events.filter((e) => e.status === "Scheduled").slice(0, 3);
  const spotlight = traditions.find((t) => t.slug === "parai-mela-koothu")!;
  const featured = traditions.filter((t) => ["vadamodi-koothu", "kathavarayan-koothu", "kaman-koothu", "udukku-vaasagappa"].includes(t.slug));
  return (
    <>
      {/* 1 Hero */}
      <section className="on-dark proscenium text-parchment relative overflow-hidden">
        <svg aria-hidden viewBox="0 0 400 520" className="hidden lg:block absolute right-[2%] bottom-0 h-[72%] text-gold/45" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M20 520V200a180 180 0 0 1 360 0v320" /><path d="M60 520V205a140 140 0 0 1 280 0v315" /><path d="M100 520V210a100 100 0 0 1 200 0v310" />
          <circle cx="200" cy="96" r="14" /><path d="M0 520h400" />
        </svg>
        <div className="mx-auto max-w-7xl px-5 pt-24 pb-28 md:pt-36 md:pb-40">
          <Reveal><SectionLabel dark>Sri Lankan Traditional Theatre</SectionLabel></Reveal>
          <Reveal delay={0.1}><h1 className="font-serif text-5xl md:text-8xl mt-6 leading-[0.98] max-w-5xl">Traditional Koothu of Sri Lanka</h1></Reveal>
          <Reveal delay={0.2}><p className="font-serif italic text-2xl md:text-4xl text-gold mt-6">Explore a Living Theatrical Heritage</p></Reveal>
          <Reveal delay={0.3}><p className="mt-8 max-w-xl text-lg text-cream/85 leading-relaxed">Explore the performance traditions, cultural histories, communities, and living theatrical heritage of Sri Lanka.</p></Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/traditions">Explore the Traditions</ButtonLink>
              <ButtonLink href="/atlas" variant="ghost">Discover the Regions</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2 Introduction */}
      <section className="mx-auto max-w-7xl px-5 py-24 grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SectionLabel>An Introduction to Koothu</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4 leading-tight">A performance heritage that is easier to find than to define.</h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed max-w-2xl">
            <p><em>Koothu</em> is a Tamil word for a performance. In Sri Lanka it is widely used for traditional Tamil theatre, in which story, movement, music and community occasion come together.</p>
            <p>Different places keep different forms. Some are named for a story, some for an instrument, and some for a stylistic school. Here they are brought together so that performers, students and curious visitors can see what is known, and what is still being documented.</p>
          </div>
        </Reveal>
        <Reveal delay={0.15} className="lg:col-span-5">
          <aside className="border-l-4 border-gold bg-cream/60 p-8">
            <p className="label text-terracotta">At a glance</p>
            <dl className="mt-5 space-y-4">
              <div><dt className="font-serif text-4xl text-burgundy">{traditions.length}</dt><dd className="text-sm">performance forms recorded</dd></div>
              <div><dt className="font-serif text-4xl text-burgundy">{regions.length}</dt><dd className="text-sm">regions where they are reported</dd></div>
              <div><dt className="font-serif text-4xl text-burgundy">{articles.length}</dt><dd className="text-sm">journal pieces, including <Link href="/journal/how-to-read-this-archive" className="underline">how records are labelled</Link></dd></div>
            </dl>
          </aside>
        </Reveal>
      </section>

      {/* 3 Living traditions */}
      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal>
            <SectionLabel>Explore the Living Traditions</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">Four ways into the archive</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-6">
            {featured.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.08} className={i === 0 ? "md:col-span-3 md:row-span-2" : "md:col-span-3 lg:col-span-3"}>
                <TraditionCard t={t} tall={i === 0} />
              </Reveal>
            ))}
          </div>
          <p className="mt-10"><Link href="/traditions" className="label text-burgundy border-b-2 border-gold pb-1">See all {traditions.length} traditions</Link></p>
        </div>
      </section>

      {/* 4 Atlas */}
      <section className="mx-auto max-w-7xl px-5 py-24 grid gap-12 lg:grid-cols-2 items-center">
        <Reveal>
          <SectionLabel>The Regional Atlas</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">Choose a place. See what is recorded there.</h2>
          <p className="mt-6 text-lg leading-relaxed max-w-lg">The atlas links {regions.length} regions to the Koothu forms associated with them. It is a schematic guide, not a surveyed map, and it shows no performance coordinates.</p>
          <div className="mt-8"><Link href="/atlas" className="label bg-burgundy text-parchment px-7 min-h-12 inline-flex items-center hover:bg-burgundy-deep">Open the Atlas</Link></div>
        </Reveal>
        <Reveal delay={0.15}>
          <ul className="grid grid-cols-2 gap-3">
            {regions.map((r) => (
              <li key={r.slug}><Link href={`/atlas?region=${r.slug}`} className="block border border-burgundy/30 p-4 hover:bg-burgundy hover:text-parchment transition-colors min-h-20"><span className="font-serif text-lg">{r.name.split(" and ")[0]}</span><span className="block label text-[.6rem] mt-1 opacity-70">{r.province}</span></Link></li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* 5 Spotlight */}
      <section className="on-dark bg-burgundy text-parchment py-24">
        <div className="mx-auto max-w-7xl px-5 grid gap-12 lg:grid-cols-2 items-center">
          <Reveal><TraditionPhoto slug={spotlight.slug} name={spotlight.name} tone="terracotta" className="aspect-[4/3]" /></Reveal>
          <Reveal delay={0.1}>
            <SectionLabel dark>Cultural Spotlight</SectionLabel>
            <h2 className="font-serif text-4xl md:text-5xl mt-4">{spotlight.name}</h2>
            <p className="mt-6 text-lg text-cream/90 leading-relaxed">{spotlight.summary}</p>
            <p className="mt-4 text-cream/80 leading-relaxed">Do you perform or research this tradition? <Link href="/contribute?type=information" className="text-gold underline">Share what you know</Link>.</p>
            <div className="mt-8"><ButtonLink href={`/traditions/${spotlight.slug}`}>Read the spotlight</ButtonLink></div>
          </Reveal>
        </div>
      </section>

      {/* 6 Events */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <Reveal>
          <SectionLabel>Upcoming Performances</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">On the calendar</h2>
        </Reveal>
        {upcoming.length === 0 ? (
          <div className="mt-10 border border-dashed border-burgundy/40 p-10 text-center"><p className="font-serif text-2xl text-burgundy">No performances are listed at the moment.</p><p className="mt-2 text-sm">Organising one? <Link href="/contribute?type=event" className="underline">Share an upcoming traditional performance with the community</Link>.</p></div>
        ) : (
        <ul className="mt-10 divide-y divide-cream border-y border-cream">
          {upcoming.map((e) => (
            <li key={e.slug}>
              <Link href={`/events/${e.slug}`} className="grid gap-2 md:grid-cols-12 py-6 items-center hover:bg-cream/40 px-2">
                <span className="md:col-span-3 font-serif text-xl text-terracotta">{formatDate(e.start)}</span>
                <span className="md:col-span-5 font-serif text-2xl text-burgundy">{e.name}</span>
                <span className="md:col-span-2 text-sm">{e.district}</span>
                
              </Link>
            </li>
          ))}
        </ul>)}
        <p className="mt-8"><Link href="/events" className="label text-burgundy border-b-2 border-gold pb-1">All events and calendar</Link></p>
      </section>

      {/* 7 Journal */}
      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-7xl px-5">
          <Reveal><SectionLabel>From the Journal</SectionLabel><h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">Notes, essays and guides</h2></Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08}>
                <Link href={`/journal/${a.slug}`} className="group block border-t-2 border-burgundy pt-5">
                  <p className="label text-terracotta text-[.65rem]">{a.category}</p>
                  <h3 className="font-serif text-2xl text-burgundy mt-3 group-hover:underline decoration-gold underline-offset-4">{a.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">{a.dek}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Project */}
      <section className="mx-auto max-w-4xl px-5 py-24 text-center">
        <Reveal>
          <SectionLabel>About the platform</SectionLabel>
          <h2 className="font-serif text-4xl md:text-5xl text-burgundy mt-4">Discovering, documenting and celebrating Koothu</h2>
          <p className="mt-6 text-lg leading-relaxed">Traditional Koothu of Sri Lanka brings together performance traditions, regional guides, articles and event information, and invites the community to contribute, while keeping community accounts clearly separate from sourced research.</p>
          <p className="mt-8"><Link href="/about" className="label text-burgundy border-b-2 border-gold pb-1">Read about the platform</Link></p>
        </Reveal>
      </section>

      {/* 9 Closing */}
      <section className="on-dark proscenium text-parchment text-center py-28">
        <Reveal>
          <p className="font-serif italic text-3xl md:text-5xl text-gold max-w-3xl mx-auto px-5">The stage is only as full as the record we keep of it.</p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center"><ButtonLink href="/contribute">Add to the archive</ButtonLink><ButtonLink href="/archive" variant="ghost">Browse the archive</ButtonLink></div>
        </Reveal>
      </section>
    </>
  );
}
