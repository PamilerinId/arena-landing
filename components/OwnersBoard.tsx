"use client";

import Link from "next/link";
import { em } from "@/lib/em";
import { OWNERS } from "@/content/copy";
import {
  BOOKED_HOURS,
  DAY_LABELS,
  OCCUPANCY,
  TIME_LABELS,
} from "@/content/occupancy";
import { WHATSAPP_NUMBER } from "@/content/placeholders";
import { SAMPLE_SETTLED_NAIRA, formatNaira } from "@/content/venues";
import { track } from "@/lib/track";
import { Reveal } from "./Reveal";
import { Tilt } from "./Tilt";

export function OwnersBoard({ week, range }: { week: number; range: string }) {
  return (
    <section id="owners" aria-labelledby="owners-heading" className="owners gutter">
      <Reveal className="owners-copy">
        <span className="eyebrow eyebrow-ink">{OWNERS.eyebrow}</span>
        <h2 id="owners-heading" className="display h2" style={{ margin: "18px 0 20px" }}>
          {em(OWNERS.heading)}
        </h2>
        <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520 }}>{OWNERS.sub}</p>

        <ul className="owners-rows">
          {OWNERS.rows.map((r) => (
            <li key={r.title}>
              <b>{r.title}</b>
              <span>{r.body}</span>
            </li>
          ))}
        </ul>

        <div className="owners-actions">
          <Link
            href={OWNERS.primary.href}
            className="btn btn-primary-light"
            onClick={() => track("list_venue_click", { source: "owners" })}
          >
            {OWNERS.primary.label}
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            className="btn btn-secondary-light"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track("cta_click", { label: OWNERS.secondary.label, section: "owners" })
            }
          >
            {OWNERS.secondary.label}
          </a>
        </div>
      </Reveal>

      <Reveal delay={120} className="owners-board">
        <Tilt dir="right">
          <div className="owners-plane">
            <div className="owners-plane-head">
              <b>
                {OWNERS.board.venue} · Week {week}
              </b>
              <span>{range}</span>
            </div>

            <div className="owners-grid">
              <span />
              {DAY_LABELS.map((d, i) => (
                <span key={i} className="colhead owners-day">
                  {d}
                </span>
              ))}

              {TIME_LABELS.map((t, row) => (
                <Row key={t} label={t} row={row} />
              ))}
            </div>

            <ul className="owners-legend">
              {OWNERS.board.legend.map((l, i) => (
                <li key={l}>
                  <i className={`swatch swatch-${i}`} aria-hidden="true" />
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </Tilt>

        <p className="owners-stat">
          <span className="display">{BOOKED_HOURS} hrs</span>
          <span>
            {OWNERS.board.footNote} · {formatNaira(SAMPLE_SETTLED_NAIRA)} settled to the
            venue&rsquo;s account
          </span>
        </p>
      </Reveal>
    </section>
  );
}

function Row({ label, row }: { label: string; row: number }) {
  return (
    <>
      <span className="owners-time">{label}</span>
      {DAY_LABELS.map((_, col) => {
        const i = row * 7 + col;
        const state = OCCUPANCY[i];
        return (
          <span
            key={col}
            className={`owners-cell owners-cell-${state}`}
            style={{ "--i": i } as React.CSSProperties}
          />
        );
      })}
    </>
  );
}
