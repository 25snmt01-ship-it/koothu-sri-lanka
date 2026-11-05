import { NextResponse } from "next/server";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { SUBMISSION_TYPES, validate, type SubmissionType } from "@/lib/submissions";

// Best-effort per-instance limiter. For multi-instance production use a shared store.
const hits = new Map<string, number[]>();
const LIMIT = 5, WINDOW = 10 * 60 * 1000, MAX_BODY = 40_000;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  recent.push(now); hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW)) hits.delete(k);
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin"), host = req.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) return NextResponse.json({ error: "Request origin not allowed." }, { status: 403 });
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

  const text = await req.text();
  if (text.length > MAX_BODY) return NextResponse.json({ error: "Submission is too large." }, { status: 413 });
  let body: Record<string, unknown>;
  try { body = JSON.parse(text); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  // Spam traps: hidden field must be empty and the form must have been open for at least 3 seconds.
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots only, dropped silently
  const opened = Number(body.opened_at);
  if (!opened || Date.now() - opened < 3000) return NextResponse.json({ error: "That was very quick. Please check your details and submit again." }, { status: 400 });

  const type = body.type as SubmissionType;
  if (!SUBMISSION_TYPES.includes(type)) return NextResponse.json({ error: "Unknown submission type." }, { status: 400 });
  const { errors, clean } = validate(type, body);
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const record = { type, payload: clean, status: "unverified", created_at: new Date().toISOString() };
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  try {
    if (url && key) {
      const r = await fetch(`${url}/rest/v1/submissions`, {
        method: "POST",
        headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
        body: JSON.stringify(record),
      });
      if (!r.ok) throw new Error(`Supabase ${r.status}`);
    } else if (process.env.NODE_ENV !== "production") {
      const dir = path.join(process.cwd(), ".data");
      await mkdir(dir, { recursive: true });
      await appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n");
    } else {
      return NextResponse.json({ error: "Contributions cannot be accepted right now. Please try again later." }, { status: 503 });
    }
  } catch {
    return NextResponse.json({ error: "We could not save your submission. Please try again later." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
