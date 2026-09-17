# Arena — Landing Page Build Spec

Source of truth for look and copy: the approved design canvas at https://claude.ai/artifact/2KQUt7Li11DeAovsbeQWes (desktop 1440 board + mobile 390 hero). This document is the build contract. Where the canvas and this doc disagree, the canvas wins on visuals and this doc wins on behaviour, data and structure.

## 0. The call

Static marketing site, Next.js App Router + TypeScript + Tailwind, zero UI libraries, zero animation libraries, sample data in typed content files, deployed to Vercel from a fresh `arena-web` repo. No auth, no booking flow, no CMS, no API. The search bar submits to a stub route. Ship the surface first; everything behind it is a later sprint.

**Kill criteria for this build:** if mobile LCP on a mid-range Android (Moto G class, 4G throttle) is above 2.5 s after the image and turf optimisations in §9, strip the procedural turf and the tilt transforms before shipping — do not tune further. Review at the end of task 9 (§13).

## 1. Scope

**In:** one route (`/`), a stub `/search` route that reads query params and renders "Coming soon" with the parsed filters, `/list-your-venue` and `/login` as stub pages, `robots.txt`, `sitemap.xml`, OG image, analytics events, reduced-motion support.

**Out:** real availability, payments, maps, venue pages, i18n, dark/light toggle (the page is fixed-palette), A/B tooling.

## 2. Stack and repo

```
arena-web/
  app/
    layout.tsx           fonts, metadata, analytics bootstrap
    page.tsx             composes the sections in order
    search/page.tsx      stub: echoes parsed query
    list-your-venue/page.tsx
    login/page.tsx
    globals.css          tokens as CSS vars, motion classes, turf class
    opengraph-image.tsx  serves /public/renders/hero-pitch.jpg cropped 1200x630
  components/
    Nav.tsx  Hero.tsx  SearchBar.tsx  SportsRow.tsx  HowItWorks.tsx
    Scoreboard.tsx  OwnersBoard.tsx  TrustRow.tsx  Closer.tsx  Footer.tsx
    Turf.tsx  Tilt.tsx  Reveal.tsx  LiveDot.tsx  Wordmark.tsx  Icon.tsx
  content/
    copy.ts              every string on the page, exported as const
    venues.ts            sample venues + tonight's slots
    occupancy.ts         8x7 week pattern for the owners board
    placeholders.ts      CANCELLATION_HOURS, TAKE_RATE_PCT (see §11)
  lib/
    track.ts             analytics shim
    useReveal.ts         IntersectionObserver hook
  public/
    renders/hero-pitch.jpg      (2752x1536, the oblique cage pitch with pins)
    renders/closer-match.jpg    (2752x1536, the night-match silhouettes)
    icons/                       inline SVG sources if not co-located
  CLAUDE.md
```

- Next.js 15, React 19, TypeScript strict, Tailwind 3.4 (or 4 if the project template defaults to it — do not fight the default), pnpm.
- Fonts via `next/font/google`: Bricolage Grotesque (axes `opsz,wdth,wght`, subset latin) and Instrument Sans (400/500/600/700). `display: swap`. Expose as CSS vars `--font-display`, `--font-text`.
- Images via `next/image`. Hero render gets `priority`; closer render is lazy.
- Tailwind is for layout utilities only; colours, type scale and radii come from CSS variables in `globals.css` so the token layer is one file.

## 3. Design tokens

```css
:root {
  --ink: #0F1A13;        --ink-2: #4F5C55;      --ink-3: #66736C;
  --chalk: #F7F5EF;      --chalk-2: #C9D2CC;    --chalk-3: #A9B5AD;
  --ivory: #F5F3EC;      --white: #FFFFFF;      --paper: #FBFAF6;
  --turf: #145226;       --turf-booked: #1E7A38;
  --night: #07120C;      --night-blue: #0A1622;
  --accent: #DDF55A;     /* lime: live dots, eyebrows, availability text ONLY */
  --hair-dark: rgba(247,245,239,0.12);   --hair-light: rgba(15,26,19,0.12);
  --radius-s: 8px;  --radius-m: 12px;
  --ease: cubic-bezier(.2,.7,.2,1);
  --gutter: 64px;   /* 1440 */
}
```

