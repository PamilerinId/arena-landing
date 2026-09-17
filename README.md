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

## Two things are deliberately unfinished

**The renders.** `public/renders/hero-pitch.jpg` and `closer-match.jpg` are not in
the repo. Until they are, both sections draw an inline SVG scene instead, detected
at build time in `lib/renders.ts`. See [`public/renders/README.md`](public/renders/README.md).

**Two numbers.** `CANCELLATION_HOURS` and `TAKE_RATE_PCT` in `content/placeholders.ts`
are `null` and render as `[X]` in three places on the page — how-it-works step 03,
the owners board's "No listing fee", and the trust row's "Free cancellation".
They are founder decisions. Set them and the `[X]`s disappear.

## Analytics

`lib/track.ts` is a no-op unless `NEXT_PUBLIC_ANALYTICS_ID` is set; no third-party
script loads without it. Events: `search_submit`, `slot_row_click`, `list_venue_click`,
`sport_click`, `cta_click`. See `.env.example`.
