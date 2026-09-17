import { TRUST } from "@/content/copy";
import { Reveal } from "./Reveal";

export function TrustRow() {
  return (
    <section aria-label="Why Arena" className="trust gutter">
      {TRUST.map((t, i) => (
        <Reveal key={t.title} delay={i * 80}>
          <b style={{ fontSize: 16, fontWeight: 700, display: "block", marginBottom: 8 }}>
            {t.title}
          </b>
          <span style={{ fontSize: 15, color: "var(--body-2)" }}>{t.body}</span>
        </Reveal>
      ))}
    </section>
  );
}
