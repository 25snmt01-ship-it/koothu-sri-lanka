import type { Metadata } from "next";
import { articles } from "@/content/articles";
import { Journal } from "@/components/Journal";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "The Journal", description: "Essays, guides and notes on Sri Lankan Koothu, with sources stated clearly." };

export default function Page() {
  return (<>
    <PageHero eyebrow="The Journal" title="Notes, essays and guides" intro="Every piece states who wrote it and how it is sourced. No interviews or citations are invented." />
    <div className="mx-auto max-w-7xl px-5 py-14"><Journal items={articles} /></div>
  </>);
}
