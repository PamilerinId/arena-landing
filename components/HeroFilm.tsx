"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { FilmSource } from "@/lib/renders";

/**
 * The hero film over its own poster frame. The poster is the LCP element and
 * ships with the document; the sources are attached after mount so the video
 * never competes with it for bandwidth. Reduced motion keeps the poster.
 */
export function HeroFilm({
  sources,
  poster,
  alt,
}: {
  sources: FilmSource[];
  poster: string | null;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    for (const s of sources) {
      const el = document.createElement("source");
      el.src = s.src;
      el.type = s.type;
      video.append(el);
    }
    video.load();
    const play = () => {
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    if (video.readyState >= 3) play();
    else video.addEventListener("canplay", play, { once: true });
  }, [sources]);

  return (
    <>
      {poster ? (
        <Image
          src={`/renders/${poster}`}
          alt={alt}
          fill
          priority
          quality={70}
          sizes="100vw"
          className="hero-img"
        />
      ) : null}
      <video
        ref={ref}
        className="hero-film"
        data-playing={playing ? "" : undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
}
