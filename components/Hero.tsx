import Image from "next/image";
import { HERO } from "@/content/copy";
import { SLOTS, formatNaira } from "@/content/venues";
import { HERO_RENDER, hasRender } from "@/lib/renders";
import { HeroPins } from "./HeroPins";
import { LiveDot } from "./LiveDot";
import { Nav } from "./Nav";
import { PitchScene } from "./PitchScene";
import { SearchBar } from "./SearchBar";

const SCRIM =
  "linear-gradient(180deg, rgba(5,16,9,.62) 0%, rgba(5,16,9,.05) 16%, rgba(5,16,9,0) 50%, rgba(5,16,9,.70) 76%, rgba(5,16,9,.94) 100%), linear-gradient(90deg, rgba(5,16,9,.30) 0%, rgba(5,16,9,0) 45%)";

export function Hero() {
  const render = hasRender(HERO_RENDER);
  const featured = SLOTS[0];

  return (
    <section id="top" className="hero on-dark" aria-label="Find a venue in Lagos">
      <div className="hero-bg">
        {render ? (
          <Image
            src={`/renders/${HERO_RENDER}`}
            alt={HERO.alt}
            fill
            priority
            quality={75}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "50% 50%" }}
          />
        ) : (
          <PitchScene />
        )}
      </div>

      <div className="hero-scrim" style={{ background: SCRIM }} aria-hidden="true" />

      {/* Pins sit above the scrim so the labels stay crisp. */}
      {render ? null : <HeroPins />}

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

      <div className="hero-search">
        <SearchBar />
      </div>

      <a className="hero-mobile-pin" href="/search">
        <b>
          {featured.venue} · {featured.time}
        </b>
        <i>
          {featured.sport} · {featured.area} · {formatNaira(featured.price)}
        </i>
      </a>
    </section>
  );
}
