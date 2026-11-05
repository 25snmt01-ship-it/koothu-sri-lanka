"use client";
import { useState } from "react";

export function Share({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}${path}` : path;
  const enc = encodeURIComponent;
  const link = "underline underline-offset-4 hover:text-burgundy";
  return (
    <div className="flex flex-wrap gap-5 items-center text-sm" aria-label="Share">
      <span className="label text-terracotta">Share</span>
      <a className={link} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
      <a className={link} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer">X</a>
      <a className={link} href={`https://wa.me/?text=${enc(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
      <button className={link} onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}>{copied ? "Link copied" : "Copy link"}</button>
    </div>
  );
}
