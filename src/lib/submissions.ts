export const SUBMISSION_TYPES = ["event", "article", "information", "media", "correction"] as const;
export type SubmissionType = (typeof SUBMISSION_TYPES)[number];

export interface FieldDef { name: string; label: string; kind: "text" | "textarea" | "email" | "url" | "datetime-local"; required?: boolean; max: number; help?: string }

export const COMMON: FieldDef[] = [
  { name: "contributor_name", label: "Your name", kind: "text", required: true, max: 120 },
  { name: "contributor_email", label: "Your email address", kind: "email", required: true, max: 200, help: "Used only to follow up on your submission. It is never published." },
];

export const FORMS: Record<SubmissionType, { title: string; blurb: string; fields: FieldDef[] }> = {
  event: {
    title: "Announce an event", blurb: "Tell us about a real performance or ceremony.",
    fields: [
      { name: "event_name", label: "Event name", kind: "text", required: true, max: 160 },
      { name: "performance_type", label: "Performance type", kind: "text", required: true, max: 120 },
      { name: "starts_at", label: "Date and time", kind: "datetime-local", required: true, max: 40 },
      { name: "venue", label: "Venue and district", kind: "text", required: true, max: 200 },
      { name: "organizer", label: "Organiser", kind: "text", required: true, max: 160 },
      { name: "details", label: "Description, fee and directions", kind: "textarea", required: true, max: 3000 },
    ],
  },
  article: {
    title: "Submit an article", blurb: "Share original writing. You must have the right to publish it.",
    fields: [
      { name: "title", label: "Title", kind: "text", required: true, max: 200 },
      { name: "details", label: "Text or summary", kind: "textarea", required: true, max: 8000 },
      { name: "references", label: "References or sources", kind: "textarea", max: 3000, help: "List real sources only." },
    ],
  },
  information: {
    title: "Share cultural information", blurb: "Add what you know about a tradition.",
    fields: [
      { name: "tradition", label: "Tradition (if any)", kind: "text", max: 160 },
      { name: "details", label: "What you can tell us", kind: "textarea", required: true, max: 5000 },
      { name: "source_basis", label: "How do you know this?", kind: "textarea", required: true, max: 1500, help: "For example: I perform it, my family tradition, a published book (title and page)." },
    ],
  },
  media: {
    title: "Offer photographs or documentation", blurb: "Link to material you own or may share. Files are not uploaded here.",
    fields: [
      { name: "media_url", label: "Link to the material", kind: "url", required: true, max: 500 },
      { name: "details", label: "What it shows, where and when", kind: "textarea", required: true, max: 2000 },
      { name: "credit", label: "Credit line", kind: "text", required: true, max: 200 },
    ],
  },
  correction: {
    title: "Report a correction or problem", blurb: "Point out an error, or report content that should not be here.",
    fields: [
      { name: "page_url", label: "Page address (optional)", kind: "text", max: 300 },
      { name: "details", label: "What is wrong, and what is right?", kind: "textarea", required: true, max: 3000 },
    ],
  },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(type: SubmissionType, input: Record<string, unknown>) {
  const errors: Record<string, string> = {};
  const clean: Record<string, string> = {};
  for (const f of [...COMMON, ...FORMS[type].fields]) {
    const raw = input[f.name];
    const v = typeof raw === "string" ? raw.trim() : "";
    if (f.required && !v) { errors[f.name] = `${f.label} is required.`; continue; }
    if (v.length > f.max) { errors[f.name] = `${f.label} must be ${f.max} characters or fewer.`; continue; }
    if (v && f.kind === "email" && !EMAIL.test(v)) errors[f.name] = "Enter a valid email address.";
    if (v && f.kind === "url") { try { const u = new URL(v); if (!/^https?:$/.test(u.protocol)) throw 0; } catch { errors[f.name] = "Enter a full web address starting with https://"; } }
    clean[f.name] = v;
  }
  if (input.consent !== true) errors.consent = "Please confirm the statement above.";
  return { errors, clean };
}
