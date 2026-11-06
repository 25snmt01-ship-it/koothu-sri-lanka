"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MediaItem } from "@/lib/types";
import { traditionBySlug } from "@/content/traditions";

export function Gallery({ items }: { items: MediaItem[] }) {
  const [kind, setKind] = useState("all");
  const [open, setOpen] = useState<MediaItem | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const kinds = [...new Set(items.map((i) => i.kind))];
  const res = useMemo(() => items.filter((i) => kind === "all" || i.kind === kind), [items, kind]);
  useEffect(() => { const d = ref.current; if (!d) return; if (open && !d.open) d.showModal(); if (!open && d.open) d.close(); }, [open]);
  const idx = open ? res.findIndex((r) => r.id === open.id) : -1;
  const step = (n: number) => setOpen(res[(idx + n + res.length) % res.length]);
  return (
    <div>
      <label className="block max-w-xs"><span className="label text-[.65rem]">Type of material</span>
        <select className="border border-ink/30 bg-white px-3 min-h-11 w-full" value={kind} onChange={(e) => setKind(e.target.value)}><option value="all">Everything</option>{kinds.map((k) => <option key={k}>{k}</option>)}</select></label>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {res.map((m) => (
          <li key={m.id}><button className="text-left w-full group" onClick={() => setOpen(m)}>
            <div className="relative aspect-[4/3] bg-cream overflow-hidden"><Image src={m.src} alt={m.alt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover group-hover:opacity-90" /></div>
            <p className="label text-[.6rem] text-terracotta mt-3">{m.kind}</p>
            <p className="font-serif text-lg text-burgundy">{m.title}</p>
          </button></li>
        ))}
      </ul>
      <dialog ref={ref} onClose={() => setOpen(null)} aria-label="Media viewer" className="m-auto max-w-2xl w-[92vw] p-0 backdrop:bg-black/70 bg-parchment">
        {open && (
          <div className="p-6">
            <div className="relative aspect-[16/10] bg-cream"><Image src={open.src} alt={open.alt} fill sizes="(min-width:768px) 42rem, 92vw" className="object-contain" /></div>
            <p className="label text-[.65rem] text-terracotta mt-5">{open.kind}</p>
            <h2 className="font-serif text-3xl text-burgundy">{open.title}</h2>
            <p className="mt-3">{open.caption}</p>
            <p className="mt-3 text-sm text-ink/70">Credit: {open.credit}</p>
            {open.traditionSlug && <p className="mt-3 text-sm">Linked tradition: <Link className="underline" href={`/traditions/${open.traditionSlug}`}>{traditionBySlug(open.traditionSlug)?.name}</Link></p>}
            <div className="mt-6 flex gap-3">
              <button className="border border-burgundy px-4 min-h-11" onClick={() => step(-1)}>Previous</button>
              <button className="border border-burgundy px-4 min-h-11" onClick={() => step(1)}>Next</button>
              <button className="ml-auto bg-burgundy text-parchment px-4 min-h-11" onClick={() => setOpen(null)}>Close</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
