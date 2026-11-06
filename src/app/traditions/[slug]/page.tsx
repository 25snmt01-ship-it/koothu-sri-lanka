import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { traditions, traditionBySlug } from "@/content/traditions";
import { regionBySlug } from "@/content/regions";
import { events } from "@/content/events";
import { articles } from "@/content/articles";
import { media } from "@/content/media";
import { Badge, SectionLabel } from "@/components/ui";
import { TraditionPhoto } from "@/components/TraditionPhoto";
import { formatDate } from "@/lib/site";

export function generateStaticParams() {
  return traditions.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/traditions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = traditionBySlug(slug);
  if (!t) return {};
  return { title: t.name, description: t.summary, openGraph: { title: t.name, description: t.summary } };
}

export default async function Page({ params }: PageProps<"/traditions/[slug]">) {
  const { slug } = await params;
  const t = traditionBySlug(slug);
  if (!t) notFound();
  const rel = t.related.map((s) => traditionBySlug(s)).filter(Boolean);
  const ev = events.filter((e) => e.traditionSlug === t.slug);
  const arts = articles.filter((a) => a.traditions.includes(t.slug));
  const gallery = media.filter((m) => m.traditionSlug === t.slug);
  const toc = [...t.sections.map((s) => s.title), "Regions", ...(gallery.length ? ["Media"] : []), "Events", "Help us document this tradition", "Sources"];
  const id = (s: string) => s.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <>
      <section className="on-dark proscenium text-parchment">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-28 grid gap-10 lg:grid-cols-2 items-end">
          <div>
            <SectionLabel dark>Koothu tradition</SectionLabel>
            <h1 className="font-serif text-5xl md:text-7xl mt-4 leading-[1.02]">{t.name}</h1>
            {t.variants && <p className="mt-3 text-cream/70 text-sm">Also written: {t.variants.join(", ")}</p>}
            <p className="mt-6 text-xl text-cream/90 leading-relaxed max-w-xl">{t.summary}</p>
            <div className="mt-6"><Badge v={t.verification} onDark /></div>
          </div>
          <TraditionPhoto slug={t.slug} name={t.name} tone="cream" priority className="aspect-[4/3]" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-12 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-24 self-start">
          <p className="label text-terracotta">On this page</p>
          <ul className="mt-4 space-y-2 text-sm border-l border-cream">
            {toc.map((s) => <li key={s}><a href={`#${id(s)}`} className="block pl-4 py-1 hover:text-burgundy hover:border-l-2 hover:border-gold -ml-px">{s}</a></li>)}
          </ul>
        </nav>

        <article className="max-w-3xl prose-koothu">
          {t.sections.map((s) => (
            <section key={s.title} id={id(s.title)} className="scroll-mt-24">
              <h2>{s.title}</h2>
              {!s.verified && s.title !== "About this record" && <p className="label !text-[.65rem] !leading-normal text-gold-dark !mb-4">Awaiting sources</p>}
              {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </section>
          ))}

          <section id="regions" className="scroll-mt-24">
            <h2>Regions</h2>
            <ul className="!p-0 grid gap-3 sm:grid-cols-2 not-prose">
              {t.regions.map((r) => { const reg = regionBySlug(r)!; return (
                <li key={r}><Link href={`/atlas?region=${r}`} className="block border border-cream p-4 hover:border-gold bg-white/50"><span className="font-serif text-xl text-burgundy">{reg.name}</span><span className="block label text-[.62rem] text-terracotta mt-1">{reg.province}</span></Link></li>
              ); })}
            </ul>
          </section>

          {gallery.length > 0 && (
            <section id="media" className="scroll-mt-24">
              <h2>Media</h2>
              <ul className="not-prose grid gap-4 sm:grid-cols-2 my-4">
                {gallery.map((m) => (
                  <li key={m.id}>
                    <div className="relative aspect-[4/3] bg-cream"><Image src={m.src} alt={m.alt} fill sizes="(min-width:640px) 40vw, 100vw" className="object-cover" /></div>
                    <p className="text-sm mt-2">{m.caption} <span className="text-ink/60">Credit: {m.credit}</span></p>
                  </li>
                ))}
              </ul>
              <p>See more in the <Link href="/archive" className="underline">heritage archive</Link>.</p>
            </section>
          )}

          <section id="events" className="scroll-mt-24">
            <h2>Events</h2>
            {ev.length ? ev.map((e) => <p key={e.slug}><Link href={`/events/${e.slug}`} className="underline">{e.name}</Link>, {formatDate(e.start)}</p>) : <p>No performances are currently listed for this tradition. <Link href="/contribute?type=event" className="underline">Announce one</Link>.</p>}
            {arts.length > 0 && arts.map((a) => <p key={a.slug}>Related reading: <Link href={`/journal/${a.slug}`} className="underline">{a.title}</Link></p>)}
          </section>

          <section id="help-us-document-this-tradition" className="scroll-mt-24">
            <h2>Help us document this tradition</h2>
            <p>Information on the following is still being gathered, and nothing has been written to fill the gaps.</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">{t.gaps.map((g) => <li key={g}>{g}</li>)}</ul>
            <p>Can you help? <Link href={`/contribute?type=information&tradition=${t.slug}`} className="underline">Share cultural information</Link> or <Link href={`/contribute?type=correction&tradition=${t.slug}`} className="underline">suggest a correction</Link>.</p>
          </section>

          <section id="sources" className="scroll-mt-24">
            <h2>Sources</h2>
            <p>No published sources are cited for this record yet, so it is not marked as verified.</p>
          </section>

          {rel.length > 0 && (
            <section className="not-prose mt-16 border-t border-cream pt-8">
              <p className="label text-terracotta">Related traditions</p>
              <ul className="mt-4 flex flex-wrap gap-3">{rel.map((r) => <li key={r!.slug}><Link href={`/traditions/${r!.slug}`} className="border border-burgundy px-4 py-2 inline-block text-burgundy hover:bg-burgundy hover:text-parchment">{r!.name}</Link></li>)}</ul>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