Type scale (desktop): display H1 88px / H2 68px / scoreboard time 40px / stat 34px, all `--font-display` weight 800, `font-stretch: 80%`, `letter-spacing: -0.03em`, `line-height: 0.94–0.98`. Text: 19px hero sub, 17–18px section intros, 15–16px body, 12–13px eyebrows (600, tracking .14em, uppercase), 11px column headers (600, tracking .12em, uppercase). Text on turf sections is `--chalk`; on ivory sections `--ink`.

Buttons: height 52–56px, padding 0 24px, radius `--radius-s`, 16–17px 700. Primary on turf = chalk bg / ink text; primary on ivory = ink bg / chalk text; secondary = 1px hairline border, transparent. No lime buttons, ever.

Hairlines everywhere at 10–14% opacity. Shadows only on the two tilted boards and the search bar.

## 4. Shared components

**`Turf`** — full-bleed background for green sections. Renders an absolutely positioned SVG `<rect>` with the `#turf` filter (feTurbulence fibres at `baseFrequency="1.1 0.05"`, 3 octaves; second turbulence `0.85` → luminanceToAlpha → discrete `0 0 0 0.85` → black crumb composited over the green colour matrix — lift the exact filter from the canvas source). Define the `<filter>` once in `layout.tsx` (hidden `<svg>`), reference by id. Sections that use it set `background: var(--turf)` as the fallback colour so the section is still deep green if the filter fails or is disabled. Wrap in `contain: paint`. Below 768px render the fallback colour only (see §9).

**`Tilt`** — `perspective: 2000px` wrapper with a child transformed `rotateX(6deg) rotateY(±7–8deg)`; prop `dir: "left" | "right"`. Hover eases the child to ±3° over 900ms `--ease`. Below 1024px the transform is removed entirely (boards render flat).

**`Reveal`** — wraps a block; adds `data-reveal` and an optional `delay` (ms). `useReveal` adds `reveal-ready` to `<html>` on mount, observes every `[data-reveal]` with `threshold: 0.12, rootMargin: "0px 0px -6% 0px"`, adds `.on` once, and force-reveals everything after 3 s as a safety. CSS: hidden state `opacity: 0; translateY(22px)`, shown state `opacity: 1; translateY(0)`, 750ms `--ease`, `transition-delay` from the prop. Hidden state applies only under `html.reveal-ready`, so with JS off nothing is hidden.

**`LiveDot`** — 8px lime circle with the `pulse` keyframe (box-shadow ring 0→14px, 2.2s infinite).

**`Wordmark`** — the square mark (rounded square, centre circle, top/bottom ticks) + "ARENA" in display face 24px.

**`Icon`** — inline stroke SVG set, 1.8 stroke, round caps: search, pin, calendar, clock, arrow-right, check, and the eight sport icons (football, basketball, tennis, padel, badminton, volleyball, swimming, gym). No icon library.

## 5. Sections, in order

### 5.1 Nav (inside Hero, over the render)
Height 84, gutter 64, hairline bottom `--hair-dark`. Left: Wordmark. Centre: Find a venue · Sports · How it works · For venue owners (14px 500, `--chalk-2`, anchor links to section ids, underline-from-left on hover). Right: "Log in" (text) + "List your venue" (secondary button, 11px vertical padding).

### 5.2 Hero — the pitch is the map
Height 1080 desktop. Background: `renders/hero-pitch.jpg`, `object-fit: cover`, `object-position: 50% 50%`, `priority`. Scrim on top: `linear-gradient(180deg, rgba(5,16,9,.62) 0%, rgba(5,16,9,.05) 16%, rgba(5,16,9,0) 50%, rgba(5,16,9,.70) 76%, rgba(5,16,9,.94) 100%), linear-gradient(90deg, rgba(5,16,9,.30) 0%, rgba(5,16,9,0) 45%)`. The pins and labels are baked into the render for now (see §11 for the swap to live pins).

Copy block absolutely positioned at `left: 64px; top: 636px; max-width: 900px`, gap 24:
- Eyebrow with LiveDot: `LAGOS · PRIVATE PITCHES, COURTS & GYMS` (lime)
- H1 88px: `Book the pitch.` / `Skip the phone calls.` (text-shadow `0 2px 28px rgba(0,0,0,.45)`)
- Sub 19px `--chalk-2`, max-width 560: `Real-time availability at private astroturf pitches, courts and gyms across Lagos. Pick a slot, pay by card or transfer, confirmed in seconds.`

`SearchBar` absolutely positioned `left/right: 64px; top: 964px`.

