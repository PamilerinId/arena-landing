export function Wordmark({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "var(--chalk)" : "var(--ink)";
  return (
    <span
      style={{ display: "inline-flex", alignItems: "center", gap: 10, color }}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect
          x="1.5"
          y="1.5"
          width="23"
          height="23"
          rx="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="13" cy="13" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13 1.5v3.4M13 21.1v3.4" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <span className="display display-sm" style={{ fontSize: 23, letterSpacing: "0.1em" }}>
        ARENA
      </span>
    </span>
  );
}
