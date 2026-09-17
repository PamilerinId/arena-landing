# How-it-works scenes

`office.jpg`, `transit.jpg`, `pitch.jpg` — one per step, in step order. All
three must be present or the section falls back to the drawn vignettes in
`components/HowItWorks.tsx`.

The files committed here are normalised for the strip, not the raw
generations. Each one is:

1. trimmed of any photographed card border,
2. white-balanced so its paper reads exactly `--ivory` (#f5f3ec), the ground
   the strip sits on, so the panels dissolve into the page instead of
   sitting on it as plates,
3. framed on its own ink bounding box, so the subject is the same size in
   every panel, and
4. resized to 1600 wide at the panel's 480:396 box.

The scene printed as a solid block (`transit`) is framed to overfill its
panel, so its own straight edges fall outside; the two printed as objects on
paper (`office`, `pitch`) keep their margins.

Replacing a scene means redoing that pass, otherwise the strip comes apart:
mismatched papers read as three separate pictures, which is what this
treatment exists to avoid. The panels are cover-cropped and centred, so the
component needs no per-scene focus point.
