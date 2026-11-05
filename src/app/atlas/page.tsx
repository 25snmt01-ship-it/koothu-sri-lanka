import type { Metadata } from "next";
import { Suspense } from "react";
import { Atlas } from "@/components/Atlas";
import Link from "next/link";
import { regions } from "@/content/regions";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "The Living Koothu Atlas", description: "Select a region of Sri Lanka and discover the Koothu traditions associated with it." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="The Living Koothu Atlas" title="Place and performance, side by side" intro="Select a region to see the traditions linked to it, read its background and open a full tradition page." />
      <div className="mx-auto max-w-7xl px-5 py-16"><Suspense fallback={<ul className="flex flex-wrap gap-3">{regions.map((r) => <li key={r.slug}><Link className="border border-burgundy/40 px-4 py-2 inline-block" href={`/atlas?region=${r.slug}`}>{r.name}</Link></li>)}</ul>}><Atlas /></Suspense></div>
    </>
  );
}
