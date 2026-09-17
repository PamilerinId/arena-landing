# How-it-works cut-outs

Three transparent PNGs, one per step, detected at build time like the renders:

| File | Step | Caption |
|---|---|---|
| `office.png` | 01 | 5:30 PM · At your desk |
| `transit.png` | 02 | 6:15 PM · On the bridge |
| `pitch.png` | 03 | 7:00 PM · Kick-off |

Each sits on a shared baseline inside a 437×260 box, `object-fit: contain`,
bottom-aligned. Landscape crops around 1.7:1 fill the box best. Any step whose
file is missing falls back to the placeholder line-work in `HowItWorks.tsx`.

Style, inks, prompts and output spec for regenerating these: [`docs/art-direction.md`](../../../docs/art-direction.md).
