import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-2xl px-5 py-32 text-center">
    <p className="label text-terracotta">404</p>
    <h1 className="font-serif text-5xl text-burgundy mt-3">This scene is not in the script.</h1>
    <p className="mt-4">The page you wanted does not exist or has moved.</p>
    <p className="mt-8"><Link href="/" className="label bg-burgundy text-parchment px-7 min-h-12 inline-flex items-center">Return home</Link></p>
  </div>);
}
