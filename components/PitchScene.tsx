/**
 * Built-in fallback scene, used until `public/renders/hero-pitch.jpg` exists.
 * Pure inline SVG: an oblique floodlit cage pitch. No raster, no request.
 */
export function PitchScene() {
  return (
    <svg
      viewBox="0 0 1440 1080"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="pitch-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#06110b" />
          <stop offset="0.35" stopColor="#0c2d17" />
          <stop offset="1" stopColor="#061209" />
        </linearGradient>
        <radialGradient id="flood" cx="0.5" cy="0.16" r="0.72">
          <stop offset="0" stopColor="#8fe08f" stopOpacity="0.30" />
          <stop offset="0.45" stopColor="#2f8a43" stopOpacity="0.14" />
          <stop offset="1" stopColor="#06110b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="turf-plane" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f4520" />
          <stop offset="0.5" stopColor="#176030" />
          <stop offset="1" stopColor="#0b3318" />
        </linearGradient>
        <pattern id="cage" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M0 0h22M0 0v22" stroke="rgba(190,205,195,.16)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="1080" fill="url(#pitch-bg)" />
      <rect width="1440" height="1080" fill="url(#flood)" />

      {/* pitch plane in perspective */}
      <polygon points="150,980 1290,980 1075,250 365,250" fill="url(#turf-plane)" />

      {/* mown bands */}
      <g opacity="0.16">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const t0 = i / 6;
          const t1 = (i + 0.5) / 6;
          const topL = 365 + (1075 - 365) * t0;
          const topR = 365 + (1075 - 365) * t1;
          const botL = 150 + (1290 - 150) * t0;
          const botR = 150 + (1290 - 150) * t1;
          return (
            <polygon
              key={i}
              points={`${botL},980 ${botR},980 ${topR},250 ${topL},250`}
              fill="#ffffff"
            />
          );
        })}
      </g>

      {/* markings */}
      <g
        fill="none"
        stroke="rgba(247,245,239,.62)"
        strokeWidth="3"
        strokeLinejoin="round"
      >
        <polygon points="178,960 1262,960 1058,268 382,268" />
        <path d="M204,614 L1236,614" />
        <ellipse cx="720" cy="614" rx="150" ry="74" />
        <polygon points="470,960 970,960 900,820 540,820" />
        <polygon points="540,268 900,268 866,372 574,372" />
      </g>

      {/* goals */}
      <g fill="none" stroke="rgba(247,245,239,.5)" strokeWidth="3">
        <path d="M600,960 L600,876 L840,876 L840,960" />
        <path d="M636,268 L636,214 L804,214 L804,268" />
      </g>

      {/* cage fence */}
      <g>
        <polygon points="0,1080 150,980 365,250 300,150 0,150" fill="url(#cage)" />
        <polygon points="1440,1080 1290,980 1075,250 1140,150 1440,150" fill="url(#cage)" />
        <rect x="300" y="150" width="840" height="100" fill="url(#cage)" />
      </g>
    </svg>
  );
}

/**
 * Fallback for the closer section: silhouettes under floodlights.
 * Used until `public/renders/closer-match.jpg` exists.
 */
