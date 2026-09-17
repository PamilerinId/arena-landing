"use client";

import Link from "next/link";
import { SPORTS } from "@/content/copy";
import { track } from "@/lib/track";
import { Icon, type IconName } from "./Icon";

export function SportsRow() {
  return (
    <section id="sports" aria-label="Sports" className="sports-row gutter">
      <span className="eyebrow eyebrow-ink">{SPORTS.label}</span>
      <nav className="sports-list no-scrollbar" aria-label="Browse by sport">
        {SPORTS.items.map((s) => (
          <Link
            key={s.slug}
            href={`/search?sport=${s.slug}`}
            className="sport-link"
            onClick={() => track("sport_click", { sport: s.slug })}
          >
            <Icon name={s.slug as IconName} size={19} />
            {s.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
