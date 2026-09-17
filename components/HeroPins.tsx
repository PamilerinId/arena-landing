import { SLOTS, formatNaira } from "@/content/venues";

/**
 * Live pins over the pitch. Rendered only with the built-in scene; the shipped
 * render has its labels baked in. Coordinates live in content/venues.ts.
 */
export function HeroPins() {
  return (
    <div className="hero-pins" aria-hidden="true">
      {SLOTS.map((s) => (
        <span
          key={s.slug}
          className="hero-pin"
          style={{ left: `${s.pin.x}%`, top: `${s.pin.y}%` }}
        >
          <span className="hero-pin-label">
            <b>{s.venue}</b>
            <i>
              {formatNaira(s.price)}, {s.time}, {s.sport}
              {s.tag ? `, ${s.tag}` : ""}
            </i>
          </span>
          <span className="hero-pin-dot" />
        </span>
      ))}
    </div>
  );
}
