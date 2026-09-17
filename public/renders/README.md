# Renders

| File | Size | Used by | Loading |
|---|---|---|---|
| `hero.mp4` | 1920×1080, H.264 | `components/HeroFilm.tsx` | attached after mount |
| `hero.webm` | 1920×1080, VP9 (optional) | `components/HeroFilm.tsx` | attached after mount |
| `hero-poster.jpg` | 1920×1080 | `components/HeroFilm.tsx` | `priority`, quality 70 |
| `hero-pitch.jpg` | 2752×1536 | `components/Hero.tsx` | `priority`, quality 75 |
| `closer-match.jpg` | 2752×1536 | `components/Closer.tsx` | lazy, quality 70 |

## The hero film

Drop `hero.mp4` in (and `hero.webm` beside it if you have one) and the hero
switches from the still to the film on the next build. No component changes.

Keep it muted, seamless-looping and short — 8 to 14 seconds, under about 6 MB.
It plays silent and decorative, so nothing in it may carry information the copy
does not also carry. `hero-poster.jpg` is the first frame; without it the still
`hero-pitch.jpg` is held under the film instead.

The poster ships with the document and is the LCP element. The film's sources
are attached after mount so they never race it, and it fades up only once it is
actually playing. `prefers-reduced-motion: reduce` keeps the poster and never
loads the video at all.

`lib/renders.ts` checks for each file at build time. While a file is missing the
section falls back to the inline SVG scene in `components/PitchScene.tsx` —
`PitchScene` for the hero, `MatchScene` for the closer. Drop the JPG in and the
photo is used instead. Nothing else changes.

The hero fallback draws its pins live from `content/venues.ts` (`pin: {x, y}` as
percentages of the render box). The shipped `hero-pitch.jpg` has its labels baked
in, so `HeroPins` is suppressed when the file is present. When the label-free
render lands, delete that `render ? null :` guard in `Hero.tsx` and the pins go
live over the photo — the coordinates are already in place.
