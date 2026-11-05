# Traditional Koothu of Sri Lanka

Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion.

    npm install
    npm run dev          # http://localhost:3000
    npm run build && npm start

- Editorial data lives in `src/content/*`; routes in `src/app/*`.
- `supabase/schema.sql` defines the tables and row-level security (public read of editorial tables; `submissions` writable only server-side).
- Copy `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to the production domain (used by the sitemap, canonical URLs and share links).
- Community submissions (`POST /api/contribute`) use origin check, validation, honeypot, time trap, per-IP rate limit and size cap. With `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set they are saved to `submissions` as `unverified`. Without them, development appends to `.data/submissions.jsonl` and production returns 503.
- Events and media lists are empty until verified entries are added to `src/content/events.ts` and `src/content/media.ts`.
