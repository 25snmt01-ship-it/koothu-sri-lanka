"use client";
import { useMemo, useState } from "react";
import type { Tradition } from "@/lib/types";
import { regions } from "@/content/regions";
import { TraditionCard } from "./TraditionCard";

const themes = ["Style or school", "Named story", "Drum and music led"] as const;

export function Directory({ items }: { items: Tradition[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("all");
  const [theme, setTheme] = useState("all");
  const [period, setPeriod] = useState("all");
  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((t) => {
      const text = [t.name, ...(t.variants ?? [])].join(" ").toLowerCase();
      return (
        (!needle || text.includes(needle)) &&
        (region === "all" || t.regions.includes(region as never)) &&
        (theme === "all" || t.theme === theme) &&
        (period === "all" || (period === "documented" ? !!t.period : !t.period))
      );
    });
  }, [items, q, region, theme, period]);
  const field = "w-full border border-ink/30 bg-white px-3 min-h-11";
  return (
    <div>
      <form role="search" aria-label="Filter traditions" onSubmit={(e) => e.preventDefault()} className="grid gap-4 md:grid-cols-4 bg-cream/60 p-5 border border-cream">
        <label className="block md:col-span-1"><span className="label text-[.65rem]">Search by name</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Parai" className={field} /></label>
        <label className="block"><span className="label text-[.65rem]">Region</span>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className={field}><option value="all">All regions</option>{regions.map((r) => <option key={r.slug} value={r.slug}>{r.name}</option>)}</select></label>
        <label className="block"><span className="label text-[.65rem]">Research theme (provisional)</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value)} className={field}><option value="all">All themes</option>{themes.map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="block"><span className="label text-[.65rem]">Historical period</span>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className={field}><option value="all">Any</option><option value="documented">Period documented</option><option value="undocumented">Not yet documented</option></select></label>
      </form>
      <p className="mt-4 text-sm" role="status" aria-live="polite">{results.length} of {items.length} traditions shown</p>
      {results.length === 0 ? (
        <div className="mt-8 border border-dashed border-burgundy/40 p-12 text-center">
          <p className="font-serif text-2xl text-burgundy">No traditions match those filters.</p>
          <p className="mt-2 text-sm">Try clearing a filter, or <button className="underline" onClick={() => { setQ(""); setRegion("all"); setTheme("all"); setPeriod("all"); }}>reset everything</button>.</p>
        </div>
      ) : (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((t) => <li key={t.slug}><TraditionCard t={t} /></li>)}
        </ul>
      )}
    </div>
  );
}
