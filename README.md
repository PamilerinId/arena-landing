# Arena — landing

Static marketing surface for Arena: book private pitches, courts and gyms in Lagos.
One route that matters (`/`), three stubs behind it. No auth, no booking flow, no CMS, no API.

Build contract: [`docs/arena-landing-spec.md`](docs/arena-landing-spec.md).

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

```bash
pnpm lint
pnpm typecheck
pnpm build && pnpm start
```

Node 20+. pnpm only.

## What is here

| Route | What it is |
|---|---|
| `/` | The landing page — hero, sports, how it works, tonight's board, owners, trust, closer |
| `/search` | Stub. Parses the search form's query params and echoes them back |
| `/list-your-venue` | Stub. Points at WhatsApp while onboarding is hand-run |
| `/login` | Stub |

`/opengraph-image`, `/robots.txt`, `/sitemap.xml` and `/icon.svg` are generated.

## Where things live

```
app/          routes, root layout (fonts, metadata, JSON-LD), globals.css
components/   one component per section, plus Turf / Tilt / Reveal / Icon primitives
content/      every string, the sample venues, the occupancy grid, the open placeholders
lib/          analytics shim, reveal hook, date helpers, render detection
```

Tokens (colour, type scale, radii, easing) are CSS variables in `app/globals.css`.
Copy is in `content/copy.ts` — components never inline strings.

## One thing is deliberately unfinished

**The renders** are in `public/renders/` and served through `next/image`. `lib/renders.ts`
checks for them at build time; if either goes missing the section falls back to an
inline SVG scene. See [`public/renders/README.md`](public/renders/README.md).

**The policy numbers.** `CANCELLATION_HOURS` (24) and `TAKE_RATE_PCT` (10) live in
`content/placeholders.ts` and flow into three places on the page — how-it-works
step 03, the owners board's "No listing fee", and the trust row's "Free
cancellation". Set either back to `null` and it renders as `[X]`.

## Analytics

`lib/track.ts` is a no-op unless `NEXT_PUBLIC_ANALYTICS_ID` is set; no third-party
script loads without it. Events: `search_submit`, `slot_row_click`, `list_venue_click`,
`sport_click`, `cta_click`. See `.env.example`.
