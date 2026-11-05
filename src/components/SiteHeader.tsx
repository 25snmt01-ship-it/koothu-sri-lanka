"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur border-b border-cream">
      <div className="mx-auto max-w-7xl px-5 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-lg text-burgundy leading-none" onClick={() => setOpen(false)}>
          Traditional Koothu
          <span className="block label text-[.6rem] text-gold-dark mt-1">of Sri Lanka</span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-7">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={path.startsWith(n.href) ? "page" : undefined}
                  className={`label py-2 border-b-2 transition-colors ${path.startsWith(n.href) ? "border-gold text-burgundy" : "border-transparent hover:border-cream"}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="lg:hidden label border border-burgundy text-burgundy px-4 py-2 min-h-11"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="lg:hidden border-t border-cream bg-parchment">
          <ul className="px-5 py-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block py-3 font-serif text-xl text-burgundy border-b border-cream/70">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
