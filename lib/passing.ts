/**
 * The passing loop's timing, shared by the hero overlays. One timeline so the
 * ball, the lines that draw behind it and the arrival rings stay in step.
 */

export type Point = { x: number; y: number };
export type Pass = { a: Point; b: Point; len: number };
export type Timing = { depart: number; travel: number; arrive: number };

export type Passing = {
  segments: Pass[];
  timing: Timing[];
  /** Seconds for one full circuit. */
  cycle: number;
  /** The path the ball follows, for animateMotion and the dotted formation. */
  path: string;
  /** keyTimes and keyPoints for animateMotion, as SMIL wants them. */
  keyTimes: string;
  keyPoints: string;
};

const f = (n: number) => n.toFixed(4);

export function passing(
  points: Point[],
  { hold, speed }: { hold: number; speed: number },
): Passing {
  const segments = points.slice(1).map((b, i) => {
    const a = points[i];
    return { a, b, len: Math.hypot(b.x - a.x, b.y - a.y) };
  });
  const total = segments.reduce((n, s) => n + s.len, 0);

  const times: number[] = [0];
  const stops: number[] = [0];
  const timing = segments.map((s) => {
    const depart = times[times.length - 1] + hold;
    const travel = s.len / speed;
    const arrive = depart + travel;
    const from = stops[stops.length - 1];
    times.push(depart, arrive);
    stops.push(from, from + s.len / total);
    return { depart, travel, arrive };
  });

  const cycle = times[times.length - 1] + hold;
  times.push(cycle);
  stops.push(1);

  return {
    segments,
    timing,
    cycle,
    path: points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(0)} ${p.y.toFixed(0)}`).join(" "),
    keyTimes: times.map((t) => f(t / cycle)).join(";"),
    keyPoints: stops.map(f).join(";"),
  };
}
