import fs from "node:fs";
import path from "node:path";

/**
 * The two hero/closer renders are large binaries kept out of git history until
 * they land. Until then every section falls back to a built-in scene so the page
 * is never a broken image. Drop the file into public/renders/ and it is used.
 */
export function hasRender(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "renders", file));
  } catch {
    return false;
  }
}

export const HERO_RENDER = "hero-pitch.jpg";
export const CLOSER_RENDER = "closer-match.jpg";
