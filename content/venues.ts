export type SportSlug =
  | "football"
  | "basketball"
  | "tennis"
  | "padel"
  | "badminton"
  | "volleyball"
  | "swimming"
  | "gym";

export type Slot = {
  slug: string;
  time: string;
  venue: string;
  area: string;
  sport: string;
  sportSlug: SportSlug;
  /** Naira, whole units. Formatted at render time. */
  price: number;
  /** Availability tag. Empty string renders nothing. */
  tag: string;
  /** Pin position on the hero render, as % of the render box. */
  pin: { x: number; y: number };
};

export const SLOTS: Slot[] = [
  {
    slug: "greenfield-turf",
    time: "18:00",
    venue: "Greenfield Turf",
    area: "Lekki Phase 1",
    sport: "5-a-side football",
    sportSlug: "football",
    price: 18000,
    tag: "1 left",
    pin: { x: 22, y: 52 },
  },
  {
    slug: "yaba-sports-hub",
    time: "19:00",
    venue: "Yaba Sports Hub",
    area: "Yaba",
    sport: "7-a-side football",
    sportSlug: "football",
    price: 25000,
    tag: "",
    pin: { x: 30, y: 30 },
  },
  {
    slug: "island-padel-club",
    time: "19:00",
    venue: "Island Padel Club",
    area: "Victoria Island",
    sport: "Padel",
    sportSlug: "padel",
    price: 20000,
    tag: "2 courts",
    pin: { x: 50, y: 41 },
  },
  {
    slug: "astro-park-surulere",
    time: "20:00",
    venue: "Astro Park Surulere",
    area: "Surulere",
    sport: "5-a-side football",
    sportSlug: "football",
    price: 15000,
    tag: "",
    pin: { x: 80, y: 47 },
  },
  {
    slug: "ikeja-courts-club",
    time: "20:00",
    venue: "Ikeja Courts Club",
    area: "Ikeja GRA",
    sport: "Tennis",
    sportSlug: "tennis",
    price: 8000,
    tag: "",
    pin: { x: 64, y: 21 },
  },
  {
    slug: "akoka-hoops",
    time: "21:00",
    venue: "Akoka Hoops",
    area: "Akoka",
    sport: "Basketball · half court",
    sportSlug: "basketball",
    price: 10000,
    tag: "Floodlit",
    pin: { x: 85, y: 31 },
  },
];

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export function formatNaira(value: number): string {
  return naira.format(value);
}

/** Sample figure for the owners board. Not derived from the occupancy grid. */
export const SAMPLE_SETTLED_NAIRA = 486000;
