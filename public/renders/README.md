# Renders

Two files belong here. Neither is committed yet.

| File | Size | Used by | Loading |
|---|---|---|---|
| `hero-pitch.jpg` | 2752×1536 | `components/Hero.tsx` | `priority`, quality 75 |
| `closer-match.jpg` | 2752×1536 | `components/Closer.tsx` | lazy, quality 70 |

`lib/renders.ts` checks for each file at build time. While a file is missing the
section falls back to the inline SVG scene in `components/PitchScene.tsx` —
`PitchScene` for the hero, `MatchScene` for the closer. Drop the JPG in and the
photo is used instead. Nothing else changes.

The hero fallback draws its pins live from `content/venues.ts` (`pin: {x, y}` as
percentages of the render box). The shipped `hero-pitch.jpg` has its labels baked
in, so `HeroPins` is suppressed when the file is present. When the label-free
render lands, delete that `render ? null :` guard in `Hero.tsx` and the pins go
live over the photo — the coordinates are already in place.
