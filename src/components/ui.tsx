import Link from "next/link";
import type { Verification } from "@/lib/types";
import { VERIFICATION_LABEL } from "@/lib/site";

export function SectionLabel({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <p className={`label ${dark ? "text-gold" : "text-terracotta"}`}>{children}</p>;
}

export function Badge({ v, onDark }: { v: Verification; onDark?: boolean }) {
  const tone = onDark ? "bg-parchment text-burgundy" : v === "verified" ? "bg-emerald-100 text-emerald-900" : v === "terminology-note" ? "bg-cream text-burgundy" : "bg-gold/25 text-gold-dark";
  return <span className={`label text-[.65rem] px-2.5 py-1 rounded-full ${tone}`}>{VERIFICATION_LABEL[v]}</span>;
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="on-dark proscenium text-parchment">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
        <SectionLabel dark>{eyebrow}</SectionLabel>
        <h1 className="font-serif text-4xl md:text-6xl mt-4 max-w-4xl leading-[1.05]">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-cream/85 leading-relaxed">{intro}</p>}
      </div>
    </section>
  );
}

/** Typographic plate: a designed panel carrying a name, used where no licensed photograph exists. */
export function Plate({ label, tone = "burgundy", className = "" }: { label: string; tone?: "burgundy" | "terracotta" | "cream"; className?: string }) {
  const bg = tone === "burgundy" ? "bg-burgundy text-gold" : tone === "terracotta" ? "bg-terracotta text-parchment" : "bg-cream text-burgundy";
  return (
    <div aria-hidden className={`relative overflow-hidden ${bg} ${className}`}>
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
        <path d="M20 120V50a80 70 0 0 1 160 0v70" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M45 120V58a55 48 0 0 1 110 0v62" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="100" cy="30" r="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className="absolute bottom-4 left-5 right-5 font-serif italic text-xl leading-tight opacity-90">{label}</span>
    </div>
  );
}

export function ButtonLink({ href, children, variant = "solid" }: { href: string; children: React.ReactNode; variant?: "solid" | "ghost" }) {
  const cls = variant === "solid"
    ? "bg-gold text-burgundy-deep hover:bg-parchment"
    : "border border-gold text-parchment hover:bg-gold hover:text-burgundy-deep";
  return <Link href={href} className={`label inline-flex items-center min-h-12 px-7 transition-colors ${cls}`}>{children}</Link>;
}
