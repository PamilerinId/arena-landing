import Image from "next/image";
import { HERO } from "@/content/copy";
import { HERO_RENDER, hasRender, heroFilm, heroPoster } from "@/lib/renders";
import { HeroFilm } from "./HeroFilm";
import { HeroPins } from "./HeroPins";
import { HeroPlay } from "./HeroPlay";
import { LiveDot } from "./LiveDot";
import { Nav } from "./Nav";
import { PitchScene } from "./PitchScene";

export function Hero() {
  const film = heroFilm();
  const poster = heroPoster();
  const still = hasRender(HERO_RENDER);

  return (
    <section
      id="top"
      className="hero on-dark"
      data-film={film.length > 0 ? "" : undefined}
      aria-label="Find a venue in Lagos"
    >
      <div className="hero-bg">
        {film.length > 0 ? (
          <HeroFilm sources={film} poster={poster} alt={HERO.alt} />
        ) : still ? (
          <Image
            src={`/renders/${HERO_RENDER}`}
            alt={HERO.alt}
            fill
            priority
            quality={75}
            sizes="100vw"
            className="hero-img"
          />
        ) : (
          <PitchScene />
        )}
      </div>

      <div className="hero-scrim" aria-hidden="true" />

      {/* The film carries its own movement; the drawn passing loop is for the
          still and the SVG scene only. */}
      {film.length === 0 ? still ? <HeroPlay /> : <HeroPins /> : null}

      <Nav />

      <div className="hero-copy">
        <span className="eyebrow">
          <LiveDot />
          {HERO.eyebrow}
        </span>
        <h1 className="display h1 hero-h1">
          {HERO.headline[0]}
          <br />
          {HERO.headline[1]}
        </h1>
        <p className="hero-sub">{HERO.sub}</p>
      </div>
    </section>
  );
}
