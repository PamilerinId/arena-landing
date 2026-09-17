# Court photos for the availability board

One JPG per sport tab, detected at build time like the other renders:

| File | Tab |
|---|---|
| `football.jpg` | Football, and "All sports" |
| `padel.jpg` | Padel |
| `tennis.jpg` | Tennis |
| `basketball.jpg` | Basketball |

Each fills the section (`object-fit: cover`) under the existing scrim and turf
layers and crossfades with the tab, exactly as the line markings do. A sport
whose file is missing keeps its line markings. Wide, top-down or oblique shots
around 1440×900 read best; the scrim runs 66–84% dark so contrast in the photo
matters more than brightness.
