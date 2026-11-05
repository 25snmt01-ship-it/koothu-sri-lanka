"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { regions } from "@/content/regions";
import { traditions } from "@/content/traditions";
import { Badge } from "./ui";

export function Atlas() {
  const router = useRouter();
  const sp = useSearchParams();
  const sel = sp.get("region");
  const current = regions.find((r) => r.slug === sel);
  const select = (slug: string) => router.replace(`/atlas?region=${slug}`, { scroll: false });
  const list = current ? traditions.filter((t) => t.regions.includes(current.slug)) : [];
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <p className="text-sm mb-4 max-w-md">Schematic diagram, north at the top. Positions are approximate and not to scale. No performance sites are marked.</p>
        <div role="group" aria-label="Regions of Sri Lanka, schematic" className="relative mx-auto max-w-md grid grid-cols-3 grid-rows-5 gap-3 p-6 bg-cream/60 border border-cream" style={{ aspectRatio: "3 / 4" }}>
          {regions.map((r) => (
            <button key={r.slug} aria-pressed={sel === r.slug} onClick={() => select(r.slug)} style={{ gridColumn: r.grid.col, gridRow: r.grid.row }}
              className={`p-2 text-left border-2 transition-all duration-300 min-h-14 ${sel === r.slug ? "bg-burgundy text-parchment border-gold scale-[1.04] shadow-lg" : "bg-parchment text-burgundy border-burgundy/30 hover:border-gold"}`}>
              <span className="font-serif text-sm sm:text-base leading-tight block">{r.name.split(" and ")[0]}</span>
              <span className="label text-[.55rem] opacity-70">{traditions.filter((t) => t.regions.includes(r.slug)).length} forms</span>
            </button>
          ))}
        </div>
      </div>
      <div aria-live="polite">
        {current ? (
          <div>
            <p className="label text-terracotta">{current.province}</p>
            <h2 className="font-serif text-4xl text-burgundy mt-2">{current.name}</h2>
            <p className="mt-4 text-lg leading-relaxed">{current.summary}</p>
            <h3 className="label text-terracotta mt-8">Recorded traditions</h3>
            {list.length ? (
              <ul className="mt-4 divide-y divide-cream border-y border-cream">
                {list.map((t) => (
                  <li key={t.slug}><Link href={`/traditions/${t.slug}`} className="flex items-center justify-between gap-4 py-4 hover:bg-cream/40 px-2"><span className="font-serif text-xl text-burgundy">{t.name}</span><Badge v={t.verification} /></Link></li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 border border-dashed border-burgundy/40 p-6">No traditions are recorded for this region yet. <Link href="/contribute?type=information" className="underline">Contribute documented information</Link>.</p>
            )}
          </div>
        ) : (
          <div className="border border-dashed border-burgundy/40 p-10">
            <p className="font-serif text-2xl text-burgundy">Select a region to begin.</p>
            <p className="mt-3">Or use the plain list below, which works without the diagram.</p>
          </div>
        )}
        <nav aria-label="Regions list" className="mt-10">
          <p className="label text-terracotta">All regions</p>
          <ul className="mt-3 flex flex-wrap gap-2">{regions.map((r) => <li key={r.slug}><button onClick={() => select(r.slug)} className={`px-3 min-h-11 border ${sel === r.slug ? "bg-burgundy text-parchment" : "border-burgundy/40"}`}>{r.name.split(" and ")[0]}</button></li>)}</ul>
        </nav>
      </div>
    </div>
  );
}
