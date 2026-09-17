/** 8 time bands x 7 days. 0 = on sale, 1 = booked through Arena, 2 = blocked by the venue. */
export type CellState = 0 | 1 | 2;

export const OCCUPANCY: CellState[] = [
  0, 0, 1, 0, 0, 1, 1,
  0, 0, 0, 0, 0, 1, 1,
  0, 0, 0, 0, 0, 1, 0,
  0, 0, 0, 0, 0, 1, 1,
  0, 1, 0, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1,
  1, 0, 1, 1, 1, 2, 2,
];

export const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"] as const;

/** One label per 2h band, top to bottom. */
export const TIME_LABELS = [
  "07:00",
  "09:00",
  "11:00",
  "13:00",
  "15:00",
  "17:00",
  "19:00",
  "21:00",
] as const;

/** Each cell stands for a 2h band, so a booked cell is 2 hours of inventory. */
export const HOURS_PER_CELL = 2;

export const BOOKED_HOURS =
  OCCUPANCY.filter((c) => c === 1).length * HOURS_PER_CELL;
