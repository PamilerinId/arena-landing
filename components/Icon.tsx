type IconName =
  | "search"
  | "pin"
  | "calendar"
  | "clock"
  | "arrow-right"
  | "check"
  | "football"
  | "basketball"
  | "tennis"
  | "padel"
  | "badminton"
  | "volleyball"
  | "swimming"
  | "gym";

const PATHS: Record<IconName, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.3" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3.5v3M16 3.5v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  "arrow-right": <path d="M4.5 12h15m-5.5-5.5L19.5 12 14 17.5" />,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  football: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5l3.8 2.8-1.4 4.5H9.6L8.2 10.3 12 7.5Z" />
      <path d="M12 3.5v4M4.3 9.6l3.9.7M19.7 9.6l-3.9.7M7.4 19.6l2.2-4.8M16.6 19.6l-2.2-4.8" />
    </>
  ),
  basketball: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v17M3.5 12h17M6 6a9 9 0 0 1 0 12M18 6a9 9 0 0 0 0 12" />
    </>
  ),
  tennis: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M5 6.5a9 9 0 0 1 4.2 11.8M19 6.5a9 9 0 0 0-4.2 11.8" />
    </>
  ),
  padel: (
    <>
      <path d="M12 3.5c3.9 0 6.5 2.9 6.5 6.6 0 3.6-2.6 6.4-6.5 6.4s-6.5-2.8-6.5-6.4C5.5 6.4 8.1 3.5 12 3.5Z" />
      <path d="M12 16.5v4" />
      <circle cx="9.7" cy="9" r="0.8" />
      <circle cx="14.3" cy="9" r="0.8" />
      <circle cx="12" cy="12.2" r="0.8" />
    </>
  ),
  badminton: (
    <>
      <path d="M13.5 3.5 20 10l-5.5 1.5L10.5 7 13.5 3.5Z" />
      <path d="M11.5 10.5 4 18l2 2 7.5-7.5" />
      <path d="M13.5 3.5 10.5 7M16.7 5.2l-3.3 3.6M18.6 8l-3 2.7" />
    </>
  ),
  volleyball: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12c-2.7-3-6.1-4.4-8.4-4.2M12 12c.3 4-1.3 7.2-3.2 8.4M12 12c3.3 1.7 5.3 4.6 5.6 6.9" />
    </>
  ),
  swimming: (
    <>
      <path d="M3 17.5c1.8-1.6 3.2-1.6 4.5 0 1.3 1.6 2.7 1.6 4.5 0 1.3-1.6 2.7-1.6 4.5 0 1.3 1.6 2.7 1.6 4.5 0" />
      <path d="M6.5 13.2 12 9.5l4 2.2" />
      <circle cx="17.5" cy="7" r="1.8" />
    </>
  ),
  gym: (
    <>
      <path d="M3 10v4M6 8v8M18 8v8M21 10v4M6 12h12" />
    </>
  ),
};

export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

export type { IconName };
