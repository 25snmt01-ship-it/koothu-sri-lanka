import type { Metadata } from "next";
import Link from "next/link";
import { events } from "@/content/events";
import { Events } from "@/components/Events";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Events and Ceremonies", description: "Find upcoming Koothu performances and ceremonies by date, district and type, or browse the past archive." };

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Events and ceremonies" title="Where and when to see Koothu" intro="Filter by district and performance type, switch to the calendar, or browse the archive of past events." />
      <div className="mx-auto max-w-7xl px-5 py-14">
        <p className="mb-10 text-sm max-w-3xl">Organising a performance or ceremony? <Link href="/contribute?type=event" className="underline">Share it with the community</Link>.</p>
        <Events items={events} />
      </div>
    </>
  );
}