export function MatchScene() {
  return (
    <svg
      viewBox="0 0 1440 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12304c" />
          <stop offset="0.55" stopColor="#0a1a2a" />
          <stop offset="1" stopColor="#060d12" />
        </linearGradient>
        <radialGradient id="lamp-l" cx="0.1" cy="0.05" r="0.4">
          <stop offset="0" stopColor="#eaf6ff" stopOpacity="0.62" />
          <stop offset="1" stopColor="#eaf6ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="lamp-r" cx="0.92" cy="0.06" r="0.4">
          <stop offset="0" stopColor="#eaf6ff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#eaf6ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="night-grass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#16401f" />
          <stop offset="1" stopColor="#07180c" />
        </linearGradient>
        <pattern id="night-cage" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M0 0h26M0 0v26" stroke="rgba(190,205,195,.12)" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="1440" height="1000" fill="url(#night-sky)" />
      <rect y="120" width="1440" height="530" fill="url(#night-cage)" />
      <rect width="1440" height="1000" fill="url(#lamp-l)" />
      <rect width="1440" height="1000" fill="url(#lamp-r)" />
      <rect y="640" width="1440" height="360" fill="url(#night-grass)" />
      <path
        d="M0 700h1440"
        stroke="rgba(247,245,239,.22)"
        strokeWidth="4"
        fill="none"
      />

      {/* floodlight rigs */}
      <g>
        <g stroke="rgba(190,205,195,.35)" strokeWidth="6" fill="none">
          <path d="M118 120V64M1324 128V72" />
        </g>
        <g fill="rgba(234,246,255,.9)">
          <rect x="84" y="44" width="30" height="22" rx="4" />
          <rect x="122" y="44" width="30" height="22" rx="4" />
          <rect x="1290" y="52" width="30" height="22" rx="4" />
          <rect x="1328" y="52" width="30" height="22" rx="4" />
        </g>
      </g>

      {/* goal and keeper, back of frame */}
      <g opacity="0.75">
        <g stroke="rgba(190,205,195,.45)" strokeWidth="6" fill="none">
          <path d="M470 660V430h336v230" />
        </g>
        <g fill="#050b09" stroke="#050b09" strokeLinecap="round">
          <circle cx="640" cy="492" r="21" />
          <g fill="none" strokeWidth="38">
            <path d="M640 514v78" />
          </g>
          <g fill="none" strokeWidth="19">
            <path d="M628 528l-44-52" />
            <path d="M652 528l44-52" />
            <path d="M640 592l-26 70" />
            <path d="M640 592l28 70" />
          </g>
        </g>
      </g>

      {/* sliding defender */}
      <g fill="#050b09" stroke="#050b09" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="286" cy="524" r="34" />
        <g fill="none" strokeWidth="62">
          <path d="M312 552l116 52" />
        </g>
        <g fill="none" strokeWidth="26">
          <path d="M300 566l-58 56" />
          <path d="M330 550l-30-82" />
        </g>
        <g fill="none" strokeWidth="34">
          <path d="M428 604l124 28" />
          <path d="M428 604l100 74" />
        </g>
        <g fill="none" strokeWidth="26">
          <path d="M552 632l96-22" />
          <path d="M528 678l78 8" />
        </g>
      </g>

      {/* striker, mid-air */}
      <g fill="#050b09" stroke="#050b09" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="972" cy="292" r="37" />
        <g fill="none" strokeWidth="66">
          <path d="M978 330l30 134" />
        </g>
        <g fill="none" strokeWidth="27">
          <path d="M956 352l-88-26" />
          <path d="M996 356l84 42" />
        </g>
        <g fill="none" strokeWidth="38">
          <path d="M1008 464l-76 84" />
          <path d="M1008 464l96 52" />
        </g>
        <g fill="none" strokeWidth="30">
          <path d="M932 548l-58 46" />
          <path d="M1104 516l86 -30" />
        </g>
        <g fill="none" strokeWidth="21">
          <path d="M1190 486l30 -12" />
          <path d="M874 594l-30 14" />
        </g>
      </g>

      {/* chasing player, far right */}
      <g fill="#050b09" stroke="#050b09" strokeLinecap="round" opacity="0.9">
        <circle cx="1392" cy="392" r="26" />
        <g fill="none" strokeWidth="46">
          <path d="M1392 418l6 94" />
        </g>
        <g fill="none" strokeWidth="20">
          <path d="M1380 434l-42 34" />
          <path d="M1406 434l34 22" />
        </g>
        <g fill="none" strokeWidth="26">
          <path d="M1398 512l-30 84" />
          <path d="M1398 512l44 74" />
        </g>
      </g>

      {/* ball */}
      <circle cx="1256" cy="486" r="34" fill="#050b09" />

      {/* rim light */}
      <g
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.8"
      >
        <path d="M948 268c8-16 26-24 44-20" />
        <path d="M950 344c-12 42-4 88 18 122" />
        <path d="M1012 470c28 12 58 30 86 46" />
        <path d="M262 500c6-18 24-28 42-24" />
        <path d="M316 556c40 14 78 30 112 48" />
        <path d="M436 610c40 4 78 14 112 26" />
        <path d="M1374 374c8-12 24-16 36-10" />
      </g>

      {/* motion arcs behind the strike */}
      <g stroke="rgba(247,245,239,.34)" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M1046 590c76-34 146-46 218-38" />
        <path d="M1024 634c84-38 162-50 240-40" />
        <path d="M1074 546c56-24 108-34 160-32" />
      </g>

      {/* turf spray from the slide */}
      <g fill="var(--accent)" opacity="0.75">
        <circle cx="596" cy="672" r="5" />
        <circle cx="622" cy="656" r="4" />
        <circle cx="648" cy="680" r="6" />
        <circle cx="574" cy="692" r="4" />
        <circle cx="668" cy="662" r="4" />
        <circle cx="694" cy="684" r="5" />
      </g>
    </svg>
  );
}
