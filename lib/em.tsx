import type { ReactNode } from "react";

/** Renders `*word*` in a copy string as <em>. Copy stays in content/copy.ts. */
export function em(text: string): ReactNode {
  const parts = text.split("*");
  if (parts.length < 3) return text;
  return parts.map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
