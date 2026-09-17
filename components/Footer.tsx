import Link from "next/link";
import { FOOTER } from "@/content/copy";
import { SOCIAL } from "@/content/placeholders";
import { Wordmark } from "./Wordmark";

const SOCIALS = [
  { label: "Instagram", href: SOCIAL.instagram },
  { label: "TikTok", href: SOCIAL.tiktok },
  { label: "X", href: SOCIAL.x },
];

export function Footer({ year }: { year: number }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Wordmark />
          <p style={{ fontSize: 15, color: "var(--chalk-3)", marginTop: 18, maxWidth: 320 }}>
            {FOOTER.blurb}
          </p>
        </div>

        {FOOTER.columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <b className="colhead" style={{ color: "var(--chalk-3)", display: "block", marginBottom: 16 }}>
              {c.title}
            </b>
            <ul>
              {c.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("#") ? (
                    <a href={l.href} className="ul-link">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="ul-link">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="footer-bottom">
        <span>
          © {year} Arena · {FOOTER.legal}
        </span>
        <span className="footer-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} className="ul-link" target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