### 5.3 SearchBar
Grid `1.1fr 1.3fr 1fr 1fr 210px`, bg `--paper`, radius `--radius-m`, shadow `0 30px 60px -34px rgba(0,0,0,.7)`, hairline column dividers. Fields (label 11px uppercase `--ink-3` above a 17px 600 input): Sport (default "Football · 5-a-side"), Where (placeholder "Lekki, Yaba, Ikeja, Surulere…"), When (default "Today"), Time (default "From 6:00 PM"). Button: ink bg, chalk text, search icon + "Find slots". It is a real `<form method="get" action="/search">` with named inputs `sport, area, date, time`; submit fires `track("search_submit", {...})`. Sport and Time are `<select>`s styled to match; Where is text; When is a text input with a native date picker fallback (`type="date"` on mobile only).

### 5.4 SportsRow
Ivory, padding 30/64, hairline bottom. Label `SPORTS` (12px uppercase) then eight plain links with icons, gap 36, 15px 600: Football, Basketball, Tennis, Padel, Badminton, Volleyball, Swimming, Gym. Hover: lift 2px, colour `--turf`. Each links to `/search?sport=<slug>`. On mobile this row scrolls horizontally with hidden scrollbar.

### 5.5 HowItWorks — Desk. Traffic. Kick-off.
Ivory, padding 120/64/112, gap 64. Header grid 12 cols: left 7 cols eyebrow `HOW IT WORKS` + H2 `Desk. Traffic. Kick-off.`; right 4 cols (cols 9–12) intro `Every venue on Arena keeps its calendar on Arena. What you see is what is actually free — no double bookings, no deposits sent to a phone number.`

Illustration panel: hairline top and bottom, 1312×320 inline SVG from the canvas — three ink vignettes on one baseline with small-caps timestamps `5:30 PM · AT YOUR DESK`, `6:15 PM · ON THE BRIDGE`, `7:00 PM · KICK-OFF`. **The current vignettes are placeholder line-work and are flagged for replacement** by proper silhouettes (full human forms, cut-paper poster style — never stick figures); build the panel so the three vignettes are separate `<g>` groups that can be swapped for `<image>` elements or an `<img>` strip without touching layout. Panel stays inline SVG (no raster) until the replacement art exists.

Captions grid 3 cols, gap 32, each: number in display face 30px, H3 22px, body 16px `--ink-2`:
- 01 `Book it before you leave` — `Sport, area, time — pay in the app and it is done before you close the laptop. Only slots the venue has marked open ever show up.`
- 02 `Sit in traffic knowing it is yours` — `The venue already has your name on the board. No "we gave it to someone else", no deposit chasing on WhatsApp.`
- 03 `Walk through the gate and play` — `Split the cost with your team from the booking link. Cancel up to {CANCELLATION_HOURS} hours before kick-off for an automatic refund.`

Reveal: header 0ms, panel 100ms, captions 150/250/350ms.

### 5.6 Scoreboard — Tonight in Lagos.
Turf section (Turf component + scrim `linear-gradient(180deg, rgba(5,16,9,.74), rgba(5,16,9,.66) 50%, rgba(5,16,9,.84))` + faint centre-circle markings SVG at 14% white). Padding 120/64/136, gap 44.

Header row: eyebrow with LiveDot `LIVE AVAILABILITY · {today, "ddd D MMM"}` + H2 `Tonight in Lagos.`; right: text tabs All sports · Football · Padel · Tennis · Basketball (14px 600, active = chalk with 1px underline; others `--chalk-3`). Tabs filter the rows client-side; URL-sync with `?sport=` is optional.

Board: `Tilt dir="left"`, plane bg `rgba(6,18,11,.84)`, hairline border, radius `--radius-m`, padding 8/32/10, shadow `0 70px 100px -56px rgba(0,0,0,.85)`. Column header row (11px uppercase `--ink-3`-on-dark `#8A9891`): Kick-off / Venue / Area / Sport / Per hour / (availability) / (arrow). Grid `140px 1.5fr 1fr 1.3fr 150px 130px 40px`, gap 16. Rows are `<a>` to `/search?venue=<slug>&time=<hh:mm>`, padding 20/0, hairline bottom: time in display face 40px tabular; venue 18px 600; area and sport 15px `--chalk-2`; price 18px 600 tabular; availability tag 12px 600 uppercase lime (empty string renders nothing); arrow icon at 50% opacity that slides 6px right and goes to 100% on row hover; row bg tints `rgba(247,245,239,.05)` on hover. Click fires `track("slot_row_click", {venue, time})`.

