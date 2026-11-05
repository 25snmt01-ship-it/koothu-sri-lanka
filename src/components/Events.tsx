"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { EventItem } from "@/lib/types";
import { traditions } from "@/content/traditions";
import { formatDate } from "@/lib/site";

export function Events({ items }: { items: EventItem[] }) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [when, setWhen] = useState<"upcoming" | "past">("upcoming");
  const [district, setDistrict] = useState("all");
  const [tradition, setTradition] = useState("all");
  const [today] = useState(() => new Date().toISOString().slice(0, 10));
  const [month, setMonth] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); });
  const districts = [...new Set(items.map((e) => e.district))].sort();
  const filtered = useMemo(() => items.filter((e) =>
    (when === "upcoming" ? e.start.slice(0, 10) >= today : e.start.slice(0, 10) < today) &&
    (district === "all" || e.district === district) &&
    (tradition === "all" || e.traditionSlug === tradition)
  ).sort((a, b) => a.start.localeCompare(b.start)), [items, when, district, tradition, today]);

  const y = month.getFullYear(), m = month.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((first + days) / 7) * 7 }, (_, i) => i - first + 1);
  const key = (d: number) => `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const field = "border border-ink/30 bg-white px-3 min-h-11 w-full";
  const tab = (on: boolean) => `px-5 min-h-11 label border ${on ? "bg-burgundy text-parchment border-burgundy" : "border-burgundy/40"}`;

  return (
    <div>
      <div className="flex flex-wrap gap-6 justify-between items-end">
        <div className="flex" role="group" aria-label="Time period">
          <button className={tab(when === "upcoming")} aria-pressed={when === "upcoming"} onClick={() => setWhen("upcoming")}>Upcoming</button>
          <button className={tab(when === "past")} aria-pressed={when === "past"} onClick={() => setWhen("past")}>Past archive</button>
        </div>
        <div className="flex" role="group" aria-label="View">
          <button className={tab(view === "list")} aria-pressed={view === "list"} onClick={() => setView("list")}>List</button>
          <button className={tab(view === "calendar")} aria-pressed={view === "calendar"} onClick={() => setView("calendar")}>Calendar</button>
        </div>
      </div>
      <form className="grid gap-4 sm:grid-cols-2 mt-6 bg-cream/60 p-5 border border-cream" onSubmit={(e) => e.preventDefault()}>
        <label><span className="label text-[.65rem]">District</span>
          <select className={field} value={district} onChange={(e) => setDistrict(e.target.value)}><option value="all">All districts</option>{districts.map((d) => <option key={d}>{d}</option>)}</select></label>
        <label><span className="label text-[.65rem]">Performance type</span>
          <select className={field} value={tradition} onChange={(e) => setTradition(e.target.value)}><option value="all">All types</option>{traditions.map((t) => <option key={t.slug} value={t.slug}>{t.name}</option>)}</select></label>
      </form>

      {view === "list" ? (
        filtered.length ? (
          <ul className="mt-8 divide-y divide-cream border-y border-cream">
            {filtered.map((e) => (
              <li key={e.slug}><Link href={`/events/${e.slug}`} className="grid gap-2 md:grid-cols-12 py-6 px-2 items-center hover:bg-cream/40">
                <span className="md:col-span-3 font-serif text-xl text-terracotta">{formatDate(e.start, true)}</span>
                <span className="md:col-span-5 font-serif text-2xl text-burgundy">{e.name}</span>
                <span className="md:col-span-2 text-sm">{e.venue}, {e.district}</span>
                
              </Link></li>
            ))}
          </ul>
        ) : <div className="mt-8 border border-dashed border-burgundy/40 p-12 text-center"><p className="font-serif text-2xl text-burgundy">{items.length === 0 ? (when === "upcoming" ? "No performances are listed at the moment." : "The past events archive is empty.") : "No events match these filters."}</p><p className="mt-2 text-sm">{items.length === 0 ? "" : "Try another district or type, or "}<Link href="/contribute?type=event" className="underline">share an upcoming traditional performance</Link> with the community.</p></div>
      ) : (
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <button className={tab(false)} onClick={() => setMonth(new Date(y, m - 1, 1))}>Previous</button>
            <h2 className="font-serif text-2xl text-burgundy" aria-live="polite">{month.toLocaleString("en-GB", { month: "long", year: "numeric" })}</h2>
            <button className={tab(false)} onClick={() => setMonth(new Date(y, m + 1, 1))}>Next</button>
          </div>
          <div className="grid grid-cols-7 text-center label text-[.6rem] text-terracotta mb-1">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => <div key={d}>{d}</div>)}</div>
          <div className="grid grid-cols-7 gap-px bg-cream border border-cream">
            {cells.map((d, i) => {
              const inMonth = d >= 1 && d <= days;
              const dayEvents = inMonth ? filtered.filter((e) => e.start.startsWith(key(d))) : [];
              return (
                <div key={i} className={`min-h-20 p-1 text-xs ${inMonth ? "bg-parchment" : "bg-cream/50"}`}>
                  {inMonth && <span className="text-ink/60">{d}</span>}
                  {dayEvents.map((e) => <Link key={e.slug} href={`/events/${e.slug}`} className="block mt-1 bg-burgundy text-parchment px-1 py-0.5 leading-tight hover:bg-terracotta">{e.name}</Link>)}
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs">Calendar shows events matching the filters above. {filtered.length === 0 && "None this period."}</p>
        </div>
      )}
    </div>
  );
}
