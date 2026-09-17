import { SLOTS, formatNaira } from "@/content/venues";
import { passing } from "@/lib/passing";

/** The plan's own space. Everything below is in these units. */
const W = 900;
const H = 560;

/** The pitch, inset so the goals and the outermost labels have room. */
const P = { x: 24, y: 34, w: 852, h: 492 };
const MID = P.x + P.w / 2;
const CY = P.y + P.h / 2;
const BOX = { d: 150, h: 300 };
const SIX = { d: 58, h: 146 };

const HOLD = 1.15; // seconds the ball rests at a venue
const SPEED = 380; // plan units per second while passing
const RING = 0.9; // seconds for the arrival pulse

/** The passing pattern. Every venue is a pin; these are the ones in the move. */
const SEQUENCE = [
  "yaba-sports-hub",
  "island-padel-club",
  "akoka-hoops",
  "astro-park-surulere",
  "island-padel-club",
  "yaba-sports-hub",
] as const;

const bySlug = new Map(SLOTS.map((s) => [s.slug, s]));
const move = passing(
  SEQUENCE.map((slug) => {
    const s = bySlug.get(slug);
    if (!s) throw new Error(`HeroPitch: unknown venue ${slug}`);
    return s.spot;
  }),
  { hold: HOLD, speed: SPEED },
);

const f = (n: number) => n.toFixed(4);

/**
 * The pitch drawn over the hero film, to the right of the copy: markings in
 * hairline, a pin per venue, and the ball moving between them. Desktop only
 * and never interactive — .hero-pitch in CSS hides it below 1024 and under
 * reduced motion.
 */
export function HeroPitch() {
  return (
    <svg
      className="hero-pitch"
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hero-pitch-wash" cx="50%" cy="50%" r="64%">
          <stop offset="0" stopColor="#050f09" stopOpacity="0.62" />
          <stop offset="0.55" stopColor="#050f09" stopOpacity="0.4" />
          <stop offset="1" stopColor="#050f09" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect
        x={-140}
        y={-110}
        width={W + 280}
        height={H + 220}
        fill="url(#hero-pitch-wash)"
      />

      <g className="hero-pitch-lines">
        <rect x={P.x} y={P.y} width={P.w} height={P.h} rx="2" />
        <line x1={MID} y1={P.y} x2={MID} y2={P.y + P.h} />
        <circle cx={MID} cy={CY} r="72" />
        <circle cx={MID} cy={CY} r="6" className="hero-pitch-spot" />

        {/* boxes, spots and goals, mirrored either end */}
        {[0, 1].map((side) => {
          const flip = side === 1;
          const x = (d: number) => (flip ? P.x + P.w - d : P.x);
          return (
            <g key={side}>
              <rect x={x(BOX.d)} y={CY - BOX.h / 2} width={BOX.d} height={BOX.h} />
              <rect x={x(SIX.d)} y={CY - SIX.h / 2} width={SIX.d} height={SIX.h} />
              <circle
                cx={flip ? P.x + P.w - 100 : P.x + 100}
                cy={CY}
                r="6"
                className="hero-pitch-spot"
              />
              <rect
                x={flip ? P.x + P.w : P.x - 12}
                y={CY - 42}
                width="12"
                height="84"
                className="hero-pitch-goal"
              />
            </g>
          );
        })}

        {/* corner arcs */}
        {[
          [P.x, P.y, 0],
          [P.x + P.w, P.y, 90],
          [P.x + P.w, P.y + P.h, 180],
          [P.x, P.y + P.h, 270],
        ].map(([cx, cy, rot], i) => (
          <path
            key={i}
            d="M 0 20 A 20 20 0 0 0 20 0"
            transform={`translate(${cx} ${cy}) rotate(${rot})`}
          />
        ))}
      </g>

      {/* the formation: a dotted line creeping in the passing direction */}
      <path className="hero-pitch-formation" d={move.path}>
        <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.6s" repeatCount="indefinite" />
      </path>

      {/* each pass draws in as the ball travels, then fades */}
      {move.segments.map((s, i) => {
        const { depart, travel } = move.timing[i];
        const drawn = f(travel / move.cycle);
        const hold = f((travel + 0.9) / move.cycle);
        const gone = f((travel + 2.2) / move.cycle);
        return (
          <line
            key={i}
            className="hero-pitch-pass"
            x1={s.a.x}
            y1={s.a.y}
            x2={s.b.x}
            y2={s.b.y}
            strokeDasharray={s.len}
            strokeDashoffset={s.len}
            opacity="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              values={`${s.len};0;0`}
              keyTimes={`0;${drawn};1`}
              dur={`${move.cycle}s`}
              begin={`${f(depart)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.85;0.85;0;0"
              keyTimes={`0;${hold};${gone};1`}
              dur={`${move.cycle}s`}
              begin={`${f(depart)}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}

      {/* the receiver's pin pulses on arrival */}
      {move.segments.map((s, i) => {
        const end = f(RING / move.cycle);
        return (
          <circle key={i} className="hero-pitch-ring" cx={s.b.x} cy={s.b.y} r="12" opacity="0">
            <animate attributeName="r" values="12;52;52" keyTimes={`0;${end};1`} dur={`${move.cycle}s`} begin={`${f(move.timing[i].arrive)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0" keyTimes={`0;${end};1`} dur={`${move.cycle}s`} begin={`${f(move.timing[i].arrive)}s`} repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* a pin and its label per venue; labels turn inward near the touchline */}
      {SLOTS.map((s) => {
        const right = s.spot.x > MID;
        const dx = right ? -26 : 26;
        return (
          <g key={s.slug} className="hero-pitch-pin">
            <circle cx={s.spot.x} cy={s.spot.y} r="16" className="hero-pitch-halo" />
            <circle cx={s.spot.x} cy={s.spot.y} r="7" className="hero-pitch-dot" />
            <text
              x={s.spot.x + dx}
              y={s.spot.y - 5}
              textAnchor={right ? "end" : "start"}
              className="hero-pitch-venue"
            >
              {s.venue}
            </text>
            <text
              x={s.spot.x + dx}
              y={s.spot.y + 22}
              textAnchor={right ? "end" : "start"}
              className="hero-pitch-meta"
            >
              {s.time} · {formatNaira(s.price)}
            </text>
          </g>
        );
      })}

      {/* the ball */}
      <g>
        <circle r="24" className="hero-pitch-ball-glow" />
        <circle r="9" className="hero-pitch-ball" />
        <animateMotion
          dur={`${move.cycle}s`}
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints={move.keyPoints}
          keyTimes={move.keyTimes}
          path={move.path}
        />
      </g>
    </svg>
  );
}
