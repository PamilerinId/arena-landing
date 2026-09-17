import type { Metadata } from "next";
import { StubPage } from "@/components/StubPage";

export const metadata: Metadata = {
  title: "Search — Arena",
  robots: { index: false, follow: true },
};

const FIELDS = ["sport", "area", "date", "time", "venue"] as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const parsed = FIELDS.map((key) => {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw.join(", ") : (raw ?? "");
    return { key, value };
  }).filter((f) => f.value !== "");

  return (
    <StubPage
      eyebrow="Coming soon"
      title="Search is next."
      body="Real availability lands with the venue dashboard. Here is what your search carried through."
    >
      <dl className="stub-filters">
        {parsed.length === 0 ? (
          <div>
            <dt>No filters</dt>
            <dd>You searched with everything left open.</dd>
          </div>
        ) : (
          parsed.map((f) => (
            <div key={f.key}>
              <dt>{f.key}</dt>
              <dd>{f.value}</dd>
            </div>
          ))
        )}
      </dl>
    </StubPage>
  );
}
