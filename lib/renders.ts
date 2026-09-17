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
