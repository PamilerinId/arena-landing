/** Full-bleed turf fibre layer. Section supplies `background: var(--turf)`. */
export function Turf() {
  return (
    <div className="turf-fibres" aria-hidden="true">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <rect width="100%" height="100%" filter="url(#turf)" />
      </svg>
    </div>
  );
}

/** Defined once in the root layout and referenced by id. */
export function TurfFilterDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      focusable="false"
      style={{ position: "absolute" }}
    >
      <filter id="turf" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="1.1 0.05"
          numOctaves="3"
          seed="7"
          result="fibres"
        />
        <feColorMatrix
          in="fibres"
          type="matrix"
          values="0 0 0 0 0.078
                  0 0 0 0 0.322
                  0 0 0 0 0.149
                  0 0 0 0 1"
          result="green"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          seed="3"
          result="crumbNoise"
        />
        <feColorMatrix in="crumbNoise" type="luminanceToAlpha" result="crumbAlpha" />
        <feComponentTransfer in="crumbAlpha" result="crumb">
          <feFuncA type="discrete" tableValues="0 0 0 0.85" />
        </feComponentTransfer>
        <feComposite in="crumb" in2="green" operator="over" />
      </filter>
    </svg>
  );
}
