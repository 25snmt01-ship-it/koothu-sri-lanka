"use client";
import { useState } from "react";
import { COMMON, FORMS, SUBMISSION_TYPES, type SubmissionType } from "@/lib/submissions";

export function ContributeForms({ initial }: { initial?: string }) {
  const start = (SUBMISSION_TYPES as readonly string[]).includes(initial ?? "") ? (initial as SubmissionType) : "event";
  const [type, setType] = useState<SubmissionType>(start);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "failed">("idle");
  const [msg, setMsg] = useState("");
  const [opened, setOpened] = useState(() => Date.now());
  const form = FORMS[type];
  const field = "w-full border border-ink/40 bg-white px-3 py-2 min-h-11";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body: Record<string, unknown> = Object.fromEntries(fd.entries());
    body.type = type; body.consent = fd.get("consent") === "on"; body.opened_at = opened;
    setState("sending"); setErrors({});
    try {
      const r = await fetch("/api/contribute", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json();
      if (r.ok) { setState("done"); (e.target as HTMLFormElement).reset?.(); }
      else { setState("failed"); setErrors(j.errors ?? {}); setMsg(j.error ?? "Please correct the highlighted fields."); }
    } catch { setState("failed"); setMsg("Network error. Please try again."); }
  }

  return (
    <div>
      <div role="tablist" aria-label="Contribution type" className="flex flex-wrap gap-2">
        {SUBMISSION_TYPES.map((t) => (
          <button key={t} role="tab" aria-selected={t === type} onClick={() => { setType(t); setErrors({}); setState("idle"); setOpened(Date.now()); }}
            className={`px-4 min-h-11 border label text-[.68rem] ${t === type ? "bg-burgundy text-parchment border-burgundy" : "border-burgundy/40"}`}>{FORMS[t].title}</button>
        ))}
      </div>
      <form key={type} onSubmit={submit} noValidate className="mt-8 max-w-2xl space-y-6" aria-labelledby="form-title">
        <div><h2 id="form-title" className="font-serif text-3xl text-burgundy">{form.title}</h2><p className="mt-2">{form.blurb}</p></div>
        {state === "done" && <p role="status" className="bg-emerald-50 border border-emerald-700 p-4">Thank you. Your submission has been received and is stored as <strong>community-contributed, unverified</strong> material. It is kept separate from verified research.</p>}
        {state === "failed" && <p role="alert" className="bg-red-50 border border-red-700 p-4">{msg}</p>}
        {[...COMMON, ...form.fields].map((f) => (
          <div key={f.name}>
            <label htmlFor={f.name} className="block font-medium">{f.label}{f.required && <span aria-hidden> *</span>}</label>
            {f.help && <p id={`${f.name}-h`} className="text-sm text-ink/70">{f.help}</p>}
            {f.kind === "textarea"
              ? <textarea id={f.name} name={f.name} rows={5} maxLength={f.max} required={f.required} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-e` : f.help ? `${f.name}-h` : undefined} className={field} />
              : <input id={f.name} name={f.name} type={f.kind} maxLength={f.max} required={f.required} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name] ? `${f.name}-e` : f.help ? `${f.name}-h` : undefined} className={field} />}
            {errors[f.name] && <p id={`${f.name}-e`} className="text-red-800 text-sm mt-1">{errors[f.name]}</p>}
          </div>
        ))}
        <div aria-hidden className="absolute left-[-9999px]"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <div>
          <label className="flex gap-3 items-start"><input type="checkbox" name="consent" className="mt-1 size-5" aria-invalid={!!errors.consent} />
            <span>I confirm this is accurate to the best of my knowledge, that I have the right to share it, and that it may be published as community-contributed, unverified material.</span></label>
          {errors.consent && <p className="text-red-800 text-sm mt-1">{errors.consent}</p>}
        </div>
        <button disabled={state === "sending"} className="label bg-burgundy text-parchment px-8 min-h-12 hover:bg-burgundy-deep disabled:opacity-60">{state === "sending" ? "Sending…" : "Submit"}</button>
      </form>
    </div>
  );
}
