import type { Metadata } from "next";
import Link from "next/link";
import { media } from "@/content/media";
import { Gallery } from "@/components/Gallery";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = { title: "Heritage Archive", description: "Photographs, instruments, costumes and recordings connected to Koothu traditions, with credits." };

export default function Page() {
  return (<>
    <PageHero eyebrow="Heritage archive" title="Photographs, instruments and recordings" intro="Each photograph is linked to the tradition it shows." />
    <div className="mx-auto max-w-7xl px-5 py-14">
      {media.length ? <Gallery items={media} /> : (
        <div className="border border-dashed border-burgundy/40 p-12 text-center max-w-2xl mx-auto">
          <p className="font-serif text-3xl text-burgundy">The archive is being assembled.</p>
          <p className="mt-3 leading-relaxed">Photographs, recordings and documents appear here once their credits are recorded. If you hold material you are able to share, we would be glad to hear from you.</p>
          <p className="mt-6"><Link href="/contribute?type=media" className="label bg-burgundy text-parchment px-7 min-h-12 inline-flex items-center">Offer photographs or documents</Link></p>
        </div>
      )}
    </div>
  </>);
}