Footer row: `Prices are set by each venue and shown per hour.` (14px `--chalk-3`) + primary button `Browse all venues` → `/search`.

Data (`content/venues.ts`, sample):
```
18:00  Greenfield Turf      Lekki Phase 1     5-a-side football        ₦18,000  "1 left"
19:00  Yaba Sports Hub      Yaba              7-a-side football        ₦25,000
19:00  Island Padel Club    Victoria Island   Padel                    ₦20,000  "2 courts"
20:00  Astro Park Surulere  Surulere          5-a-side football        ₦15,000
20:00  Ikeja Courts Club    Ikeja GRA         Tennis                   ₦8,000
21:00  Akoka Hoops          Akoka             Basketball · half court  ₦10,000  "Floodlit"
```
Prices stored as integers in kobo-free naira (`price: 18000`) and formatted with `Intl.NumberFormat("en-NG", {style:"currency", currency:"NGN", maximumFractionDigits:0})`.

### 5.7 OwnersBoard — Your empty hours are inventory.
Ivory, padding 128/64/104, grid 12 cols, gap 32, `align-items: center`. Left 5 cols: eyebrow `FOR VENUE OWNERS`, H2 `Your empty hours are inventory.`, sub `List your pitch, court or gym once. Arena sells the off-peak slots you are not filling, takes payment upfront so no-shows do not cost you, and settles straight to your bank account.`, then four hairline rows (title 16px 700 + 15px body `--ink-2`):
- `Paid upfront, every time` — `A slot is only held once the player has paid. Late cancellations follow the policy you set.`
- `One board for everything` — `Walk-ins, WhatsApp bookings and Arena bookings on the same calendar, so a slot is never sold twice.`
- `Payouts to your bank account` — `Every booking itemised and settled to your Nigerian bank account. No cash to reconcile at the end of the night.`
- `No listing fee` — `Arena earns {TAKE_RATE_PCT}% on each completed booking. If we do not fill a slot, you pay nothing.`
Buttons: primary `List your venue` → `/list-your-venue` (fires `track("list_venue_click")`), secondary `Talk to us on WhatsApp` → `https://wa.me/{WHATSAPP_NUMBER}` (env).

Right 7 cols: `Tilt dir="right"` white plane, hairline, radius `--radius-m`, padding 24/28/26, shadow `0 60px 90px -56px rgba(15,26,19,.55)`. Header `Greenfield Turf · Week {isoWeek}` (15px 700) / `{Mon D – Sun D MMM}` (13px `--ink-3`). Grid: 48px label column + 7 day columns, 30px rows, gap 6; day labels 11px uppercase; time labels 07:00–21:00 in 2h bands. Cells from `content/occupancy.ts` (56 values, 0 = on sale, 1 = booked, 2 = blocked): booked = solid `--turf-booked` radius 4; on sale = 1px `rgba(15,26,19,.22)` outline; blocked = `repeating-linear-gradient(45deg, #E3E5E1 0 3px, #F5F6F3 3px 8px)`. Cells scale 1.08 on hover. Legend row 12px `--ink-3`: Booked through Arena · On sale · Blocked by you. Below the plane: `{bookedHours} hrs` (display 34px) + `sold through Arena this week · ₦486,000 settled to the venue's account` (15px `--ink-2`; the naira figure is a sample constant in `venues.ts`, not derived).

Pattern:
```
0,0,1,0,0,1,1,  0,0,0,0,0,1,1,  0,0,0,0,0,1,0,  0,0,0,0,0,1,1,
0,1,0,0,1,1,1,  1,1,1,1,1,1,1,  1,1,1,1,1,1,1,  1,0,1,1,1,2,2
```

### 5.8 TrustRow
Ivory, padding 0/64/120, 4 cols on a hairline top, no icons. Title 16px 700 + 15px `--ink-2`:
- `Verified venues` — `Every listing is visited and checked by our team before it goes live.`
- `Secure payments` — `Card, transfer and USSD through Paystack. Arena never stores your card details.`
- `Free cancellation` — `Cancel up to {CANCELLATION_HOURS} hours before kick-off and the refund goes back automatically.`
- `Support that answers` — `Real people on WhatsApp and in the app, seven days a week.`

