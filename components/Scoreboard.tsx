"use client";

import Link from "next/link";
import { useState } from "react";
import { SCOREBOARD } from "@/content/copy";
import { SLOTS, formatNaira } from "@/content/venues";
import { track } from "@/lib/track";
import { Icon } from "./Icon";
import { LiveDot } from "./LiveDot";
import { Reveal } from "./Reveal";
import { Tilt } from "./Tilt";
import { Turf } from "./Turf";

const SCRIM =
  "linear-gradient(180deg, rgba(5,16,9,.74), rgba(5,16,9,.66) 50%, rgba(5,16,9,.84))";

export function Scoreboard({ today }: { today: string }) {
  const [tab, setTab] = useState<string>(SCOREBOARD.tabs[0]);

  const rows =
    tab === SCOREBOARD.tabs[0]
      ? SLOTS
      : SLOTS.filter((s) => s.sportSlug === tab.toLowerCase());

  return (
    <section
      aria-labelledby="scoreboard-heading"
      className="turf-section scoreboard on-dark"
    >
      <Turf />
      <div className="scoreboard-scrim" style={{ background: SCRIM }} aria-hidden="true" />
      <Markings sport={sportFor(tab)} />

      <div className="scoreboard-inner gutter">
        <Reveal className="scoreboard-header">
          <div>
            <span className="eyebrow">
              <LiveDot />
              {SCOREBOARD.eyebrow} · {today}
            </span>
            <h2
              id="scoreboard-heading"
              className="display h2"
              style={{ marginTop: 18, color: "var(--chalk)" }}
            >
              {SCOREBOARD.heading}
            </h2>
          </div>

          <div className="scoreboard-tabs no-scrollbar" role="tablist" aria-label="Filter by sport">
            {SCOREBOARD.tabs.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={t === tab}
                className={`scoreboard-tab${t === tab ? " is-active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <Tilt dir="left">
            <div className="scoreboard-plane">
              {rows.map((s) => (
                <Link
                  key={s.slug}
                  href={`/search?venue=${s.slug}&time=${s.time}`}
                  className="scoreboard-row"
                  aria-label={`Book ${s.venue} at ${s.time}`}
                  onClick={() => track("slot_row_click", { venue: s.slug, time: s.time })}
                >
                  <span className="display tabular scoreboard-time">{s.time}</span>
                  <span className="scoreboard-venue">
                    {s.venue}
                    <em className="scoreboard-meta">
                      {s.area} · {s.sport}
                      {s.tag ? <b className="scoreboard-meta-tag"> · {s.tag}</b> : null}
                    </em>
                  </span>
                  <span className="scoreboard-cell">{s.area}</span>
                  <span className="scoreboard-cell">{s.sport}</span>
                  <span className="tabular scoreboard-price">{formatNaira(s.price)}</span>
                  <span className="scoreboard-tag">{s.tag}</span>
                  <span className="scoreboard-arrow">
                    <Icon name="arrow-right" size={18} />
                  </span>
                </Link>
              ))}
            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={150} className="scoreboard-footer">
          <p style={{ fontSize: 14, color: "var(--chalk-3)" }}>{SCOREBOARD.note}</p>
          <Link
            href={SCOREBOARD.cta.href}
            className="btn btn-primary-dark"
            onClick={() =>
              track("cta_click", { label: SCOREBOARD.cta.label, section: "scoreboard" })
            }
          >
            {SCOREBOARD.cta.label}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

type CourtSport = "football" | "padel" | "tennis" | "basketball";

/** "All sports" reads as the pitch; the others draw their own court. */
function sportFor(tab: string): CourtSport {
  const t = tab.toLowerCase();
  if (t === "padel" || t === "tennis" || t === "basketball") return t;
  return "football";
}

const COURTS: CourtSport[] = ["football", "padel", "tennis", "basketball"];

/**
 * Faint court markings under the board. One <g> per sport, all mounted, only
 * the active one visible; the crossfade is a CSS opacity transition.
 */
function Markings({ sport }: { sport: CourtSport }) {
  return (
    <svg
      className="scoreboard-markings"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.14"
      strokeWidth="2"
    >
      {COURTS.map((c) => (
        <g key={c} className="court" data-active={c === sport ? "" : undefined}>
          {c === "football" && <FootballLines />}
          {c === "padel" && <PadelLines />}
          {c === "tennis" && <TennisLines />}
          {c === "basketball" && <BasketballLines />}
        </g>
      ))}
    </svg>
  );
}

function FootballLines() {
  return (
    <>
      <circle cx="720" cy="450" r="220" />
      <circle cx="720" cy="450" r="5" fill="#ffffff" fillOpacity="0.14" stroke="none" />
      <path d="M720 0v900M0 450h1440" />
      <path d="M0 140h300v620H0M1440 140h-300v620h300" />
      <path d="M0 300h120v300H0M1440 300h-120v300h120" />
    </>
  );
}

function PadelLines() {
  // 20 x 10 m court, drawn 1240 x 620, walls as a heavier outer line.
  return (
    <>
      <rect x="100" y="140" width="1240" height="620" strokeWidth="4" />
      <path d="M720 140v620" strokeDasharray="10 12" />
      <path d="M286 140v620M1154 140v620" />
      <path d="M286 450h868" />
    </>
  );
}

function TennisLines() {
  // Doubles court 23.77 x 10.97 m, drawn 1200 x 554.
  return (
    <>
      <rect x="120" y="173" width="1200" height="554" />
      <path d="M120 243h1200M120 657h1200" />
      <path d="M436 243v414M1004 243v414" />
      <path d="M436 450h568" />
      <path d="M720 173v554" strokeDasharray="10 12" />
      <path d="M120 450h30M1290 450h30" />
    </>
  );
}

function BasketballLines() {
  // 28 x 15 m court, drawn 1260 x 675.
  return (
    <>
      <rect x="90" y="112" width="1260" height="675" />
      <path d="M720 112v675" />
      <circle cx="720" cy="450" r="80" />
      <rect x="90" y="340" width="260" height="220" />
      <rect x="1090" y="340" width="260" height="220" />
      <path d="M350 370a80 80 0 0 1 0 160M1090 370a80 80 0 0 0 0-160" />
      <path d="M90 150h60a300 300 0 0 1 0 600H90M1350 150h-60a300 300 0 0 0 0 600h60" />
      <circle cx="160" cy="450" r="10" />
      <circle cx="1280" cy="450" r="10" />
    </>
  );
}
