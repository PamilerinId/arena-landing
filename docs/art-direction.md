# Art direction for generated imagery

The page is deep green, ivory and one lime accent, set in a serif. Imagery has
to belong to that world, not to the default look of an image model. This is
the brief for regenerating the how-it-works scenes, and optionally the hero.

## The style, in one paragraph

Screen-printed poster, three inks on warm ivory paper. Flat shapes, no
outlines, no gradients, no photographic lighting. Coarse halftone grain and a
hair of misregistration where inks meet. Figures are silhouettes or turned
away — no rendered faces, no expressions. No text, letters, numbers, logos,
UI or signage anywhere in the image. Quiet negative space; the subject holds
the centre-right of the frame.

## Inks — use these exact values

| Ink | Hex | Role |
|---|---|---|
| Pine | `#145226` | mid tones, environment |
| Ink | `#0F1A13` | figures, shadow, depth |
| Lime | `#DDF55A` | **one element per image**, the thing that matters |
| Paper | `#F5F3EC` | background; must match so edges dissolve into the page |

Lime is a spot colour, not a mood. If more than one thing is lime, it is wrong.

## Output

- 2048 × 1280, landscape 16:10, sRGB JPEG, quality 90.
- No border, no caption, no signature, no vignette.
- Keep the subject inside the central 60% horizontally; the strip crops the
  edges on narrow screens.
- Generate all three in one session and reference the first as the style
  anchor for the other two, so grain, ink density and figure scale match.

Files: `public/renders/how/office.jpg`, `transit.jpg`, `pitch.jpg`.

## Shared prompt prefix

Paste before each scene prompt:

> Screen-print poster illustration, three-ink risograph on warm ivory paper
> (#F5F3EC). Inks: deep pine green (#145226), near-black (#0F1A13), and a
> single spot of lime (#DDF55A) on exactly one element. Flat shapes, no
> outlines, no gradients, coarse halftone grain, slight misregistration.
> Figures as silhouettes or seen from behind; no faces. Absolutely no text,
> letters, numbers, logos, screens with readable UI, or signage. Landscape
> 16:10, calm composition with generous negative space, subject centre-right.

## Scene 1 — office.jpg · "5:30 PM · At your desk"

> A person seen from behind at a desk by a tall window, late afternoon. Through
> the window, a flat Lagos skyline at dusk in pine ink. On the desk a laptop,
> its screen a single solid lime rectangle — the booking is done — and a cup.
> Everything else in pine and ink. Stillness before leaving work.

## Scene 2 — transit.jpg · "6:15 PM · On the bridge"

> Third Mainland Bridge at sunset seen from slightly above and behind the
> traffic: a long curve of lamp posts receding over the lagoon, a queue of cars
> as flat ink shapes. One danfo bus in the queue is the lime element. Sky and
> water in pine, cars in ink. Patient, not chaotic.

## Scene 3 — pitch.jpg · "7:00 PM · Kick-off"

> A caged five-a-side pitch at night under floodlights. One player, silhouette
> in ink, mid-strike, ball just off the boot. Floodlight beams as flat wedges
> of pine on a near-black sky; the fence as a fine ink mesh. The lime element
> is a thin rim-light along the striker's leading edge. Nothing else glows.

## Negative prompt

> photorealistic, 3D render, gradient, glossy, lens flare, bokeh, detailed
> face, cartoon face, outline, line art, comic, text, typography, caption,
> watermark, logo, signage, UI, screen contents, multiple lime elements,
> neon, saturated, purple, blue sky, white background, border, frame.

## Optional, high value — a label-free hero render

The current hero has its venue pins baked into the pixels, which is why the
copy has to hide behind a heavy wash on phones. A version of the same shot
with no pins, no labels and no text lets the page draw live pins from
`content/venues.ts` (already wired; see `components/HeroPins.tsx`) and
lightens the mobile scrim. Same camera, same floodlit cage pitch at night,
same 2752 × 1536, **nothing overlaid**. File: `public/renders/hero-pitch.jpg`.
