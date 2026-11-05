import Link from "next/link";
import { NAV } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-burgundy-deep text-cream mt-24">
      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl text-parchment">Traditional Koothu of Sri Lanka</p>
          <p className="mt-3 text-sm leading-relaxed text-cream/80">
            Discovering, documenting and celebrating a living theatrical heritage.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="label text-gold">Explore</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {NAV.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-gold underline-offset-4 hover:underline">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="label text-gold">Take part</p>
          <p className="mt-4 text-sm leading-relaxed text-cream/80">
            Announce a performance, share what you know, offer photographs you have the right to share, or suggest a correction.
          </p>
          <p className="mt-4"><Link href="/contribute" className="label text-gold border-b border-gold pb-1">Contribute</Link></p>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs py-5 text-cream/60">
        Community contributions are labelled and kept separate from verified material.
      </div>
    </footer>
  );
}
