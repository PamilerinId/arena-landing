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

The committed `hero.mp4` is not the raw export. It is prepared for the web:

- **no audio track**, since it plays muted and the track is dead weight,
- **`+faststart`**, so the index sits at the front of the file and playback can
  begin before the whole thing has arrived,
- **re-encoded to about 3 MB** from 11, which a hero background on Lagos mobile
  data needs, and
- **its loop seam dissolved**: the film is a narrative cut, so the last 0.75s
  cross-dissolves into the first and the clip starts just after that dissolve.
  It ends where it begins and loops without a snap.

The recipe, with `hero-orig.mp4` as the raw export:

```
ffmpeg -i hero-orig.mp4 -filter_complex "
  [0:v]trim=0:0.75,setpts=PTS-STARTPTS[head];
  [0:v]trim=0.75:9.25,setpts=PTS-STARTPTS[mid];
  [0:v]trim=9.25:10,setpts=PTS-STARTPTS[tail];
  [tail][head]blend=all_expr='A*(1-(T/0.75))+B*(T/0.75)'[seam];
  [mid][seam]concat=n=2:v=1[out]" -map "[out]" -an \
  -c:v libx264 -profile:v high -preset slow -crf 29 -pix_fmt yuv420p \
  -g 48 -movflags +faststart hero.mp4
ffmpeg -i hero.mp4 -frames:v 1 -q:v 3 hero-poster.jpg
```

The trim points are that clip's length; re-read them for a new one. It plays
silent and decorative, so nothing in it may carry information the copy does not
also carry. `hero-poster.jpg` is its first frame; without it the still
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
