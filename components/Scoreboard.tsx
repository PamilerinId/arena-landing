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
      <Markings />

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
              <div className="scoreboard-colhead" aria-hidden="true">
                {SCOREBOARD.columns.map((c) => (
                  <span key={c} className="colhead">
                    {c}
                  </span>
                ))}
                <span />
                <span />
              </div>

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

function Markings() {
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
      <ellipse cx="720" cy="450" rx="220" ry="220" />
      <path d="M720 0v900M0 450h1440" />
    </svg>
  );
}
