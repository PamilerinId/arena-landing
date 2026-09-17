import Link from "next/link";
import { Wordmark } from "./Wordmark";

export function StubPage({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="stub gutter on-dark">
      <Link href="/" aria-label="Arena home">
        <Wordmark />
      </Link>

      <div className="stub-body">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="display h1" style={{ margin: "20px 0 20px", color: "var(--chalk)" }}>
          {title}
        </h1>
        <p style={{ fontSize: 18, color: "var(--chalk-2)", maxWidth: 560 }}>{body}</p>
        {children}
      </div>

      <Link href="/" className="btn btn-secondary-dark" style={{ alignSelf: "flex-start" }}>
        Back to Arena
      </Link>
    </main>
  );
}
