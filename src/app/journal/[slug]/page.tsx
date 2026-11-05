import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleBySlug } from "@/content/articles";
import { traditionBySlug } from "@/content/traditions";
import { formatDate } from "@/lib/site";
import { Share } from "@/components/Share";

export function generateStaticParams() { return articles.map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params; const a = articleBySlug(slug);
  return a ? { title: a.title, description: a.dek, openGraph: { type: "article", title: a.title, description: a.dek } } : {};
}

export default async function Page({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params; const a = articleBySlug(slug);
  if (!a) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: a.title, datePublished: a.date, author: { "@type": "Person", name: a.author }, description: a.dek };
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Link href="/journal" className="label text-terracotta">&larr; The Journal</Link>
      <p className="label text-[.7rem] text-terracotta mt-8">{a.category} · {a.kind}</p>
      <h1 className="font-serif text-4xl md:text-6xl text-burgundy mt-3 leading-tight">{a.title}</h1>
      <p className="mt-5 text-xl text-ink/80 leading-relaxed">{a.dek}</p>
      <p className="mt-5 text-sm text-ink/60">{a.author} · {formatDate(a.date)} · {a.readingMinutes} min read</p>
      <div className="prose-koothu mt-12">
        {a.body.map((s, i) => <section key={i}>{s.h && <h2>{s.h}</h2>}{s.p.map((p, j) => <p key={j}>{p}</p>)}</section>)}
      </div>
      {a.traditions.length > 0 && <div className="mt-10"><p className="label text-terracotta">Related traditions</p><ul className="mt-3 flex flex-wrap gap-2">{a.traditions.map((s) => { const t = traditionBySlug(s); return t && <li key={s}><Link className="border border-burgundy px-3 py-1 inline-block text-burgundy hover:bg-burgundy hover:text-parchment" href={`/traditions/${s}`}>{t.name}</Link></li>; })}</ul></div>}
      <div className="mt-10"><p className="label text-terracotta">References</p><p className="mt-2 text-sm">{a.references.length ? "" : "This note is original editorial text and cites no external sources."}</p></div>
      <div className="mt-10 border-t border-cream pt-6"><Share title={a.title} path={`/journal/${a.slug}`} /></div>
    </article>
  );
}