### 5.9 Closer — They're already playing.
Section bg `--night-blue`, min-height fills the remainder (≈1000 on the canvas). Background `renders/closer-match.jpg`, cover, `object-position: 65% 50%`, lazy. Scrim: `linear-gradient(90deg, rgba(5,12,18,.88) 0%, rgba(5,12,18,.58) 36%, rgba(5,12,18,.06) 60%, rgba(5,12,18,0) 100%), linear-gradient(180deg, rgba(5,12,18,.20) 0%, rgba(5,12,18,0) 30%, rgba(5,12,18,0) 52%, rgba(5,12,18,.90) 82%, #060D12 100%)`.

Copy block (Reveal), padding 140/64/0, max-width 760, gap 28: eyebrow with LiveDot `KICK-OFF WAS 19:00`; H2 96px `They're already playing.`; sub 19px `--chalk-2` max-width 500 `Your next game is one search away. Find a slot, pay once, show up.`; buttons `Find a slot` (primary, scrolls to `#top`/focuses the search) and `List your venue` (secondary).

### 5.10 Footer (same section, bottom)
Padding 160/64/48, hairline top. Grid 12: cols 1–5 Wordmark + `Book football pitches, courts and gyms across Lagos. Built in Lagos.` (15px `--chalk-3`); cols 6–7 Players (Find a venue, Sports, How it works, Help centre); cols 8–9 Venues (List your venue, Owner dashboard, Pricing, Contact sales); cols 10–11 Company (About, Careers, Privacy, Terms). Bottom row 13px `--chalk-3`: `© {year} Arena · Lagos, Nigeria` left; Instagram · TikTok · X right (env-configured URLs, `rel="noopener"`).

## 6. Motion spec

| Trigger | Element | Behaviour |
|---|---|---|
| Enter viewport | any `Reveal` | fade-up 22px, 750ms, stagger per prop |
| Always | LiveDot | pulse ring 2.2s loop |
| Hover | `.btn` | translateY(-2px) + shadow, 280ms; active resets |
| Hover | nav/tab/footer links | 1px underline scales in from left, 320ms |
| Hover | scoreboard row | bg tint; arrow +6px and opacity 1 |
| Hover | sport link | translateY(-2px), colour to turf |
| Hover | occupancy cell | scale 1.08 |
| Hover | Tilt child | eases to ±3°, 900ms |
| `prefers-reduced-motion` | everything | no transitions, no pulse, reveals shown |

All durations use `--ease`. No scroll-jacking, no parallax, no auto-playing anything else.

## 7. Responsive

- **≥1280:** as specified. Gutter 64.
- **1024–1279:** gutter 40; H1 76, H2 56; scoreboard columns `120px 1.4fr 1fr 1.2fr 130px 110px 32px`; owners grid 5/7 → 6/6.
- **768–1023:** gutter 32; boards flat (no Tilt); owners stacks (copy above board); scoreboard hides Area and Sport columns and shows them as a second line under Venue; hero copy block becomes static flow (no absolute positioning): nav → spacer → copy → search, hero min-height 100svh.
- **<768 (mobile, 390 reference):** hero as the mobile board: render behind with heavier scrim (`.82 → .62 → .58 → .92` vertical), H1 58, sub 16, search stacks (Sport / Where / When+Time two-up / button), one pin label pinned near the bottom (`Greenfield Turf · 18:00`, `5-a-side · Lekki Phase 1 · ₦18,000`) — static, links to `/search`. Sports row scrolls horizontally. How-it-works panel becomes three stacked vignettes (split the SVG by `viewBox` into three 437×320 crops). Scoreboard rows become two-line cards: time + venue + price on line one, area · sport · tag on line two, arrow at right. Owners board: grid cells 26px, labels 10px, legend wraps. Trust 2×2. Closer: H2 56, buttons stack, footer columns stack 2×2.

## 8. Accessibility

- Semantic landmarks: `header`, `main`, `section` with `aria-labelledby` on each H2, `footer`.
- Every input labelled; search button has visible text; row links have an `aria-label` of `Book {venue} at {time}`.
- Colour contrast: chalk on scrimmed turf ≥ 7:1 where the scrim is ≥ .66; `--ink-2` on ivory 7:1; `--ink-3` 4.9:1 — never use `--ink-3` below 12px.
- Focus rings: 2px `--accent` outline offset 2px on dark, 2px `--ink` on light.
- Decorative SVGs `aria-hidden`; the two renders get real alt text ("Floodlit private five-a-side pitch in Lagos, viewed from above, with tonight's open slots pinned" / "Silhouetted players mid-match under floodlights").
- `prefers-reduced-motion` honoured (§6).

