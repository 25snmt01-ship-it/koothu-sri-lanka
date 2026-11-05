import type { Metadata } from "next";
import { traditions } from "@/content/traditions";
import { Directory } from "@/components/Directory";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Koothu Traditions Directory",
  description: "Search and filter the Koothu performance traditions documented for Sri Lanka, by name, region and theme.",
};

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Directory" title="Koothu traditions" intro="Each form has one record, linked to every region where it is reported. Regional associations come from community reports and are being checked against published sources." />
      <div className="mx-auto max-w-7xl px-5 py-14"><Directory items={traditions} /></div>
    </>
  );
}
