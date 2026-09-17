/**
 * The renders present at build time, as decided in next.config.ts and inlined
 * here as a constant. If a file is missing the section falls back to the inline
 * SVG scene so the page is never a broken image. Drop the file into
 * public/renders/ and rebuild; nothing else changes.
 */
const present = new Set((process.env.RENDERS ?? "").split(",").filter(Boolean));

export function hasRender(file: string): boolean {
  return present.has(file);
}

export const HERO_RENDER = "hero-pitch.jpg";
export const CLOSER_RENDER = "closer-match.jpg";

/** One scene per how-it-works step, in step order. */
const VIGNETTE_NAMES = ["how/office", "how/transit", "how/pitch"] as const;

/** The scene file for a step: the full JPG when it exists, else a transparent PNG, else null. */
export function vignetteRender(step: number): { src: string; cutout: boolean } | null {
  const name = VIGNETTE_NAMES[step];
  if (!name) return null;
  if (hasRender(`${name}.jpg`)) return { src: `${name}.jpg`, cutout: false };
  if (hasRender(`${name}.png`)) return { src: `${name}.png`, cutout: true };
  return null;
}

/** One photo per court under the scoreboard, keyed by tab sport. */
export const COURT_RENDERS = {
  football: "courts/football.jpg",
  padel: "courts/padel.jpg",
  tennis: "courts/tennis.jpg",
  basketball: "courts/basketball.jpg",
} as const;
