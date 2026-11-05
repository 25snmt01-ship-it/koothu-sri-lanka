"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (<div className="mx-auto max-w-2xl px-5 py-32 text-center">
    <h1 className="font-serif text-4xl text-burgundy">Something went wrong.</h1>
    <p className="mt-4">Please try again.</p>
    <button onClick={reset} className="label mt-8 bg-burgundy text-parchment px-7 min-h-12">Try again</button>
  </div>);
}
