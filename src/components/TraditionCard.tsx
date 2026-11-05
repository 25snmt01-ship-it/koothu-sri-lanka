import Link from "next/link";
import type { Tradition } from "@/lib/types";
import { regionBySlug } from "@/content/regions";
import { Badge, Plate } from "./ui";

export function TraditionCard({ t, tall }: { t: Tradition; tall?: boolean }) {
  return (
    <Link href={`/traditions/${t.slug}`} className="group block bg-parchment border border-cream hover:border-gold transition-colors">
      <div className="overflow-hidden">
        <Plate label={t.name} tone={tall ? "terracotta" : "burgundy"} className={`${tall ? "aspect-[4/5]" : "aspect-[16/10]"} transition-transform duration-700 group-hover:scale-105`} />
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 items-center"><Badge v={t.verification} /></div>
        <h3 className="font-serif text-2xl text-burgundy mt-3 group-hover:underline underline-offset-4 decoration-gold">{t.name}</h3>
        <p className="label text-[.65rem] text-terracotta mt-2">{t.regions.map((r) => regionBySlug(r)?.name.split(" and ")[0]).join(" · ")}</p>
        <p className="text-sm mt-3 leading-relaxed text-ink/80">{t.tagline}</p>
      </div>
    </Link>
  );
}
