import Link from "next/link";
import { NAV } from "@/content/copy";
import { Wordmark } from "./Wordmark";

export function Nav() {
  return (
    <header
      className="gutter"
      style={{
        position: "relative",
        zIndex: 3,
        height: 84,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        borderBottom: "1px solid var(--hair-dark)",
      }}
    >
      <Link href="/" aria-label="Arena home">
        <Wordmark />
      </Link>

      <nav aria-label="Primary" className="nav-links">
        {NAV.links.map((l) => (
          <a key={l.label} href={l.href} className="ul-link">
            {l.label}
          </a>
        ))}
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Link
          href={NAV.login.href}
          className="ul-link"
          style={{ fontSize: 14, fontWeight: 500, color: "var(--chalk-2)" }}
        >
          {NAV.login.label}
        </Link>
        <Link href={NAV.cta.href} className="btn btn-secondary-dark btn-sm">
          {NAV.cta.label}
        </Link>
      </div>
    </header>
  );
}
