# Welland Valley Art Society — Rota

A Next.js (App Router) volunteer-stewarding rota for the Welland Valley Art
Society, hosted on Netlify (site `wvas-ex-rota`, WVASadmin account; pushes to
`main` deploy automatically). Data lives in a Google Sheet, read/written only from
server code. Auth is Google sign-in restricted to an email allowlist.

## House rules (always follow these)

2. **Secrets are server-only.** Never put API keys, the Google private key, the
   sheet id, or the allowlist into client components or committed files. They
   live in environment variables and are used only in `lib/*` server modules and
   server actions. Files importing `server-only` must never be imported by a
   client component.
3. **Validate before writing.** All exhibition writes go through the validation
   in `lib/validation.ts` and the server actions in `actions/exhibitions.ts`,
   which re-check the signed-in user against the allowlist.
4. **Keep it simple and conventional.** Small, focused files; follow the existing
   patterns. Prefer Server Actions for writes and server components for reads.
5. **Follow the bundled Vercel skills** in `.claude/skills/` for React, Next.js,
   composition, and design decisions.

## Project map

- `app/` — routes. `app/page.tsx` (home), `book`/`booked`/`overview` (the
  public booking pages), `contacts` (password-protected phone list), `help`,
  `app/settings/page.tsx` (gated CRUD), `app/api/auth/[...nextauth]/route.ts` (Auth.js).
- `components/` — UI. `*-form`/`*-list` are client; header/auth are server.
- `lib/` — logic + data. `validation.ts`, `allowlist.ts`, `sheet-map.ts` are pure
  and unit-tested. `sheets.ts`, `exhibitions.ts`, `auth.ts` are server-only.
- `actions/` — server actions (mutations, with auth re-check).
- `docs/superpowers/` — design spec and implementation plans.

## Commands

- `npm run dev` — local dev server (or use `/run`).
- `npm test` — Vitest unit tests.
- `npx tsc --noEmit` — type-check.

## Environment variables

Set on the Netlify site (and `.env.local` for local dev). All are server-side.
Never commit real values — the repo is public.
