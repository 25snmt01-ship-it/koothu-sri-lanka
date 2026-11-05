import type { Metadata } from "next";
import { ContributeForms } from "@/components/ContributeForms";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Contribute", description: "Announce events, submit articles, share cultural information or photographs, and report corrections." };

export default async function Page({ searchParams }: PageProps<"/contribute">) {
  const sp = await searchParams;
  const type = typeof sp.type === "string" ? sp.type : undefined;
  return (<>
    <PageHero eyebrow="Contribute" title="Help document Koothu" intro="Performers, researchers, organisers and the public are welcome. Contributions are checked automatically for spam and always labelled as community-contributed." />
    <div className="mx-auto max-w-7xl px-5 py-14"><ContributeForms initial={type} /></div>
  </>);
}
