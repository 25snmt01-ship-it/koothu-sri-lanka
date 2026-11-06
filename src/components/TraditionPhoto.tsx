import Image from "next/image";
import { coverFor } from "@/lib/media";
import { Plate } from "./ui";

/** Shows the tradition's photograph when one exists, otherwise the typographic plate. */
export function TraditionPhoto({ slug, name, tone, className = "", sizes = "(min-width:1024px) 33vw, 100vw", priority }: {
  slug: string; name: string; tone?: "burgundy" | "terracotta" | "cream"; className?: string; sizes?: string; priority?: boolean;
}) {
  const m = coverFor(slug);
  if (!m) return <Plate label={name} tone={tone} className={className} />;
  return (
    <div className={`relative overflow-hidden bg-cream ${className}`}>
      <Image src={m.src} alt={m.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
