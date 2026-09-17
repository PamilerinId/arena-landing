import { Closer } from "@/components/Closer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { OwnersBoard } from "@/components/OwnersBoard";
import { Scoreboard } from "@/components/Scoreboard";
import { SportsRow } from "@/components/SportsRow";
import { TrustRow } from "@/components/TrustRow";
import { isoWeek, weekRange, todayLabel } from "@/lib/dates";

/** Dates are resolved per request so the board never goes stale. */
export const dynamic = "force-dynamic";

export default function Page() {
  const now = new Date();

  return (
    <>
      <Hero />
      <main>
        <SportsRow />
        <HowItWorks />
        <Scoreboard today={todayLabel(now)} />
        <OwnersBoard week={isoWeek(now)} range={weekRange(now)} />
        <TrustRow />
        <Closer year={now.getFullYear()} />
      </main>
    </>
  );
}
