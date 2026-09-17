import { SLOTS } from "@/content/venues";

/** Render size. The overlay uses the same cover crop as the hero image. */
const W = 2752;
const H = 1536;

/** The passing pattern. Greenfield is skipped: its pin sits in the headline. */
const SEQUENCE = [
  "yaba-sports-hub",
  "island-padel-club",
  "akoka-hoops",
  "astro-park-surulere",
  "island-padel-club",
  "yaba-sports-hub",
] as const;

const HOLD = 1.15; // seconds the ball rests at each venue
const SPEED = 1150; // render px per second while passing
const RING = 0.9; // seconds for the arrival pulse

const bySlug = new Map(SLOTS.map((s) => [s.slug, s]));
const points = SEQUENCE.map((slug) => {
  const s = bySlug.get(slug);
  if (!s) throw new Error(`HeroPlay: unknown venue ${slug}`);
  return { x: (s.pin.x / 100) * W, y: (s.pin.y / 100) * H };
});

const segments = points.slice(1).map((b, i) => {
  const a = points[i];
  return { a, b, len: Math.hypot(b.x - a.x, b.y - a.y) };
});
const total = segments.reduce((n, s) => n + s.len, 0);

// One shared timeline so the ball, lines and rings stay in step.
const keyTimes: number[] = [0];
const keyPoints: number[] = [0];
const timing = segments.map((s) => {
  const depart = keyTimes[keyTimes.length - 1] + HOLD;
  const travel = s.len / SPEED;
  const arrive = depart + travel;
  const from = keyPoints[keyPoints.length - 1];
  keyTimes.push(depart, arrive);
  keyPoints.push(from, from + s.len / total);
  return { depart, travel, arrive };
});
const CYCLE = keyTimes[keyTimes.length - 1] + HOLD;
keyTimes.push(CYCLE);
keyPoints.push(1);

const f = (n: number) => n.toFixed(4);
const KT = keyTimes.map((t) => f(t / CYCLE)).join(";");
const KP = keyPoints.map(f).join(";");
const PATH = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(0)} ${p.y.toFixed(0)}`).join(" ");

/**
 * Passing animation over the hero render. Pure SVG + SMIL, no script.
 * Hidden under prefers-reduced-motion and on phones via .hero-play in CSS.
 */
export function HeroPlay() {
  return (
    <svg
      className="hero-play"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="flare">
          <stop offset="0" stopColor="#f2fbd2" stopOpacity="0.92" />
          <stop offset="0.3" stopColor="#d3f07a" stopOpacity="0.3" />
          <stop offset="1" stopColor="#c9f26a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* floodlights: a slow breath with the odd flicker on the main mast */}
      <g style={{ mixBlendMode: "screen" }}>
        <g opacity="0.7">
          <animate
            attributeName="opacity"
            values="0.5;0.85;0.5"
            dur="5.5s"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.6 1;0.4 0 0.6 1"
          />
          <circle cx="1438" cy="20" r="470" fill="url(#flare)">
            <animate
              attributeName="opacity"
              values="1;1;0.55;1;0.8;1;1"
              keyTimes="0;0.61;0.625;0.645;0.67;0.69;1"
              dur="8.5s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
        <circle cx="330" cy="0" r="300" fill="url(#flare)" opacity="0.3">
          <animate attributeName="opacity" values="0.22;0.4;0.22" dur="7s" begin="1.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="2430" cy="0" r="300" fill="url(#flare)" opacity="0.3">
          <animate attributeName="opacity" values="0.24;0.42;0.24" dur="6.2s" begin="2.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* the formation: a dotted line that creeps in the passing direction */}
      <path
        d={PATH}
        fill="none"
        stroke="rgba(247,245,239,0.28)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="2 14"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="1.6s" repeatCount="indefinite" />
      </path>

      {/* each pass draws in as the ball travels, then fades */}
      {segments.map((s, i) => {
        const { depart, travel } = timing[i];
        const drawn = f(travel / CYCLE);
        const hold = f((travel + 0.9) / CYCLE);
        const gone = f((travel + 2.2) / CYCLE);
        return (
          <line
            key={i}
            x1={s.a.x}
            y1={s.a.y}
            x2={s.b.x}
            y2={s.b.y}
            stroke="rgba(247,245,239,0.75)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={s.len}
            strokeDashoffset={s.len}
            opacity="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              values={`${s.len};0;0`}
              keyTimes={`0;${drawn};1`}
              dur={`${CYCLE}s`}
              begin={`${f(depart)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.8;0.8;0;0"
              keyTimes={`0;${hold};${gone};1`}
              dur={`${CYCLE}s`}
              begin={`${f(depart)}s`}
              repeatCount="indefinite"
            />
          </line>
        );
      })}

      {/* the receiver's pin pulses on arrival */}
      {segments.map((s, i) => {
        const { arrive } = timing[i];
        const end = f(RING / CYCLE);
        return (
          <circle
            key={i}
            cx={s.b.x}
            cy={s.b.y}
            r="14"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="3"
            opacity="0"
          >
            <animate attributeName="r" values="14;48;48" keyTimes={`0;${end};1`} dur={`${CYCLE}s`} begin={`${f(arrive)}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0;0" keyTimes={`0;${end};1`} dur={`${CYCLE}s`} begin={`${f(arrive)}s`} repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* the ball */}
      <g>
        <circle r="30" fill="var(--accent)" opacity="0.22" />
        <circle r="11" fill="var(--accent)" />
        <animateMotion
          dur={`${CYCLE}s`}
          repeatCount="indefinite"
          calcMode="linear"
          keyPoints={KP}
          keyTimes={KT}
          path={PATH}
        />
      </g>
    </svg>
  );
}
