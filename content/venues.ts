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
  /** Pin position as % of the hero render (2752x1536). Used by the fallback scenes. */
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
    pin: { x: 27.8, y: 65.0 },
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
    pin: { x: 33.1, y: 34.8 },
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
    pin: { x: 52.1, y: 43.2 },
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
    pin: { x: 80.5, y: 53.8 },
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
    pin: { x: 60.0, y: 22.0 },
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
    pin: { x: 74.9, y: 25.3 },
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
