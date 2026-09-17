import Image from "next/image";
import { HOW } from "@/content/copy";
import { vignetteRender } from "@/lib/renders";
import { Reveal } from "./Reveal";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      className="how gutter"
    >
      <Reveal className="how-header">
        <div>
          <span className="eyebrow eyebrow-ink">{HOW.eyebrow}</span>
          <h2 id="how-heading" className="display h2" style={{ marginTop: 18 }}>
            {HOW.heading}
          </h2>
        </div>
        <p className="how-intro">{HOW.intro}</p>
      </Reveal>

      {SCENES ? (
        <Reveal delay={100} className="how-strip">
          <Triptych />
        </Reveal>
      ) : (
        <Reveal delay={100} className="how-panel">
          <Vignettes />
        </Reveal>
      )}

      <div className="how-steps">
        {HOW.steps.map((s, i) => (
          <Reveal key={s.n} delay={150 + i * 100}>
            <span className="display display-sm" style={{ fontSize: 30, color: "var(--ink-3)" }}>
              {s.n}
            </span>
            <h3 style={{ fontSize: 22, fontWeight: 700, margin: "12px 0 10px", letterSpacing: "-0.01em" }}>
              {s.title}
            </h3>
            <p style={{ fontSize: 16, color: "var(--ink-2)" }}>{s.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/** Decided at build time: all three scenes present, or none used. */
const SCENES = (() => {
  const all = HOW.vignettes.map((_, i) => vignetteRender(i));
  return all.every((x) => x !== null) ? (all as { src: string; cutout: boolean }[]) : null;
})();

/**
 * The three scenes as one full-bleed strip. Each panel is cover-cropped and
 * dissolves into its neighbours and into the page above and below; no frame,
 * no baseline. A cut-out (transparent PNG) sits on a dusk wash until its full
 * scene lands.
 */
function Triptych() {
  return (
    <div className="how-triptych" aria-hidden="true">
      {SCENES!.map((scene, i) => (
        <div key={scene.src} className="how-scene" data-cutout={scene.cutout ? "" : undefined}>
          <div className="how-scene-img">
            <Image
              src={`/renders/${scene.src}`}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 34vw"
              quality={72}
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className="colhead vignette-cap how-scene-cap">{HOW.vignettes[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Placeholder line-work, used until all three scenes are in. */
function Vignettes() {
  return (
    <div className="how-vignettes" aria-hidden="true">
      {HOW.vignettes.map((label, i) => {
        return (
          <div key={label} className="how-vignette">
            {(
              <svg viewBox="0 0 437 260" role="presentation">
                <g
                  fill="var(--ink)"
                  stroke="var(--ink)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {i === 0 && <DeskVignette />}
                  {i === 1 && <BridgeVignette />}
                  {i === 2 && <KickoffVignette />}
                </g>
                <line
                  x1="0"
                  y1="212"
                  x2="437"
                  y2="212"
                  stroke="var(--hair-light)"
                  strokeWidth="1"
                />
              </svg>
            )}
            <span className="colhead vignette-cap">{label}</span>
          </div>
        );
      })}
    </div>
  );
}

/** 5:30 PM — booking from the desk. */
function DeskVignette() {
  return (
    <>
      {/* desk and laptop */}
      <rect x="112" y="146" width="212" height="7" rx="3" />
      <rect x="120" y="153" width="7" height="59" rx="3" />
      <rect x="309" y="153" width="7" height="59" rx="3" />
      <path d="M156 146V116l46-6v36z" />
      <path d="M146 146h66l8 7h-82z" />

      {/* chair */}
      <g strokeWidth="8" fill="none">
        <path d="M288 158v-60" />
        <path d="M256 166h36" />
        <path d="M284 172v38" />
      </g>

      {/* seated figure, facing the laptop */}
      <circle cx="252" cy="88" r="19" />
      <g fill="none" strokeWidth="31">
        <path d="M253 112l4 46" />
      </g>
      <g fill="none" strokeWidth="18">
        <path d="M256 160l-44 4" />
        <path d="M212 164l-2 44" />
      </g>
      <g fill="none" strokeWidth="14">
        <path d="M247 124l-30 18" />
        <path d="M217 142l-24-4" />
      </g>
      <g fill="none" strokeWidth="10">
        <path d="M204 210h22" />
      </g>
    </>
  );
}

/** 6:15 PM — still in traffic, the slot already paid for. */
function BridgeVignette() {
  return (
    <>
      {/* bridge railing */}
      <g stroke="var(--ink-3)" strokeWidth="3" fill="none" opacity="0.45">
        <path d="M0 108h437" />
        <path d="M34 108v40M110 108v34M186 108v30M262 108v30M338 108v34M414 108v40" />
      </g>

      {/* car ahead */}
      <g opacity="0.3">
        <path d="M44 150v-12c0-5 3-8 8-9l18-4c6-5 14-8 23-8h20c9 0 17 3 23 8l18 4c5 1 8 4 8 9v12z" />
        <circle cx="70" cy="152" r="11" />
        <circle cx="136" cy="152" r="11" />
      </g>

      {/* car with the driver */}
      <g className="anim-drift">
      <path d="M170 198v-22c0-8 5-13 13-15l34-8c11-10 26-15 43-15h44c17 0 32 5 43 15l34 8c8 2 13 7 13 15v22z" />
      <circle cx="212" cy="198" r="20" />
      <circle cx="352" cy="198" r="20" />
      <circle cx="212" cy="198" r="8" fill="var(--ivory)" stroke="none" />
      <circle cx="352" cy="198" r="8" fill="var(--ivory)" stroke="none" />

      {/* window cut-out with the driver inside */}
      <path
        d="M226 160l24-16c6-4 13-6 21-6h34c8 0 15 2 21 6l24 16z"
        fill="var(--ivory)"
        stroke="none"
      />
      <circle cx="268" cy="146" r="11" />
      <path d="M252 160c0-11 7-18 16-18s16 7 16 18z" />
      </g>
    </>
  );
}

/** 7:00 PM — through the gate, striking. */
function KickoffVignette() {
  return (
    <>
      {/* goal frame */}
      <g stroke="var(--ink-3)" fill="none" opacity="0.55">
        <g strokeWidth="5">
          <path d="M30 212v-100h114v100" />
        </g>
        <g strokeWidth="3" opacity="0.7">
          <path d="M30 112l22-16h114l-22 16" />
          <path d="M52 96v88M166 96v88M52 184H30M166 184h-22" />
          <path d="M30 138l22-14M52 212l0-28M144 138l22-14" />
        </g>
      </g>

      {/* striker */}
      <circle cx="252" cy="60" r="20" />
      <g fill="none" strokeWidth="34">
        <path d="M252 86l-8 54" />
      </g>
      <g fill="none" strokeWidth="15">
        <path d="M258 96l38-16" />
        <path d="M242 98l-30 22" />
      </g>
      <g fill="none" strokeWidth="19">
        <path d="M244 142l-12 66" />
        <path d="M244 142l50 32" />
      </g>
      <g fill="none" strokeWidth="16">
        <path d="M294 174l44-12" />
      </g>
      <g fill="none" strokeWidth="11">
        <path d="M225 210h20" />
        <path d="M338 162l14-6" />
      </g>

      {/* ball */}
      <g className="anim-bob">
        <circle cx="390" cy="164" r="18" />
        <path d="M390 155l8 6-3 10h-10l-3-10z" fill="var(--ivory)" stroke="none" />
      </g>
    </>
  );
}
