# arena-landing

Next.js App Router + TS strict + Tailwind 4. pnpm only.
Spec: `docs/arena-landing-spec.md` — follow it; the design canvas link inside it wins on visuals.

Rules:
- No UI kits, no animation libs, no icon packs.
- Colours, type scale and radii only via CSS vars in `app/globals.css`. Tailwind is for layout utilities.
- Copy lives in `content/copy.ts` — never inline strings in components.
- Lime (`--accent`) is for live dots, eyebrows and availability text only. Never a button.
- Every section = one component in `components/`, composed in `app/page.tsx` in the order of the spec.
- Placeholders in `content/placeholders.ts` render `[X]` when null; never invent numbers.
- Run `pnpm lint && pnpm typecheck && pnpm build` before claiming done. Lighthouse mobile on `/` must pass §9 of the spec.

Renders: `lib/renders.ts` checks whether `public/renders/*.jpg` exists at build time.
Present → `next/image`. Absent → the inline SVG scenes in `components/PitchScene.tsx`.
Dropping the real files in is the whole swap; no component changes.