## 9. Performance budget

LCP ≤ 2.5 s (mobile 4G), CLS < 0.05, TBT < 150 ms, JS ≤ 90 kB gzipped on `/`.
- Hero render: `next/image` `priority`, `sizes="100vw"`, AVIF/WebP, quality 75; ship a 1440-wide and a 780-wide source. Set `fetchpriority="high"` and preload via metadata.
- Closer render: `loading="lazy"`, quality 70.
- Turf filter: only on ≥768; on mobile the section is flat `--turf` under the same scrim. Measure: if Scoreboard section paint > 60 ms on a mid-range Android, rasterise the filter once to a 1024² WebP tile and switch `Turf` to `background-image` (the kill criterion in §0).
- Fonts: two families, three weights total beyond default; `adjustFontFallback` on.
- No third-party scripts except analytics, loaded `afterInteractive`, env-gated.

## 10. Analytics and SEO

`lib/track.ts` exports `track(event, props)`; no-op unless `NEXT_PUBLIC_ANALYTICS_ID` is set; GA4 via `gtag` behind that flag. Events: `search_submit {sport, area, date, time}`, `slot_row_click {venue, time}`, `list_venue_click {source}`, `sport_click {sport}`, `cta_click {label, section}`.

Metadata: title `Arena — Book football pitches, courts and gyms in Lagos`; description `Real-time availability at private astroturf pitches, courts and gyms across Lagos. Pay by card or transfer, confirmed in seconds.`; OG image = hero render cropped 1200×630 via `opengraph-image.tsx`; JSON-LD `Organization` + `WebSite` with a `SearchAction` pointing at `/search?area={query}`.

## 11. Placeholders and known swaps

`content/placeholders.ts`:
```ts
export const CANCELLATION_HOURS = null as number | null; // TODO founder decision — renders "[X]" until set
export const TAKE_RATE_PCT = null as number | null;        // TODO founder decision — renders "[X]" until set
```
Render `[X]` when null. Do not invent values.

Known swaps queued behind this build, each isolated to one component: (1) hero render with pins baked in → label-free render + `HeroPins.tsx` overlaying live pins at the same coordinates (positions in `content/venues.ts` as `{x, y}` percentages of the render), restoring hover and edit-ability; (2) How-it-works vignettes → real silhouettes (§5.5); (3) sample venues → API.

## 12. CLAUDE.md (drop into repo root)

```
# arena-web
Next.js App Router + TS strict + Tailwind. pnpm only.
Spec: docs/arena-landing-spec.md — follow it; the design canvas link inside it wins on visuals.
Rules: no UI kits, no animation libs, no icon packs. Colours/type/radii only via CSS vars in app/globals.css.
Copy lives in content/copy.ts — never inline strings in components.
Lime (--accent) is for live dots, eyebrows and availability text only. Never a button.
Every section = one component in components/, composed in app/page.tsx in the order of the spec.
Placeholders in content/placeholders.ts render "[X]" when null; never invent numbers.
Run `pnpm lint && pnpm typecheck && pnpm build` before claiming done. Lighthouse mobile on / must pass §9.
```

## 13. Task order (surface-first)

1. Scaffold repo, fonts, tokens, `CLAUDE.md`, copy files. Build passes with an empty page.
2. Hero + Nav + SearchBar with the real render, on desktop only. Screenshot vs canvas.
3. `/search` stub receiving the form. Analytics shim.
4. SportsRow, TrustRow, Footer (the cheap sections).
5. Scoreboard with Tilt and data; then OwnersBoard.
6. HowItWorks panel (inline SVG from canvas, vignettes as swappable groups) + captions.
7. Closer with the second render.
8. Motion: Reveal hook, hover states, LiveDot, reduced-motion.
9. Responsive passes at 1280 / 1024 / 768 / 390. Lighthouse mobile. Apply §0 kill criterion.
10. Metadata, OG, sitemap, robots. Deploy to Vercel preview; share URL.

Definition of done: every section pixel-checked against the canvas at 1440 and 390, Lighthouse mobile ≥ 90 performance / 100 accessibility, `[X]` placeholders visible in exactly three places, no console errors, reduced-motion verified in DevTools.
