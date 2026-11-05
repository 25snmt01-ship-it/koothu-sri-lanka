"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Article } from "@/lib/types";
import { formatDate } from "@/lib/site";

export function Journal({ items }: { items: Article[] }) {
  const [q, setQ] = useState(""); const [cat, setCat] = useState("all");
  const cats = [...new Set(items.map((a) => a.category))];
  const res = useMemo(() => items.filter((a) => (cat === "all" || a.category === cat) && (!q || (a.title + a.dek).toLowerCase().includes(q.toLowerCase()))), [items, q, cat]);
  const f = "border border-ink/30 bg-white px-3 min-h-11 w-full";
  return (
    <div>
      <form className="grid gap-4 sm:grid-cols-2 bg-cream/60 p-5 border border-cream" onSubmit={(e) => e.preventDefault()}>
        <label><span className="label text-[.65rem]">Search</span><input type="search" className={f} value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <label><span className="label text-[.65rem]">Category</span><select className={f} value={cat} onChange={(e) => setCat(e.target.value)}><option value="all">All categories</option>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
      </form>
      {res.length === 0 ? <p className="mt-8 border border-dashed border-burgundy/40 p-10 text-center font-serif text-2xl text-burgundy">No articles found.</p> : (
        <ul className="mt-10 grid gap-12 md:grid-cols-2">
          {res.map((a) => (
            <li key={a.slug}><Link href={`/journal/${a.slug}`} className="group block border-t-2 border-burgundy pt-5">
              <p className="label text-[.65rem] text-terracotta">{a.category} · {a.kind}</p>
              <h2 className="font-serif text-3xl text-burgundy mt-3 group-hover:underline decoration-gold underline-offset-4">{a.title}</h2>
              <p className="mt-3 leading-relaxed">{a.dek}</p>
              <p className="mt-4 text-xs text-ink/60">{a.author} · {formatDate(a.date)} · {a.readingMinutes} min read</p>
            </Link></li>
          ))}
        </ul>
      )}
    </div>
  );
}
