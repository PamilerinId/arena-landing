import Image from "next/image";
import { em } from "@/lib/em";
import Link from "next/link";
import { CLOSER } from "@/content/copy";
import { CLOSER_RENDER, hasRender } from "@/lib/renders";
import { LiveDot } from "./LiveDot";
import { MatchScene } from "./PitchScene";
import { Reveal } from "./Reveal";
import { Footer } from "./Footer";

export function Closer({ year }: { year: number }) {
  const render = hasRender(CLOSER_RENDER);

  return (
    <section aria-labelledby="closer-heading" className="closer on-dark">
      <div className="closer-bg">
        {render ? (
          <Image
            src={`/renders/${CLOSER_RENDER}`}
            alt={CLOSER.alt}
            fill
            loading="lazy"
            quality={70}
            sizes="100vw"
            className="closer-img"
          />
        ) : (
          <MatchScene />
        )}
      </div>

      <div className="closer-scrim" aria-hidden="true" />
      <div className="closer-lamps" aria-hidden="true">
        <span />
        <span />
      </div>

      <div className="closer-inner gutter">
        <Reveal className="closer-copy">
          <span className="eyebrow">
            <LiveDot />
            {CLOSER.eyebrow}
          </span>
          <h2
            id="closer-heading"
            className="display"
            style={{
              fontSize: "var(--h2-closer)",
              color: "var(--chalk)",
              margin: "26px 0 24px",
            }}
          >
            {em(CLOSER.heading)}
          </h2>
          <p style={{ fontSize: 19, color: "var(--chalk-2)", maxWidth: 500 }}>{CLOSER.sub}</p>

          <div className="closer-actions">
            <a href={CLOSER.primary.href} className="btn btn-primary-dark">
              {CLOSER.primary.label}
            </a>
            <Link href={CLOSER.secondary.href} className="btn btn-secondary-dark">
              {CLOSER.secondary.label}
            </Link>
          </div>
        </Reveal>

        <Footer year={year} />
      </div>
    </section>
  );
}
