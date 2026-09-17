import { CANCELLATION_HOURS, TAKE_RATE_PCT, ph } from "./placeholders";

export const NAV = {
  links: [
    { label: "Find a venue", href: "#top" },
    { label: "Sports", href: "#sports" },
    { label: "How it works", href: "#how-it-works" },
    { label: "For venue owners", href: "#owners" },
  ],
  login: { label: "Log in", href: "/login" },
  cta: { label: "List your venue", href: "/list-your-venue" },
} as const;

export const HERO = {
  eyebrow: "Lagos · Private pitches, courts & gyms",
  headline: ["Book the pitch.", "Skip the phone calls."],
  sub: "Real-time availability at private astroturf pitches, courts and gyms across Lagos. Pick a slot, pay by card or transfer, confirmed in seconds.",
  alt: "Floodlit private five-a-side pitch in Lagos, viewed from above, with tonight's open slots pinned",
} as const;

export const SEARCH = {
  fields: {
    sport: { label: "Sport", options: ["Football · 5-a-side", "Football · 7-a-side", "Basketball", "Tennis", "Padel", "Badminton", "Volleyball", "Swimming", "Gym"] },
    area: { label: "Where", placeholder: "Lekki, Yaba, Ikeja, Surulere…" },
    date: { label: "When", placeholder: "Today" },
    time: { label: "Time", options: ["From 6:00 PM", "From 7:00 PM", "From 8:00 PM", "From 9:00 PM", "Any time"] },
  },
  submit: "Find slots",
} as const;

export const SPORTS = {
  label: "Sports",
  items: [
    { label: "Football", slug: "football" },
    { label: "Basketball", slug: "basketball" },
    { label: "Tennis", slug: "tennis" },
    { label: "Padel", slug: "padel" },
    { label: "Badminton", slug: "badminton" },
    { label: "Volleyball", slug: "volleyball" },
    { label: "Swimming", slug: "swimming" },
    { label: "Gym", slug: "gym" },
  ],
} as const;

export const HOW = {
  eyebrow: "How it works",
  heading: "Desk. Traffic. Kick-off.",
  intro:
    "Every venue on Arena keeps its calendar on Arena. What you see is what is actually free — no double bookings, no deposits sent to a phone number.",
  vignettes: [
    "5:30 PM · At your desk",
    "6:15 PM · On the bridge",
    "7:00 PM · Kick-off",
  ],
  steps: [
    {
      n: "01",
      title: "Book it before you leave",
      body: "Sport, area, time — pay in the app and it is done before you close the laptop. Only slots the venue has marked open ever show up.",
    },
    {
      n: "02",
      title: "Sit in traffic knowing it is yours",
      body: "The venue already has your name on the board. No “we gave it to someone else”, no deposit chasing on WhatsApp.",
    },
    {
      n: "03",
      title: "Walk through the gate and play",
      body: `Split the cost with your team from the booking link. Cancel up to ${ph(CANCELLATION_HOURS)} hours before kick-off for an automatic refund.`,
    },
  ],
} as const;

export const SCOREBOARD = {
  eyebrow: "Live availability",
  heading: "Tonight in Lagos.",
  tabs: ["All sports", "Football", "Padel", "Tennis", "Basketball"],
  columns: ["Kick-off", "Venue", "Area", "Sport", "Per hour"],
  note: "Prices are set by each venue and shown per hour.",
  cta: { label: "Browse all venues", href: "/search" },
} as const;

export const OWNERS = {
  eyebrow: "For venue owners",
  heading: "Your empty hours are inventory.",
  sub: "List your pitch, court or gym once. Arena sells the off-peak slots you are not filling, takes payment upfront so no-shows do not cost you, and settles straight to your bank account.",
  rows: [
    {
      title: "Paid upfront, every time",
      body: "A slot is only held once the player has paid. Late cancellations follow the policy you set.",
    },
    {
      title: "One board for everything",
      body: "Walk-ins, WhatsApp bookings and Arena bookings on the same calendar, so a slot is never sold twice.",
    },
    {
      title: "Payouts to your bank account",
      body: "Every booking itemised and settled to your Nigerian bank account. No cash to reconcile at the end of the night.",
    },
    {
      title: "No listing fee",
      body: `Arena earns ${ph(TAKE_RATE_PCT)}% on each completed booking. If we do not fill a slot, you pay nothing.`,
    },
  ],
  primary: { label: "List your venue", href: "/list-your-venue" },
  secondary: { label: "Talk to us on WhatsApp" },
  board: {
    venue: "Greenfield Turf",
    legend: ["Booked through Arena", "On sale", "Blocked by you"],
    footNote: "sold through Arena this week",
  },
} as const;

export const TRUST = [
  {
    title: "Verified venues",
    body: "Every listing is visited and checked by our team before it goes live.",
  },
  {
    title: "Secure payments",
    body: "Card, transfer and USSD through Paystack. Arena never stores your card details.",
  },
  {
    title: "Free cancellation",
    body: `Cancel up to ${ph(CANCELLATION_HOURS)} hours before kick-off and the refund goes back automatically.`,
  },
  {
    title: "Support that answers",
    body: "Real people on WhatsApp and in the app, seven days a week.",
  },
] as const;

export const CLOSER = {
  eyebrow: "Kick-off was 19:00",
  heading: "They’re already playing.",
  sub: "Your next game is one search away. Find a slot, pay once, show up.",
  primary: { label: "Find a slot", href: "#top" },
  secondary: { label: "List your venue", href: "/list-your-venue" },
  alt: "Silhouetted players mid-match under floodlights",
} as const;

export const FOOTER = {
  blurb: "Book football pitches, courts and gyms across Lagos. Built in Lagos.",
  columns: [
    {
      title: "Players",
      links: [
        { label: "Find a venue", href: "#top" },
        { label: "Sports", href: "#sports" },
        { label: "How it works", href: "#how-it-works" },
        { label: "Help centre", href: "/login" },
      ],
    },
    {
      title: "Venues",
      links: [
        { label: "List your venue", href: "/list-your-venue" },
        { label: "Owner dashboard", href: "/login" },
        { label: "Pricing", href: "/list-your-venue" },
        { label: "Contact sales", href: "/list-your-venue" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/list-your-venue" },
        { label: "Careers", href: "/list-your-venue" },
        { label: "Privacy", href: "/list-your-venue" },
        { label: "Terms", href: "/list-your-venue" },
      ],
    },
  ],
  legal: "Lagos, Nigeria",
} as const;

export const META = {
  title: "Arena — Book football pitches, courts and gyms in Lagos",
  description:
    "Real-time availability at private astroturf pitches, courts and gyms across Lagos. Pay by card or transfer, confirmed in seconds.",
} as const;
