import { existsSync } from "node:fs";
import { join } from "node:path";
import type { NextConfig } from "next";

/**
 * Which renders are present, decided here on the build machine and inlined
 * into the bundle. A runtime fs check would run inside the serverless function
 * on Vercel, where public/ is served from the CDN and not on disk, and would
 * silently fall back to the SVG scenes.
 */
const RENDERS = ["hero-pitch.jpg", "closer-match.jpg"].filter((file) =>
  existsSync(join(process.cwd(), "public", "renders", file)),
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  env: {
    RENDERS: RENDERS.join(","),
  },
};

export default nextConfig;
